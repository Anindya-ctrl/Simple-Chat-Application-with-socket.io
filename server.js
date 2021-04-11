const express = require('express');
const app = express();

const path = require('path');
const server = require('http').createServer(app);
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// SET STATIC FOLDER
const STATIC_FOLDER = path.join(__dirname, 'public');
app.use(express.static(STATIC_FOLDER));

server.listen(PORT, () => {
    console.log(`Server started at port: ${ PORT }`)
})
