const express = require('express');
const app = express();
const PORT = 3008;
const checkCookies = require('./middlewares/checkCookies');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const fs = require('fs');

var whitelist = ['http://localhost:3000', 'http://localhost:8080'];

var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(helmet());

app.use(cors({ origin: '*'}));

app.use(cookieParser());

app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('HELLO');
});

app.get('/getkey/:key', checkCookies, (req, res) => {
    const { key } = req.params;
    const aa = "/static/"+key;
    console.log(aa);
    const a = fs.existsSync('static/3f8358b6983af5d2.key');
    const b = fs.readFileSync('static/3f8358b6983af5d2.key');
    if(b) {
        console.log('BURADA');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=' + key);
        res.send(new Buffer.from(b));
    }
    // console.log(b);
    // console.log(a);
    // res.send(req.params);
});

app.post('/cookie', (req, res) => {
    console.log(req.body);
    const { token } = req.body;
    console.log(token);
    if(token) {
        res.cookie('googleAnalytics', token, { secure: true, httpOnly: true })
        res.end('OK');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});