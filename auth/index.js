var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  expressJWT = require('express-jwt'),
  utils = require('./utils'),
  auth = require('./auth'),
  cors = require('cors'),
  port = process.env.PORT || 3000;

var secret = process.env.AUTH_SECRET;

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//auth
app.use(expressJWT({
  secret: secret
}).unless({
  path: ['/login', '/register', '/admin', '/views',
    {
      url: '/password',
      methods: ['GET', 'POST']
    }]
}));

app.use('/', auth);

app.listen(port, function () {
  console.log('listening on port ' + port);
});

// console.log(utils.makeSecret());
