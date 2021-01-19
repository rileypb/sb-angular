const proxy = require('express-http-proxy');

const express = require('express');

const app = express();

app.use(express.static('./dist'));

app.use('/api', proxy('scrumboard-api.herokuapp.com', {
	proxyReqPathResolver: function(req) {
		return '/api' + req.url;
	}
}));

app.use('/admin', proxy('scrumboard-api.herokuapp.com', {
	proxyReqPathResolver: function(req) {
		return '/admin' + req.url;
	}
}));

app.use('/users', proxy('scrumboard-api.herokuapp.com', {
	proxyReqPathResolver: function(req) {
		return '/users' + req.url;
	}
}));

app.use('/assets', proxy('scrumboard-api.herokuapp.com', {
	proxyReqPathResolver: function(req) {
		return '/assets' + req.url;
	}
}));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: '/' }
  );
});

app.listen(process.env.PORT || 4200);

console.log(`Running on port ${process.env.PORT || 4200}`)
