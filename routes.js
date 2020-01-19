const ytRouter = require('./controllers/youtube/network');

/**
 * @description Rutas de el server
 * @param {*} server 
 */
const routes = (server) => {
    server.use('/yt', ytRouter);
}

module.exports = routes;