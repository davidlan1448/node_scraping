const ytRouter = require('./controllers/youtube/network');

/**
 * @description Rutas de el server
 * @param {*} server 
 */
const routes = (server) => {
    server.use('/yt', ytRouter);
    /* server.use('/fc', ytRouter);
    server.use('/ig', ytRouter); */
}

module.exports = routes;