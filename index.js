const express = require('express');
const { chromium } = require('playwright');

const {
    PROXIES,
    COOKIES
} = require('./config');


const app = express();
const PORT = process.env.PORT || 8080;

let browser;


// ============================================================
// PROXY
// ============================================================

function getProxy(number, country) {

    if (!number) {
        return null;
    }

    const config = PROXIES[number];

    if (!config) {
        return null;
    }

    country = country || 'cz';


    return {

        server: config.server.replace(
            '{country}',
            country
        ),

        username: config.username.replace(
            '{country}',
            country
        ),

        password: config.password.replace(
            '{country}',
            country
        )

    };

}


// ============================================================
// NETWORK INSPECTOR HELPERS
// ============================================================

const SECRET_KEY = /authorization|cookie|token|secret|api[-_]?key|session|jwt|password|signature|credential|auth|client[-_]?secret/i;

function safeUrl(raw, reveal = false) {
    try {
        const u = new URL(raw);
        for (const key of u.searchParams.keys()) {
            if (!reveal && SECRET_KEY.test(key)) u.searchParams.set(key, '[REDACTED]');
        }
        return u.toString();
    } catch { return '[INVALID URL]'; }
}

function safeHeaders(headers, reveal = false) {
    const result = {};
    for (const [key, value] of Object.entries(headers || {})) {
        result[key] = !reveal && (SECRET_KEY.test(key) || key.toLowerCase() === 'set-cookie')
            ? '[REDACTED]' : value;
    }
    return result;
}

function safeBody(value, maxChars = 4000, reveal = false, full = false) {
    if (!value) return null;
    let text = String(value);
    // JSON: redact nested properties with sensitive names.
    try {
        const obj = JSON.parse(text);
        const clean = (item, depth = 0) => {
            if (depth > (full ? 80 : 15)) return '[DEPTH LIMIT]';
            if (Array.isArray(item)) return (full ? item : item.slice(0, 50)).map(v => clean(v, depth + 1));
            if (item && typeof item === 'object') {
                return Object.fromEntries( (full ? Object.entries(item) : Object.entries(item).slice(0, 100)).map(
                    ([k, v]) => [k, !reveal && SECRET_KEY.test(k) ? '[REDACTED]' : clean(v, depth + 1)]
                ));
            }
            return item;
        };
        text = JSON.stringify(clean(obj));
    } catch {
        // Non-JSON bodies may contain credentials: do not expose them.
        return '[NON-JSON BODY OMITTED]';
    }
    return text.length > maxChars ? text.slice(0, maxChars) + '...[TRUNCATED]' : text;
}

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/', (req, res) => {

    res.type('text/plain').send(
        'Spider-Man is running.\n\n' +
        'Usage:\n' +
        '/load?url=https://example.com\n\n' +
        'Options:\n' +
        '&proxy=1\n' +
        '&country=cz\n' +
        '&cookie=1\n' +
        '&network=1&xhr=1&wait=8000\n' +
        '&scroll=1&scrollsteps=12&scrolldelay=800\n' +
        '&graphql=1 (only ViX GraphQL calls)\n' +
        '&graphqlmaxbody=5000000 (max 10000000 chars per GraphQL body)\n' +
        '&showtokens=1 (unredacted tokens in network JSON; WARNING: public endpoint)' 
    );

});


// ============================================================
// LOAD URL
// ============================================================

app.get('/load', async (req, res) => {

    const targetUrl = req.query.url;

    const proxyNumber = req.query.proxy;
    const proxyCountry = req.query.country || 'cz';

    const cookieNumber = req.query.cookie;
    const networkMode = req.query.network === '1';
    const xhrOnly = req.query.xhr === '1';
    const graphqlOnly = req.query.graphql === '1';
    const graphqlMaxBody = Math.min(Math.max(parseInt(req.query.graphqlmaxbody, 10) || 5000000, 10000), 10000000);
    const revealTokens = req.query.showtokens === '1';
    const scrollEnabled = req.query.scroll === '1';
    const scrollSteps = Math.min(Math.max(parseInt(req.query.scrollsteps, 10) || 12, 1), 35);
    const scrollDelay = Math.min(Math.max(parseInt(req.query.scrolldelay, 10) || 800, 250), 3000);
    const waitMs = networkMode ? Math.min(Math.max(Number(req.query.wait) || 8000, 0), 20000) : 0;
    const entries = [];
    const tracked = new Map();
    const startedAt = Date.now();
    const maxEntries = 300;


    // --------------------------------------------------------
    // URL
    // --------------------------------------------------------

    if (!targetUrl) {

        return res.status(400).send(
            'Missing URL parameter.'
        );

    }


    try {

        const parsedUrl = new URL(targetUrl);

        if (
            parsedUrl.protocol !== 'http:' &&
            parsedUrl.protocol !== 'https:'
        ) {
            throw new Error();
        }

    } catch {

        return res.status(400).send(
            'Invalid URL.'
        );

    }


    // --------------------------------------------------------
    // PROXY
    // --------------------------------------------------------

    let proxy = null;

    if (proxyNumber) {

        proxy = getProxy(
            proxyNumber,
            proxyCountry
        );

        if (!proxy) {

            return res.status(400).send(
                'Invalid proxy configuration.'
            );

        }

    }


    // --------------------------------------------------------
    // CONTEXT OPTIONS
    // --------------------------------------------------------

    const contextOptions = {

        viewport: {
            width: 1920,
            height: 1080
        }

    };


    if (proxy) {

        contextOptions.proxy = proxy;

    }


    console.log('');
    console.log('==========================================');
    console.log('LOAD START');
    console.log('URL:', targetUrl);
    console.log('Proxy:', proxyNumber || 'NONE');
    console.log('Country:', proxyCountry);
    console.log('Cookie:', cookieNumber || 'NONE');
    console.log('Network:', networkMode ? 'ON' : 'OFF');
    console.log('==========================================');


    // --------------------------------------------------------
    // CREATE CONTEXT
    // --------------------------------------------------------

    const context = await browser.newContext(
        contextOptions
    );


    try {


        // ----------------------------------------------------
        // COOKIES
        // ----------------------------------------------------

        if (cookieNumber) {

            const cookies = COOKIES[cookieNumber];

            if (!cookies) {

                await context.close();

                return res.status(400).send(
                    'Invalid cookie configuration.'
                );

            }

            await context.addCookies(cookies);

            console.log(
                'Cookies loaded:',
                cookies.length
            );

        }


        // ----------------------------------------------------
        // PAGE
        // ----------------------------------------------------

        const page = await context.newPage();

        // Register listeners BEFORE navigation so early XHR/fetch calls are captured.
        if (networkMode) {
            const include = request => (!xhrOnly || ['xhr', 'fetch'].includes(request.resourceType())) &&
                (!graphqlOnly || request.url().includes('client-api.vix.com/gql/v2'));

            page.on('request', request => {
                if (!include(request) || entries.length >= maxEntries) return;
                const entry = {
                    id: entries.length + 1,
                    type: request.resourceType(),
                    method: request.method(),
                    url: safeUrl(request.url(), revealTokens),
                    startedMs: Date.now() - startedAt,
                    status: null,
                    durationMs: null,
                    requestHeaders: safeHeaders(request.headers(), revealTokens),
                    requestBody: safeBody(request.postData(), request.url().includes('client-api.vix.com/gql/v2') ? graphqlMaxBody : 10000, revealTokens, request.url().includes('client-api.vix.com/gql/v2')),
                    responseHeaders: null,
                    responseBody: null,
                    error: null
                };
                entries.push(entry);
                tracked.set(request, { entry, started: Date.now() });
            });

            page.on('response', async response => {
                const item = tracked.get(response.request());
                if (!item) return;
                const { entry, started } = item;
                entry.status = response.status();
                entry.durationMs = Date.now() - started;
                try { entry.responseHeaders = safeHeaders(await response.allHeaders(), revealTokens); }
                catch (e) { entry.headersError = e.message; }
                try {
                    const contentType = (response.headers()['content-type'] || '').toLowerCase();
                    if (contentType.includes('json') || contentType.includes('text/plain')) {
                        const isGraphql = response.url().includes('client-api.vix.com/gql/v2');
                        entry.responseBody = safeBody(await response.text(), isGraphql ? graphqlMaxBody : 10000, revealTokens, isGraphql);
                    } else {
                        entry.responseBody = '[NON-JSON BODY OMITTED]';
                    }
                } catch (e) {
                    entry.responseBody = '[UNAVAILABLE: ' + e.message + ']';
                }
            });

            page.on('requestfailed', request => {
                const item = tracked.get(request);
                if (!item) return;
                item.entry.durationMs = Date.now() - item.started;
                item.entry.error = request.failure()?.errorText || 'Request failed';
            });

            page.on('requestfinished', request => {
                const item = tracked.get(request);
                if (!item) return;
                item.entry.durationMs = Date.now() - item.started;
            });
        }

        // ----------------------------------------------------

// DEBUG BROWSER

// ----------------------------------------------------

if (req.query.debug === '1') {

    const browserInfo = await page.evaluate(() => ({

        userAgent: navigator.userAgent,

        webdriver: navigator.webdriver,

        platform: navigator.platform,

        language: navigator.language,

        languages: navigator.languages,

        hardwareConcurrency: navigator.hardwareConcurrency,

        deviceMemory: navigator.deviceMemory || null,

        screen: {

            width: screen.width,

            height: screen.height,

            availWidth: screen.availWidth,

            availHeight: screen.availHeight,

            colorDepth: screen.colorDepth,

            pixelDepth: screen.pixelDepth

        },

        timezone:

            Intl.DateTimeFormat().resolvedOptions().timeZone

    }));

    console.log('');

    console.log('BROWSER DEBUG');

    console.log('------------------------------------------');

    console.log('User-Agent:', browserInfo.userAgent);

    console.log('WebDriver:', browserInfo.webdriver);

    console.log('Platform:', browserInfo.platform);

    console.log('Language:', browserInfo.language);

    console.log('Languages:', browserInfo.languages);

    console.log('CPU:', browserInfo.hardwareConcurrency);

    console.log('Memory:', browserInfo.deviceMemory);

    console.log('Screen:', browserInfo.screen);

    console.log('Timezone:', browserInfo.timezone);

    console.log('------------------------------------------');

    console.log('');

}

// ----------------------------------------------------

// COOKIES BEFORE GOTO

// ----------------------------------------------------

const cookiesBefore = await context.cookies(targetUrl);

console.log('COOKIES BEFORE GOTO:');

if (cookiesBefore.length === 0) {

    console.log('NONE');

} else {

    for (const cookie of cookiesBefore) {

        console.log(

            cookie.name,

            '=',

            networkMode ? '[REDACTED]' : cookie.value,

            '| domain:',

            cookie.domain,

            '| path:',

            cookie.path

        );

    }

}

console.log('Opening page...');

await page.goto(targetUrl, {

    waitUntil: 'domcontentloaded',

    timeout: 30000

});

console.log('DOM loaded.');

if (scrollEnabled) {
    console.log('Scrolling page:', scrollSteps, 'steps');
    for (let step = 0; step < scrollSteps; step++) {
        await page.evaluate(() => window.scrollBy(0, Math.max(650, window.innerHeight * 0.85)));
        await page.waitForTimeout(scrollDelay);
    }
    // Trigger carousels that load only when close to the bottom.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(scrollDelay);
}

if (networkMode) {
    console.log('Capturing network for', waitMs, 'ms...');
    await page.waitForTimeout(waitMs);
    // Give pending response-body handlers a moment to complete.
    await Promise.race([
        Promise.allSettled([...tracked.keys()].map(async request => {
            const item = tracked.get(request);
            if (item?.entry.status !== null && item?.entry.responseBody === null) {
                await page.waitForTimeout(250);
            }
        })),
        page.waitForTimeout(500)
    ]);
    return res.status(200).json({
        url: safeUrl(targetUrl, revealTokens),
        scrolled: scrollEnabled,
        scrollSteps: scrollEnabled ? scrollSteps : 0,
        tokensVisible: revealTokens,
        filter: graphqlOnly ? 'ViX GraphQL' : (xhrOnly ? 'xhr/fetch' : 'all'),
        graphqlMaxBody,
        waitMs,
        count: entries.length,
        truncated: entries.length >= maxEntries,
        entries
    });
}


// ----------------------------------------------------

// COOKIES AFTER GOTO

// ----------------------------------------------------

const cookiesAfter = await context.cookies(targetUrl);

console.log('COOKIES AFTER GOTO:');

if (cookiesAfter.length === 0) {

    console.log('NONE');

} else {

    for (const cookie of cookiesAfter) {

        console.log(

            cookie.name,

            '=',

            networkMode ? '[REDACTED]' : cookie.value,

            '| domain:',

            cookie.domain,

            '| path:',

            cookie.path

        );

    }

}


        // ----------------------------------------------------
        // HTML
        // ----------------------------------------------------

        console.log('Getting final HTML...');

        const html = await page.content();

        console.log('HTML captured.');
        console.log('Length:', html.length);


        res.status(200)
            .type('html')
            .send(html);


    } catch (error) {


        console.error(
            'LOAD ERROR:',
            error
        );


        res.status(500)
            .type('text/plain')
            .send(
                'Failed to load page: ' +
                error.message
            );


    } finally {


        try { await context.close(); }
        catch (closeError) { console.error('Context close error:', closeError.message); }


        console.log(
            'Browser context closed.'
        );

        console.log(
            '=========================================='
        );

    }

});


// ============================================================
// START
// ============================================================

(async () => {

    try {

        console.log(
            'Starting Spider-Man...'
        );

        console.log(
            'DISPLAY:',
            process.env.DISPLAY
        );


        browser = await chromium.launch({

            headless: false,

            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage'
            ]

        });


        console.log(
            'Chromium started in headed mode.'
        );


        app.listen(
            PORT,
            '0.0.0.0',
            () => {

                console.log(
                    `Spider-Man listening on port ${PORT}`
                );

            }
        );


    } catch (error) {


        console.error(
            'STARTUP ERROR:',
            error
        );


        process.exit(1);

    }

})();
