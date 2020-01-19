const express = require('express');
const router = express.Router();

const { getPostsUser } = require('./controller');

/**
 * @description get Scrappig instagram
 * @method GET
 */
router.get('/:username', getPostsUser);

/**
 * @description get Scrappig instagram
 * @method GET
 */
// router.post('/login', loginUser);


module.exports = router;
