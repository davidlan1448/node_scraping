const ytRouter = require('./controllers/youtube/network');
const igRouter = require('./controllers/instagram/network');
const fcRouter = require('./controllers/facebook/network');

/**
 * @description Rutas de el server
 * @param {*} server 
 */
const routes = (server) => {
    server.use('/yt', ytRouter);
    server.use('/ig', igRouter);
    server.use('/fc', fcRouter);
}

module.exports = routes;