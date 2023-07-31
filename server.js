const express = require('express');
const dotenv = require("dotenv").config();
const db = require("./config/connection");
const routes = require("./routes");
//route response error middleware
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// const dbName = 'socialNetDB';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on ${PORT}`);
    });
});