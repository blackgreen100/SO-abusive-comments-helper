import banner from 'vite-plugin-banner';

const bannerText =     `// ==UserScript==
// @name         Moderator Select Abusive Comments
// @description  All selected comments are auto-pasted into the Abusive to Others message template 
// @homepage     https://github.com/blackgreen100/SO-abusive-comments-helper
// @author       blackgreen
// @version      0.0.3
// @downloadURL  https://github.com/blackgreen100/SO-abusive-comments-helper/raw/master/dist/ModSelectAbusiveComments.user.js
// @updateURL    https://github.com/blackgreen100/SO-abusive-comments-helper/raw/master/dist/ModSelectAbusiveComments.user.js
//
// @match        *://*.askubuntu.com/admin/users/*/post-comments*
// @match        *://*.mathoverflow.net/admin/users/*/post-comments*
// @match        *://*.serverfault.com/admin/users/*/post-comments*
// @match        *://*.stackapps.com/admin/users/*/post-comments*
// @match        *://*.stackexchange.com/admin/users/*/post-comments*
// @match        *://*.stackoverflow.com/admin/users/*/post-comments*
// @match        *://*.superuser.com/admin/users/*/post-comments*

// @match        *://*.askubuntu.com/users/message/create/*
// @match        *://*.mathoverflow.net/users/message/create/*
// @match        *://*.serverfault.com/users/message/create/*
// @match        *://*.stackapps.com/users/message/create/*
// @match        *://*.stackexchange.com/users/message/create/*
// @match        *://*.stackoverflow.com/users/message/create/*
// @match        *://*.superuser.com/users/message/create/*
//
// @grant        none
//
// ==/UserScript==
/* globals StackExchange, $ */`

export default () => {
    return {
        plugins: [
            banner(bannerText)
        ],
        build: {
            rollupOptions: {
                input: {
                    main: 'ModSelectAbusiveComments.user.ts'
                },
                output: {
                    format: 'iife',
                    manualChunks: undefined,
                    entryFileNames: 'ModSelectAbusiveComments.user.js'
                }
            },
            minify: false,
            outDir: './dist',
            assetsDir: '',
            sourcemap: false,
            target: ['ESNext'],
            reportCompressedSize: false
        }
    };
};
