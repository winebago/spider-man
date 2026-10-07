const express = require('express');
const { chromium } = require('playwright');

const app = express();
const PORT = process.env.PORT || 8080;


// ============================================================
// PROXY
// ============================================================

// Pro testování různých proxy stačí měnit pouze tyto 3 hodnoty.

const PROXY_SERVER = 'http://zproxy.lum-superproxy.io:44445';
const PROXY_USERNAME = 'lum-customer-filmtoro-zone-static-country-cz';
const PROXY_PASSWORD = '634fp4splyim';


let browser;


// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/', (req, res) => {

    res.type('text/plain').send(
        'Spider-Man is running.\n\n' +
        'Usage: /load?url=https://example.com'
    );

});


// ============================================================
// LOAD URL
// ============================================================

app.get('/load', async (req, res) => {

    const targetUrl = req.query.url;

    if (!targetUrl) {

        return res.status(400).send(
            'Missing URL parameter.\n\n' +
            'Usage: /load?url=https://example.com'
        );

    }


    // --------------------------------------------------------
    // Validate URL
    // --------------------------------------------------------

    let parsedUrl;

    try {

        parsedUrl = new URL(targetUrl);

        if (
            parsedUrl.protocol !== 'http:' &&
            parsedUrl.protocol !== 'https:'
        ) {
            throw new Error('Unsupported protocol');
        }

    } catch (error) {

        return res.status(400).send('Invalid URL.');

    }


    console.log('');
    console.log('==========================================');
    console.log('LOAD START');
    console.log('URL:', targetUrl);
    console.log('==========================================');


    // Každý request dostane vlastní čistý browser context.
    const context = await browser.newContext({
        viewport: {
            width: 1920,
            height: 1080
        }
    });


    try {

        const page = await context.newPage();

        console.log('Opening page...');

        await page.goto(targetUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });

        console.log('DOM loaded.');

        // Dáme JavaScriptu čas dokončit vykreslení stránky.
        await page.waitForTimeout(3000);

        console.log('Getting final HTML...');

        const html = await page.content();

        console.log('HTML captured.');
        console.log('Length:', html.length);

        res.status(200)
            .type('html')
            .send(html);

    } catch (error) {

        console.error('LOAD ERROR:', error);

        res.status(500)
            .type('text/plain')
            .send(
                'Failed to load page: ' +
                error.message
            );

    } finally {

        await context.close();

        console.log('Browser context closed.');
        console.log('==========================================');

    }

});


// ============================================================
// START
// ============================================================

(async () => {

    try {

        console.log('Starting Spider-Man...');
        console.log('DISPLAY:', process.env.DISPLAY);
        console.log('Proxy:', PROXY_SERVER);

        browser = await chromium.launch({

            // Chromium běží jako HEADed browser.
            // Obrazovku mu poskytuje Xvfb z Dockerfile.
            headless: false,

            // Proxy
            proxy: {
                server: PROXY_SERVER,
                username: PROXY_USERNAME,
                password: PROXY_PASSWORD
            },

            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage'
            ]

        });

        console.log('Chromium started in headed mode.');

        app.listen(PORT, '0.0.0.0', () => {

            console.log(
                `Spider-Man listening on port ${PORT}`
            );

        });

    } catch (error) {

        console.error('STARTUP ERROR:', error);

        process.exit(1);

    }

})();
