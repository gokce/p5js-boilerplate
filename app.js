let express = require('express');
let http = require('http');
let fs = require('fs');
let bodyParser = require('body-parser');
let dateformat = require('dateformat');
let socket = require('socket.io');

let app = express();

if (app.get('env') === 'development') {
  let browserSync = require('browser-sync');
  let bs = browserSync.create();

  bs.init({ logSnippet: false });
  bs.watch("public/**/*.*").on("change", bs.reload);

  app.use(require('connect-browser-sync')(bs));
}

app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});

app.use(bodyParser.json());
app.post('/save/image', (req, res) => {
  savePng(req.body.img);
  res.sendStatus(200);
});

// Save PNG
function savePng(img) {
  let data = img.replace(/^data:image\/\w+;base64,/, "");
  let buffer = Buffer.from(data, 'base64');

  let dateString = getDateString();

  fs.writeFile(`output/${dateString}.png`, buffer, function(err, result) {
     if(err) console.log('error', err);
   });
}

// Date
function getDateString() {
  const dateFormat = 'yyyy-mm-dd-HH-MM-ss';
  let d = new Date().getTime();
  let offset = (new Date().getTimezoneOffset()) * -60 * 1000;
  let date = new Date(d + offset);
  return dateformat(new Date(), dateFormat);
}

// Create Server
let port = process.env.PORT || 3000;
let server = http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port + '...');
});

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log("New connection " + socket.id);

  socket.on('mouse', mouseMessage);

  function mouseMessage(data) {
    socket.broadcast.emit('mouse', data);
    //io.sockets.emit('mouse', data);
  }
}
