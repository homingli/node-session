var express = require('express');
var app = express();
var RedisStore = require('connect-redis')(express);

app.use(express.cookieParser());
app.use(express.session({
    store: new RedisStore({ url: process.env.REDIS_URL+'42' }),
    secret: 'demo'
}));

// default route
app.get('/', function(req, res) {
      // write session.name
      res.end('Name: ' + req.session.name + '\n');
});

app.get('/set/:name', function(req, res) {
      // set session.name based on url name
      req.session.name = req.params.name;
      res.redirect('/');
});

app.get('/clear', function(req, res) {
      // delete session.name
      delete req.session.name;
      res.redirect('/');
});

app.listen(process.env.PORT || 8080);
