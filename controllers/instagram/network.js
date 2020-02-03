const express = require('express');
const router = express.Router();

const { getPostsUser, getPublication } = require('./controller');

/**
 * @description get Scrappig instagram
 * @method GET
 */
router.get('/:username', getPostsUser);

/**
 * @description get data from a publication
 * @method POST
 */
router.post('/publication', getPublication);

module.exports = router;
