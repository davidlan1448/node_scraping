const puppeteer = require('puppeteer');
var rp = require('request-promise');
const Response = require('../../util/Response');
const cheerio = require('cheerio');
const instagram = require("user-instagram");
const InstagramApi = require('instagram-web-api');

const config = function (url) {
    return {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
}

const url = "https://www.instagram.com";

/**
 * @description deshabilitado
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const client = new Instagram({ username, password })
 
        const res = await client.login();

        const profile = await client.getProfile();
        Response.success(res, profile, 'post', 'instagram');
    } catch (err) {
        console.error(err);
        Response.error(res, 500);
    }
}

/**
 * @description get a user's post
 * @param {*} req 
 * @param {*} response 
 */
const getPostsUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await instagram(`${url}/${username}`);
        
        Response.success(res, user, 'post', 'instagram');
    } catch (error) {
        console.error(error);
        Response.error(res, 500);
    }
}

/**
 * @description obtiene la publicacion y sus comentarios
 * @param {*} req 
 * @param {*} res 
 */
const getPublication = async (req, res) => {
    try {
        const { url } = req.body;
        const browser = await puppeteer.launch(/* { headless: false,devtools: true, timeout: 0 } */);
        const page = await browser.newPage();
        await page.goto(url,
            { waitUntil: 'networkidle2', timeout: 100000 }
        );

        await page.evaluate(()=>{
            document.querySelector('.dCJp8.afkep').click();
        });
        
        const data = await page.evaluate(() => {
            const BASE_URL = "https://www.instagram.com/";
            const selectElement = (element) => document.querySelector(element);
            const selectElements = (element) => document.querySelectorAll(element);
            const commentsElemnts = Array.from(selectElements('li.gElp9'));
            
            const comments = commentsElemnts.map((element, index) => {
                const content = element.getElementsByClassName('C7I1f')[0];
                
                return {
                    avatar: content.children[0].getElementsByTagName('img')[0].getAttribute('src'),
                    username: content.children[1].children[0].innerText.trim(),
                    comment: content.children[1].children[1].innerText,
                    time: content.children[1].children[2].innerText
                }
            });

            return {
                image: selectElement('.FFVAD').getAttribute('src'),
                likes: selectElements('.sqdOP.yWX7d._8A5w5')[0].children[0].innerText.trim(),
                user: {
                    avatar: selectElement('.RR-M-.h5uC0.mrq0Z').children[1].children[0].getAttribute('src'),
                    username: selectElement('.PQo_0.RqtMr').children[0].innerText.trim(),
                    account: BASE_URL+selectElement('.PQo_0.RqtMr').children[0].innerText.trim()
                },
                comments
            };
        });

        Response.success(res, data, 'post', 'instagram');
        await browser.close();
    } catch (err) {
        console.error(err);
        Response.error(res, 500);
        await browser.close();
    }
}

module.exports = { getPostsUser, getPublication };
