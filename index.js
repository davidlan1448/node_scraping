const cherrio = require('cheerio');
const fs = require('fs');
const request = require('request');

// MODULAR
request('https://www.youtube.com/watch?v=_Teqg118GbE', (err, res, body) => {
    //console.log(body);
    if (err || res.statusCode !== 200) {
        console.error('ERROR', err); 
        return;
    }
    const $ = cherrio.load(body);



    const title = $('title').text();
    const title = $('title').text();
    console.log(html)
});

// 