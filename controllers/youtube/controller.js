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
        console.log(data)
        Response.success(res, data);
    } catch (err) {
        console.error(err);
        Response.error(res, 500, 0, err.code === "ETIMEDOUT" ? "time expired" : '');
    }
}

module.exports = { getScrappig };
