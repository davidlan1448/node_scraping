const express = require('express');
const router = express.Router();

const { getScrappig } = require('./controller');

/**
 * @description get Scrappig from youtube
 * @method GET
 */
router.post('/', getScrappig);


module.exports = router;
