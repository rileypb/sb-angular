const proxy = require('express-http-proxy');

const express = require('express');

const app = express();

app.use(express.static('./dist'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: '' }
  );
});

app.use('/api', proxy('http://scrumboard-api.herokuapp.com'));
app.use('/admin', proxy('http://scrumboard-api.herokuapp.com'));
app.use('/users', proxy('http://scrumboard-api.herokuapp.com'));
app.use('/assets', proxy('http://scrumboard-api.herokuapp.com'));

app.listen(process.env.PORT || 4200);

console.log(`Running on port ${process.env.PORT || 4200}`)
