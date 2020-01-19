const ytRouter = require('./controllers/youtube/network');
const igRouter = require('./controllers/instagram/network');

/**
 * @description Rutas de el server
 * @param {*} server 
 */
const routes = (server) => {
    server.use('/yt', ytRouter);
    server.use('/ig', igRouter);
    //server.use('/fc', ytRouter);
}

module.exports = routes;