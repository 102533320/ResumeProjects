const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require("body-parser");
const socket = require('socket.io');
const port = 4004;

/**
 * DB models
 */
const Chat = require('./models/Chat');
const { User } = require("./models/users.js");

/**
 * http.createServer() listen to ports on the computer and execute a function
 */ 
const server = http.createServer(app);
const io = socket(server);

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://kelvin:<password>@breeze.rcfwbs9.mongodb.net/Breeze?retryWrites=true&w=majority")
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

/**
 * API for retreiving chat messages by passing the sender and receiver as query params
 */
app.get("/chats/:sender/:receiver", (req,res) => {

    const chat = Chat.findOne({
        $or : [
            { receiver : req.params.receiver, sender : req.params.sender },
            { receiver : req.params.sender, sender : req.params.receiver}
        ]
    });

    chat.exec().then(data => {
        if(data == null) {
            res.json([]);
        }
        else {
            res.json(data.messages);
        }
    });
});

/**
 * API for creating new chat messages
 */
app.post("/chats", (req, res) => {
    const query = Chat.findOne({
        /**
         * Logical OR operation on the array to retrieve at least one of
         * given expressions in the array
         */
      $or: [
        { receiver: req.body.receiver, sender: req.body.sender },
        { receiver: req.body.sender, sender: req.body.receiver }
      ]
    });
    query
      .exec()
      .then(data => {
        if (data === null) {
          const chat = new Chat({
            sender: req.body.sender,
            receiver: req.body.receiver,
            messages: req.body.messages
          });
  
          chat
            .save()
            .then(data => {
              res.json(data);
            })
            .catch(error => {
              res.json(error);
            });
        } else {
          console.log(req.body.messages[0]);
          const updateChat = Chat.updateOne(
            {
              $or: [
                { receiver: req.body.receiver, sender: req.body.sender },
                { receiver: req.body.sender, sender: req.body.receiver }
              ]
            },
            { $push: {messages: req.body.messages[0]}   }
          );
          updateChat
            .exec()
            .then(data => {
              res.json(data);
            })
            .catch(error => {
              res.json(error);
            });
        }
      })
      .catch(error => {
        res.json(error);
      });
  });
  





