const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router(app);

const PORT = 7000;
server.listen(PORT, () => {
    console.log(`Escuchando en el puerto localhost:${PORT}`);
});
