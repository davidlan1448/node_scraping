const cherrio = require('cheerio');
const fs = require('fs');
const request = require('request');

/**
 * @description realiza el request de las urls
 * @param {*} url 
 */
const requestYoutube = (url) => {
    return new Promise((rej, response) => {
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
            //console.log($('head').html())
            const title = $('title').text();
            response(title)
        });
    });
}

module.exports = { requestYoutube };
