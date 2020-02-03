const puppeteer = require('puppeteer');
var rp = require('request-promise');
const cherrio = require('cheerio');
const Response = require('../../util/Response');
const { facebookEmail, facebookPassword } = require('../../config');

/**
 * @description obtiene el scrappig de youtube
 * @param {*} req 
 * @param {*} response 
 */
const getScrappig = async (req, res) => {
    try {
        const { url } = req.body;
        const browser = await puppeteer.launch({ headless: false,devtools: true, timeout: 0 });
        const page = await browser.newPage();
        await page.goto(url,
            { waitUntil: 'networkidle2', timeout: 100000 }
        );

        await page.evaluate(() => {
            document.querySelector('#expanding_cta_close_button').click();
        });

        await page.evaluate(() => {
            document.getElementsByClassName('_1whp _4vn2')[3].children[0].click();
        });

        await page.waitForSelector('._7a94._7a95', { timeout: 80000, visible: true });

        for (let index = 0; index < 10; index++) {
            await page.evaluate(() => {
                document.querySelector('._4ssp').click();
            });
        }

        await page.waitFor(3000);


        const data = await page.evaluate(() => {
            const selectElement = (element) => document.querySelector(element);
            const selectElements = (element) => document.querySelectorAll(element);
            const commentElements = Array.from(selectElement('ul._7a9a').children);
            
            const comments = commentElements.map(element => {
                const content = element.getElementsByClassName('clearfix')[0];
                return {
                    image: element.getElementsByClassName('_ohe lfloat')[0].getElementsByTagName('img')[0].src,
                    name: element.getElementsByClassName('_72vr')[0].children[0].innerText,
                    comment: element.getElementsByClassName('_72vr')[0].children[1].innerText/* ,
                    imageComment: element.getElementsByClassName('_42ef')[0].getElementsByClassName('_2txe')[0].children[0].getAttribute('href') || null */
                }
            });
            
            return {
                text: selectElement('._5pbx.userContent._3576').innerText.trim(),
                image: selectElement('._s0._4ooo._6y97._6_ut._5xib._5sq7._44ma._rw.img').src,
                likes: selectElement('._3dlh._3dli').innerText,
                user: {
                    avatar: selectElement('._s0._4ooo._6y97._6_ut._5xib._5sq7._44ma._rw.img').getAttribute('src'),
                    username: selectElement('.fwb.fcg').innerText
                },
                comments
            }
        });

        Response.success(res, data, 'comments', 'facebook');
        await browser.close();
    } catch (error) {
        console.error(error);
        Response.error(res, 500);
        await browser.close();
    }
}

module.exports = { getScrappig };
