const proxy = require('express-http-proxy');

const express = require('express');

const app = express();

app.use(express.static('./dist'));

app.use('/api', proxy('scrumboard-api.herokuapp.com', {
	proxyReqPathResolver: function(req) {
		return 'api/' + req;
	}
}));

app.use('/admin', proxy('scrumboard-api.herokuapp.com/admin'));
app.use('/users', proxy('scrumboard-api.herokuapp.com/users'));
app.use('/assets', proxy('scrumboard-api.herokuapp.com/assets'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: '/' }
  );
});

app.listen(process.env.PORT || 4200);

console.log(`Running on port ${process.env.PORT || 4200}`)
