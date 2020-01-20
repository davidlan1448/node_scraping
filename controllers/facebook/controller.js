const puppeteer = require('puppeteer');
var rp = require('request-promise');
const cherrio = require('cheerio');
const Response = require('../../util/Response');
const { configUrl } = require('../../util/configUrl');

/**
 * @description obtiene el scrappig de youtube
 * @param {*} req 
 * @param {*} response 
 */
const getScrappig = async (req, res) => {
    try {
        const { url } = req.body;
        const $ = await rp(configUrl('https://store.steampowered.com/app/1160750/Grim_Clicker/'));
        
        console.log($('.game_background_glow').html())

        Response.success(res, {
            description: $('.game_description_snippet').text(),
            developers: $('.developers_list').text()
        });
    } catch (error) {
        console.error(error);
        Response.error(res, 500);
    }
}

module.exports = { getScrappig };
