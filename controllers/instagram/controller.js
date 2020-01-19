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
 * @description obtiene el scrappig de youtube
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

module.exports = { getPostsUser };
