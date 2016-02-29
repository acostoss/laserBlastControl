var http = require('http');
var express = require('express');
var child_process = require('child_process');
var StringDecoder = require('string_decoder').StringDecoder;

var decoder = new StringDecoder('utf8');

var app = express();

app.use(express['static'](__dirname ));

app.get('/play/:url', function(req, res) {
    var filepath = '/home/pi/vid/' + req.params.url;
    var player =  child_process.spawn('omxplayer', ['-p','-o','hdmi',filepath])
    
    player.stdout.on('data', function(data) {
        var decoded = decoder.write(data);
        //console.log(decoded);
    });
    
    player.stdout.on('end', function (data) {
        res.status(200).send('Success');
        console.log(filepath + ' played successfully!');
    });

    player.on('exit', function(code) {
        if (code != 0) {
            console.log('Play failed, error code: ' + code);
            res.status(500).send('Oops, Something went wrong!<br /> <br />Error code: ' + code);
        }
    });
    
});

app.get('*', function(req, res) {
  res.status(404).send('Unrecognised API call');
});

app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

app.listen(3000);
console.log('App Server running at port 3000');
