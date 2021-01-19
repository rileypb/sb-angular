const express = require('express');

const app = express();

app.use(express.static('./dist/scrumboard-ui'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'scrumboard-ui' }
  );
});

app.listen(process.env.PORT || 4200);

console.log(`Running on port ${process.env.PORT || 4200}`)