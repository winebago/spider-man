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
            name: 'session_cookie',
            value: 'om.xk72.webparts.csrf=320345515bd29ce445ae; cf_clearance=GbycUAIATsD62GyKl3Ue9N6DxGo_ap1bG.2atXTulGc-1791357960-1.2.1.1-p.MUa3O8U7mY5Kaw7uw7Ysrt5ilTcMH0.XBLjOqioHRdiVAZFw89KlgxpyRJlOG0TfzqVF61RRqU0WjvbcSKhnCFKW_UnNOI7HSLc.UdM6sgptlB3u_QvCKAee6cAQ67x60uiNqKH9v5mz.m4eQcPRxo8OGR9O._UUWAojj.dVyz45bHgB2aXmu_UIXA0eQmKxbLzXlKcO4dYvQ6P0v1nVk8HgcvxkznuxskiTFnqHyTYgJ_EoyCNMe6_oCA_sTGZcJxA3f9aiUQwj2sRccR_sRV59npifJygRC6sziQDL8V02nHR6d.gHLRRq9z9Phcgup2C_mul0fynLmJ7NNPFQf1GPLljYgu804hP67uqcM; useMobileSite=no; usprivacy=1---; FCCDCF=%5Bnull%2Cnull%2Cnull%2C%5B%22CQrt3MAQrt3MAEsACBENCzFoAP_gAEPgACiQMGsB_C5OTWFh8LZ3QbskeYQH97BgbkAwAgRIgkIBSDoSpJwAw2AYAAiSIiAIGRIAqnCBIAEACACERECAIIAFogBMIECQoDNCIIBECAMBACBQCARoE4thEQABgmoEJkQQgBAMQVIMWEyASohDknCRbCAwAACQAIcICEF0QgMSkMAA5GxcpIrICACBEEgIAFmNBAIpoBAIIhAARAkhgABgUdgIhEICAIShAKIAgAEwloAAAAAAAAAIAAAAAAAAAAAAAAAQIMGsB_C5MTXFh8LBXwbskOYQX97AAbkAwAARIgkIBSDoSpIwA02AQAAiSICAIGRAAolABIAEAAAgERECBAIAFIgBMAEAQoDNAAMBEACMBACBQAABIA4thEQABgGoEJEQQgAAMQFIEWEyAWIAjknCBaKAQAACQCIMAGEFkQgMQkMAA5GRK5IpICICBEEAIABmNBAIloBAIohCARIohAABgUMAIBEACAIShAKAAgQEwkoAAAAAAAAAAAAAAAAAAAAAAAAAQIAA.IMGsB_C5OTXFh8LZ3wbskeYQX97BgbkAwAgRIgkIBSDoSpJwA02AYAAiSIiAIGRIAqnCBIAEACAiERECBIIAFogBMIECQoDNCIMBECCMBACBQCARoE4thEQABgmoEJkQQgBAMQVIMWEyAWohjknCRbKAwAACQCIcIGEF0QgMSkMAA5Gxe5IrICICBEEgIAFmNBAItoBAIohCARIshgABgUdgIhEICAIShAKIAgQEwloAAAAAAAAAIAAAAAAAAAAAAAAAQIA.cAAAD_gAAAA%22%2C%222~55.89.108.117.143.149.161.184.192.211.228.259.272.310.311.313.314.320.358.415.424.442.445.469.486.491.494.495.621.737.803.899.904.979.981.986.1025.1029.1031.1033.1040.1047.1092.1097.1107.1126.1143.1152.1171.1186.1205.1215.1227.1268.1270.1284.1301.1307.1342.1415.1419.1440.1525.1558.1579.1584.1598.1638.1697.1712.1716.1720.1735.1745.1753.1782.1786.1794.1808.1810.1827.1832.1911.1944.1958.1964.1969.1985.2008.2016.2044.2052.2056.2074.2088.2133.2137.2177.2220.2223.2262.2271.2295.2309.2312.2316.2322.2328.2331.2358.2373.2400.2406.2411.2415.2416.2418.2425.2427.2440.2461.2465.2486.2501.2510.2517.2527.2535.2542.2559.2564.2569.2571.2572.2575.2577.2595.2604.2624.2628.2642.2645.2646.2650.2651.2652.2656.2669.2677.2684.2687.2690.2695.2698.2729.2767.2768.2770.2778.2784.2787.2798.2805.2814.2816.2822.2839.2844.2854.2863.2867.2872.2874.2878.2887.2891.2894.2895.2898.2920.2922.2930.2949.2950.2964.2974.2999.3000.3001.3002.3005.3010.3012.3017.3031.3043.3055.3089.3094.3109.3120.3126.3128.3130.3149.3155.3172.3177.3185.3186.3188.3189.3190.3194.3201.3213.3215.3218.3222.3230.3233.3244.3250.3251.3253.3254.3272.3290.3292.3299.3330.3331.4131.4531.6731.7235.11631.13731.26031.28031.28731.30732.39531.41531~dv.%22%2C%22E5984643-6CFE-4813-95F2-FEAF6915B0CD%22%5D%2Cnull%2Cnull%2C%5B%5B32%2C%22%5B%5C%2204e6b510-935c-433a-beda-b4f894b0a83c%5C%22%2C%5B1791357968%2C986000000%5D%5D%22%5D%5D%5D; _sharedid=0418f4b2-ecef-4d41-a6f6-a73a45a70379; _sharedid_cst=%2BJdxig%3D%3D; _lr_retry_request=true; _lr_env_src_ats=false; connectId={"ttl":86400000,"lastUsed":1791357970979,"lastSynced":1791357970979}; panoramaId_expiry=1791962770998; _cc_id=85eec91a004a692ea7cd77f8bf5ab555; panoramaId=24466f5c317f616c40fed2a294f3c8bd038ad13baa844c0a16792b363a463c69; _lr_sampling_rate=100; _awl=2.1791357974.5-8a7a5eb5797d9b1844b296505ac48173-6763652d6575726f70652d7765737431-0; FCNEC=%5B%5B%22AKsRol-vrhVRCySpdZrtj4NjGFmSe375a3yvFFbMhPe4KWfFdPBRyJZ_I9Dtm23TBtBzrlMcUJ4K0-RXr74beXiDNe8JlHZTVFdOgSQ7HtxIK602-2-dViwmkw2N971uYiC8EVPXRWEvLnYWAxJh3bSFubHbNsV-wA%3D%3D%22%5D%5D; cto_bundle=67R1nF8wdkh5QmduMEVrTkY1MkdFZmp5JTJCSmk5S1k5MU9ibXRuMnF0bEJBSXJLRWdIeVdXNHI5Njh4b3Qwd1J5NDVMOWpyOWppajdYakwlMkZrNjBYWlRDWWVnSDlNTkdSN3FNZWI3WmNkc1FUODFZd25BeDBqa0V5cEZ6TmhkJTJGMG9OQlFHYyUyQkozQUM3OG5sYjQ0JTJGNjNyM0pwJTJCT0ElM0QlM0Q; cto_bidid=-aqJtl9XTiUyRkhtTFhHYkpvczByTFczN3RlN1Rha0d2SGl6MyUyQkJDSkNNZDJMakdVTU9lbjl4SXZzVGNweWxNY1JqZkN2cnNZTERWOXkybTlhbWZpSDRjalM0WTg1MDVjJTJGZ29WcmRkVzlReXVkaGNWSWFmTXQ3d0xTY0pwVDl0NktOT2slMkZK; __gads=ID=100e555002a3e9ec:T=1791357971:RT=1791358612:S=ALNI_MZZQzT_cOQK5P0M7ZEuNRdSL4RI2A; __gpi=UID=0000154370955989:T=1791357971:RT=1791358612:S=ALNI_MZ82djqR7ELOptJd_2iXTFjDPUjbg; __eoi=ID=21822374078a258e:T=1791357971:RT=1791358612:S=AA-AfjbdOSiYaaGXYsfNdxSWDAD5; _ga_D3ECBB4D7L=GS2.2.s1791357960$o1$g1$t1791358690$j51$l0$h0; _ga_L0W7RDZXX3=GS2.1.s1791357968$o1$g0$t1791358691$j59$l0$h0; _ga=GA1.1.1634506118.1791357961',
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
