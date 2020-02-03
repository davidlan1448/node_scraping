const express = require('express');
const router = express.Router();

const { getScrappig, getComments, getInfoVideo } = require('./controller');

/**
 * @description get Scrappig from youtube
 * @method GET
 */
router.post('/', getScrappig);

router.post('/comments', getInfoVideo);

/**
 * @description get comments from youtube
 * @method POST
 */
router.post('/urlComments', getComments);


module.exports = router;
