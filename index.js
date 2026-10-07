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
        '&cookie=1'
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

            cookie.value,

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

            cookie.value,

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


        if (!context._closed) {
            await context.close();
        }


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
