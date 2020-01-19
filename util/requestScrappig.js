const cherrio = require('cheerio');
const fs = require('fs');
const request = require('request');

/**
 * @description realiza el request de las urls
 * @param {*} url 
 */
const requestYoutube = (url) => {
    return new Promise((response, rej) => {
        request(url, (err, res, body) => {
            //console.log(body);
            if (err || res.statusCode !== 200) {
                console.error('ERROR', err);
                rej(err || `peticion fallida, status: ${res.statusCode}`);
                return;
            }
            const $ = cherrio.load(body, {
                withDomLvl1: true,
                normalizeWhitespace: false,
                xmlMode: false,
                decodeEntities: true
            });
            console.log($('body').html())
            const title = $('title').text();
            const description = $('meta[name=description]').attr('content');
            const sections = $('#sections').html();
            response({ 
                title,
                url,
                description,
                sections
            })
        });
    });
}

module.exports = { requestYoutube };
