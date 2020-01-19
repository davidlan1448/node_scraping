var rp = require('request-promise');
const cherrio = require('cheerio');
const { requestYoutube } = require('../../util/requestScrappig');
const Response = require('../../util/Response');
var scraper = require("youtube-comment-scraper");

const config = function (url) {
    return {
        uri: url,
        transform: function (body) {
            return cherrio.load(body);
        }
    }
}

/**
 * @description obtiene el scrappig de youtube
 * @param {*} req 
 * @param {*} response 
 */
const getScrappig = async (req, res) => {
    try {
        const { url } = req.body;
        const data = await requestYoutube(url);
        console.log(data)
        Response.success(res, data);
    } catch (err) {
        console.error(err);
        Response.error(res, 500, 0, err.code === "ETIMEDOUT" ? "time expired" : '');
    }
}

/**
 * @description get info video 
 * @param {*} req 
 * @param {*} res 
 */
const getInfoVideo = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            Response.error(res, 400, 1, null, 'the url does not exist');
            return;
        }

        const $ = await rp(config(url));

        const data = await scraper.comments(url);
        
        Response.success(res, {
            title: $('title').text(),
            description: $('meta[name=description]').attr('content'),
            ...data
        }, 'video', 'youtube');
    } catch (err) {
        console.error(err);
        Response.error(res, 500);
    }
}

module.exports = { getScrappig, getInfoVideo };
