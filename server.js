const express = require('express');
const db = require("./config/connection")

const app = express();
const PORT = 3001;

const dbName = 'socialNetDB';

app.listen(port, () => {
    console.log(`API server running on ${PORT}`);
});