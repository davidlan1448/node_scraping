const { requestYoutube } = require('../../util/requestScrappig');
const Response = require('../../util/Response');

/**
 * @description obtiene el scrappig de youtube
 * @param {*} req 
 * @param {*} response 
 */
const getScrappig = async (req, res) => {
    try {
        const { url } = req.body;
        const data = await requestYoutube(url);

        Response.success(res, data);
    } catch (error) {
        console.error(error);
        Response.error(res, 500);
    }
}

module.exports = { getScrappig };
