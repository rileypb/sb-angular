const proxy = require('express-http-proxy');

const express = require('express');

const app = express();

app.use(express.static('./dist'));

app.listen(process.env.PORT || 4200);

console.log(`Running on port ${process.env.PORT || 4200}`)
