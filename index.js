const app = express();
const server = require('http').createServer(app);
const router = require('./network/routes');

router(app);

const PORT = 7000;
server.listen(PORT, () => {
    console.log(`Escuchando en el puerto localhost:${PORT}`);
});
