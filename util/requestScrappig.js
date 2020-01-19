const cherrio = require('cheerio');
const fs = require('fs');
const request = require('request');

const requestYoutube = (url) => {
    return new Promise((rej, res) => {
        request(url, (err, res, body) => {
            //console.log(body);
            if (err || res.statusCode !== 200) {
                console.error('ERROR', err);
                rej(err || `peticion fallida, status: ${res.statusCode}`);
                return;
            }
            const $ = cherrio.load(body);
            
            const title = $('title').text();
            res(html)
        });
    });
}

module.exports = { requestYoutube };
