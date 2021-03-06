const http = require('http');
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = 3000;
const MONGOURL = "mongodb://localhost/powerdev";

const server = http.createServer(app);

app.listen(PORT, () => {
    console.log('Power Server rodando.');
});

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));
db.once('open', () => console.log('MongoDB conectado'));