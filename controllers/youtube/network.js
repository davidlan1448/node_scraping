const express = require('express');
const router = express.Router();

const { getScrappig, getInfoVideo } = require('./controller');

/**
 * @description get Scrappig from youtube
 * @method GET
 */
router.post('/', getScrappig);

router.post('/comments', getInfoVideo);


module.exports = router;
