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

        name: 'cf_clearance',

        value: 'GbycUAIATsD62GyKl3Ue9N6DxGo_ap1bG.2atXTulGc-1791357960-1.2.1.1-p.MUa3O8U7mY5Kaw7uw7Ysrt5ilTcMH0.XBLjOqioHRdiVAZFw89KlgxpyRJlOG0TfzqVF61RRqU0WjvbcSKhnCFKW_UnNOI7HSLc.UdM6sgptlB3u_QvCKAee6cAQ67x60uiNqKH9v5mz.m4eQcPRxo8OGR9O._UUWAojj.dVyz45bHgB2aXmu_UIXA0eQmKxbLzXlKcO4dYvQ6P0v1nVk8HgcvxkznuxskiTFnqHyTYgJ_EoyCNMe6_oCA_sTGZcJxA3f9aiUQwj2sRccR_sRV59npifJygRC6sziQDL8V02nHR6d.gHLRRq9z9Phcgup2C_mul0fynLmJ7NNPFQf1GPLljYgu804hP67uqcM',

        domain: '.letterboxd.com',

        path: '/'

    }

],


    // --------------------------------------------------------
    // COOKIE PROFILE 2
    // --------------------------------------------------------

    2: [

        {
            name: 'session_cookie',
            value: 'session-id=143-8250774-5190634; session-id-time=2082787201l; ubid-main=135-3968658-0764157; _pubcid=cb896455-d4b9-4a3d-8147-1a66f261759c; _cc_id=85eec91a004a692ea7cd77f8bf5ab555; _au_1d=AU1D-0100-001781862404-15N8XBXJ-OLD1; ad-oo=0; ci=eyJhY3QiOiJDUWgtOEFBUWgtOEFBRjRBQkNFTmhqLWdBQUFBQUFBQUFCYW1HN3dCMkdvc05UNGF0aHJERFh1R3dZYkR3MlREWmVHMFlidUFBRUFBQUFBIiwiZ2N0IjoiQ1FoLThBQVFoLThBQUY0QUJDRU5DVUZnQU5MQUFBQUFBQmFnTDR3WHdBRlFBTUFBMEFDb0FHUUFPQUFnZ0JJQUVvQUp3QVZBQXRBQmxBRFFBTlFBY2dBOUFCLUFFS0FJb0FqUUJNQUU0QUtBQVVnQXFBQmRnRENBTVFBWm9BMkFEZEFISUFjd0EtQUItQUVBQUlRQVJFQWpnQ1BBRTBBS1VBVm9BdUFCcWdEb0FIaUFQMkFpQUNJZ0VUQUl0QVJ3QkhZQ1NnSk1BU29BbG9CTUFDY0FFN0FLYUFWa0Fyd0JpZ0RPZ0dmQU9FQWNRQTZnQi1nRC1BSW1BUnFBajBCT0FDalFGU2dMREFXVUF0WUJkb0M4d0Y3Z0w5QVgtQXdFQmlnRExBR2ZBT0FBZFdBOHdCOXdELXdJQWdRYUFnLUJHY0NPd0VlZ0pWZ1V5QXRNQmNvQy1JQUFRQUFDd1VBR0FBSVBvQklBTUFBUWZRSFFBWUFBZy1nU2dBd0FCQjlBcEFCZ0FDRDZBWUFEQUFFSDBCUUFHQUFJUG9EQUFNQUFRZlFJQUFZQUFnLWdJQUhnQWdBQklBQ29BR3NBWVFCaUFETUFITUFRQUFwUUJxZ0V0QUt5QVY0QTRRQ3d5d0FHQUFJUG9BLklMNHdYd0FGUUFNQUEwQUNvQUdRQU9BQWdnQklBRW9BSndBVkFBdEFCbEFEUUFOUUFjZ0E5QUItQUVLQUlvQWpRQk1BRTRBS0FBVWdBcUFCZGdEQ0FNUUFab0EyQURkQUhJQWN3QS1BQi1BRUFBSVFBUkVBamdDUEFFMEFLVUFWb0F1QUJxZ0RvQUhpQVAyQWlBQ0lnRVRBSXRBUndCSFlDU2dKTUFTb0Fsb0JNQUNjQUU3QUthQVZrQXJ3QmlnRE9nR2ZBT0VBY1FBNmdCLWdELUFJbUFScUFqMEJPQUNqUUZTZ0xEQVdVQXRZQmRvQzh3RjdnTDlBWC1Bd0VCaWdETEFHZkFPQUFkV0E4d0I5d0Qtd0lBZ1FhQWctQkdjQ093RWVnSlZnVXlBdE1CY29DLUkuY0FBQUFBQUFBQUEiLCJwdXJwb3NlcyI6WyIxIiwiMiIsIjQiLCI3IiwiOSIsIjEwIiwiMTEiXSwidmVuZG9ycyI6WyI2OCIsIjc3IiwiNzU1IiwiNzkzIiwiODA0IiwiMTEyNiIsIjUwMDI1IiwiNTAwMjkiLCI1MDAzMCIsIjUwMDM4Il0sImFnZVNpZ25hbCI6IkFEVUxUIiwiZGlzYWJsZUlCQSI6ZmFsc2UsImRpc2FibGVQMTNuIjpmYWxzZSwiaXNHZHByIjp0cnVlfQ; aws-waf-token=e7310525-d81c-4681-bc12-5d93917753eb:EQoAnz59NpDvbAAA:+ubtz/u3RCjzweil05kQ6kliFmWegL932eVBMOlxIlsqcRoo6uOEiZXLWDWjFlvDT5QsmBqOxAinpZM1WKDsgNgcDcGtTUCEQjQPfJq4g4F++qPKX5rSaAXzmOBpVj8ZWLZ9fJIlz/EXL1XIbUDjpjQAN2HHiJT1nyewq7OwV7BItleh2FcaVT8WVZEreeZK+u2xSRhq7vBcAINBhb82lfX/iq6REBqMKxytSXXaviSpOJDKZ57hzJqUGQIFOJzoY9/otObEBc5vZ1BoG+0Vq6YVHMWwidb8dGROInt0n44Bjms+17Pp+u1VMHtIVRXZAcQm5FdBAKbBWDHquV2v38wffYaz+LVn217cmSjW5r7GNsG30qC3OJJSEWjB5dbCO10T8Hed6jLgbQ==; session-token=BLvyMVHX0vVWN8ezON7POWoToEMOr1JM92ClAhBIaU2cvv+qWyqRZkEL0XhwAdsdaWC14kwz7AZo4HZ0CkUpnBVEAXCfztRmsAwawFk/rttmzSiF2pdkVimhdRQhOwULjjOMEd57TkQP1/2SZ2f3l+EH67wU0Im/UPgcdGbW965dARVzHCvbkS9a2tMqh4dRiaKNKPURu7UJKNAww8PXNz0h9HvjgAGM',
            domain: '.imdb.com',
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
