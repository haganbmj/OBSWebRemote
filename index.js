var express = require('express');
var app = express();

var root_public = __dirname + '/build/public';

app.use(express.static(root_public));

app.get('/', function(req, res) {
  res.sendFile('./index.html', { root: root_public });
});

app.listen(process.env.PORT || 8080);
