const puppeteer = require('puppeteer');
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

/**
 * @description get all comments
 * @param {*} req 
 * @param {body: { url }} res 
 */
const getComments = async (req, res) => {
    try {
        const { url } = req.body;
        const browser = await puppeteer.launch(/* { headless: false,devtools: true } */);
        const page = await browser.newPage();
        await page.goto(url,
            { waitUntil: 'networkidle2', timeout: 100000 }
        );
        
        const waitForComments = async (limit = 20) => {
            await page.evaluate(async () => {
                window.scrollBy(0, 7000);
            });
            await page.waitForSelector('#main', { timeout: 80000, visible: true });
            await page.waitForFunction(`document.querySelectorAll("#main").length >= ${limit}`, { timeout: 80000 });
        }
        
        await waitForComments();
        await waitForComments(40);

        const data = await page.evaluate(() => {
            const BASE_URL = "https://www.youtube.com";
            const selectElement = (element) => document.querySelector(element);
            const selectElements = (element) => document.querySelectorAll(element);
            const title = selectElement('h1.title').innerText.trim();
            const description = selectElement('#description').innerText.trim();
            const view = selectElement(".view-count.style-scope.yt-view-count-renderer").innerText.trim();
            const channel = {
                avatar: selectElement("#avatar").children[0].getAttribute('src'),
                username: selectElement("#avatar").parentComponent.children[1].children[0].innerText.trim(),
                path: BASE_URL+selectElement("#avatar").parentComponent.children[0].getAttribute('href')
            };

            const commentElenments = Array.from(selectElements('#main'));
            commentElenments.pop();
            
            const comments = commentElenments.map((element) => {
                const author = element.children[0].children[1].children[0].innerText.trim();
                const ago = element.children[0].children[1].children[3].innerText;
                const comment = element.children[1].innerText;
                const channel = BASE_URL+element.children[0].children[1].children[0].getAttribute('href');
                const likes = element.children[3].children[0].children[3].innerText.trim();
                return {    
                    author,
                    comment,
                    ago,
                    channel,
                    likes
                }
            });

            return {
                title,
                description,
                view,
                channel,
                comments
            }
        });

        Response.success(res, data, "comments", "youtube");
        await browser.close();
    } catch (err) {
        console.error(err);
        Response.error(res, 500);
        await browser.close();
    }
}

module.exports = { getScrappig, getInfoVideo, getComments };
