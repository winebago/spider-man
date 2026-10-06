const express = require('express');
const { chromium } = require('playwright');

const app = express();
const PORT = process.env.PORT || 3000;

let browser;


// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/', (req, res) => {

    res.type('text/plain').send(
        'Browser HTML Service is running.\n\n' +
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

    // Povolit pouze HTTP/HTTPS
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

    const context = await browser.newContext();

    try {

        const page = await context.newPage();

        console.log('Opening page...');

        await page.goto(targetUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });

        console.log('DOM loaded.');

        // Dáme JS aplikacím chvíli na vykreslení obsahu.
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

        res.status(500).send(
            'Failed to load page: ' + error.message
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

        console.log('Starting Chromium...');

        browser = await chromium.launch({
            headless: true
        });

        console.log('Chromium started.');

        app.listen(PORT, '0.0.0.0', () => {

            console.log(
                `Browser HTML Service listening on port ${PORT}`
            );

        });

    } catch (error) {

        console.error('STARTUP ERROR:', error);

        process.exit(1);

    }

})();
