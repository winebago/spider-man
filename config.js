// ============================================================
// SPIDER-MAN CONFIGURATION
// ============================================================


// ============================================================
// PROXIES
// ============================================================
//
// {country} bude nahrazeno parametrem:
// &country=cz
//
// Pokud country není zadáno, použije se "cz".
//
// Příklad:
// &proxy=1&country=cz
//
// ============================================================

const PROXIES = {

    // --------------------------------------------------------
    // PROXY 1
    // --------------------------------------------------------

    1: {

        server:
            'http://zproxy.lum-superproxy.io:44445',

        username:
            'lum-customer-filmtoro-zone-residential-country-{country}',

        password:
            'gsh4iv2xdsp2'

    },


    // --------------------------------------------------------
    // PROXY 2
    // --------------------------------------------------------

    2: {

        server:
            'http://proxy2.example.com:12345',

        username:
            'username-{country}',

        password:
            'password'

    },


    // --------------------------------------------------------
    // PROXY 3
    // --------------------------------------------------------

    3: {

        server:
            'http://proxy3.example.com:12345',

        username:
            'username',

        password:
            'password'

    },


    // --------------------------------------------------------
    // PROXY 4
    // --------------------------------------------------------

    4: {

        server:
            'http://proxy4.example.com:12345',

        username:
            'username-{country}',

        password:
            'password'

    },


    // --------------------------------------------------------
    // PROXY 5
    // --------------------------------------------------------

    5: {

        server:
            'http://proxy5.example.com:12345',

        username:
            'username-{country}',

        password:
            'password'

    }

};


// ============================================================
// COOKIES
// ============================================================
//
// Příklad:
// &cookie=1
//
// Jeden profil může obsahovat jednu nebo více cookies.
//
// ============================================================

const COOKIES = {

    // --------------------------------------------------------
    // COOKIE PROFILE 1
    // --------------------------------------------------------

    1: [

        {
            name: 'example_cookie',
            value: 'example_value',
            domain: '.example.com',
            path: '/'
        }

    ],


    // --------------------------------------------------------
    // COOKIE PROFILE 2
    // --------------------------------------------------------

    2: [

        {
            name: 'session_cookie',
            value: 'example_session_value',
            domain: '.example.org',
            path: '/'
        },

        {
            name: 'preferences',
            value: 'example_preferences_value',
            domain: '.example.org',
            path: '/'
        }

    ],


    // --------------------------------------------------------
    // COOKIE PROFILE 3
    // --------------------------------------------------------

    3: [

        {
            name: 'another_cookie',
            value: 'another_value',
            domain: '.example.net',
            path: '/'
        }

    ]

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {

    PROXIES,
    COOKIES

};
