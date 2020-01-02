var express = require('express');
var http = require('http');
var app = express();

if (app.get('env') === 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync.create();

  bs.init({ logSnippet: false });
  bs.watch("public/**/*.*").on("change", bs.reload);

  app.use(require('connect-browser-sync')(bs));
}

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

var port = 3000;
http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
