const express = require('express');
const dotenv = require("dotenv").config();
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// const dbName = 'socialNetDB';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on ${PORT}`);
    });
});