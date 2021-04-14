
const express = require('express');

const app = express();

app.use(express.static('./dist'));

app.use((req, res, next) => {
    // if (req.headers.host === 'your-app.herokuapp.com')
    //     return res.redirect(301, 'https://www.your-custom-domain.com');
    if (req.headers['x-forwarded-proto'] !== 'https')
        return res.redirect('https://' + req.headers.host + req.url);
    else
        return next();
});

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: './dist' }
  );
});

app.listen(process.env.PORT || 4200);

console.log(`Running on port ${process.env.PORT || 4200}`)
