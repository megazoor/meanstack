//////
//  Dalmas First Node Server
//    Restart server when updating this file.
//////

    var express = require('express');
    var app = express();
    //require mongojs to interact with mongodb as the bridge for our api
    var mongojs = require('mongojs');
    //define which database & collection we will be using
    var db = mongojs('contactlist', ['contactlist']);

    //setup bodyparser
    var bodyParser = require('body-parser');

    //define directory to start server
    app.use(express.static(__dirname + "/public"));

    //enable bodyparser to be used by app...
    app.use(bodyParser.json());



    app.get('/contactlist', function (req, response){

      console.log("I received a Get Request");

      db.contactlist.find(function (err, docs){
        console.log('docs', docs);
        //respond to the GET request with the contactList in JSON format ~ pass to controller.
        response.json(docs);
      });

    // Dummy Data to return to an angular controller when db is not present.
    // person1 = {
    //   name: 'Tim',
    //   email: 'tim@email.com',
    //   number: '111 111 1111'
    // };
    // person2 = {
    //   name: 'Emily',
    //   email: 'emily@email.com',
    //   number: '222 222 2222'
    // };
    // person3 = {
    //   name: 'Jon',
    //   email: 'jon@email.com',
    //   number: '333 333 3333'
    // };
    //
    // var contactlist = [person1, person2, person3];
    //
    //
    // response.json(contactlist);

});

  app.post('/contactlist', function(req, response){
    //in order to parse the body using req.body you need to
    //in order to request the body from the input data
    //we need to insert another module called bodyparser using npm
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
      //doc represents the object we have parsed and received
      response.json(doc);
    });

  });
  app.delete('/contactlist/:id', function(req, res){
    var id = req.params.id;

    //print id to server
    console.log(id);
    // if console logs it then go ahead and delete from database
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
      res.json(doc);
    });
  });
  app.get('/contactlist/:id', function (req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
      //send requested data back to controller
      res.json(doc);
    });
  });
  app.put('/contactlist/:id', function (req, res){
    var id = req.params.id;
    //check to see if the name is being sent to the server...
    console.log(req.body.name);

    db.contactlist.findAndModify({
      //select object to modify
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
      new: true}, function (err, doc){
        //respond with json the doc youve updated...
        res.json(doc);
      });
  });

  //Create server and return hello world!
  //run $ node server
  // app.get('/', function(req, response){
  //  response.send('Hello, World! from Server.js')
  // });

  app.listen(3000);
  console.log("Server running on port 3000");
