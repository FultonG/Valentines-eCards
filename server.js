var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/quotes";
var assert = require('assert');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/create', function(req, res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.createCollection('love', function(err, createResult){
      assert.equal(null, err);
      var quotes = [
        {quote: 'I swear I couldn\'t love you more than I do right now, and yet I know I will tomorrow', id: 1},
        {quote: 'You are my best friend, my human diary and my other half. You mean the world to me and I LOVE YOU.', id: 2},
        {quote: 'I choose you. And I\'ll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I\'ll keep choosing you.', id: 3}
      ];
      db.collection('love').insertMany(quotes, function(err, insertResult){
        assert.equal(null, err);
        res.send("Number of documents inserted: " + insertResult.insertedCount);
        db.close();
      });
    });

  });
});

app.post('/id', function(req, res){
  var reqId = parseInt(req.body.id);
  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('love').findOne({id: reqId}, function(error, result){
      assert.equal(null, error);
      res.send(result);
      db.close();
    });
  });

});


// Listen
app.listen(3000, function(){
  console.log('listening on *:3000');
});
