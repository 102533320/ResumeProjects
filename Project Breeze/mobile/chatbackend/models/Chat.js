const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    sender : {
        type : String,
        required : true
    }, // sender_id
    receiver : {
        type : String,
        required : true
    }, // receiver_id
    messages : [
        {
            _id : String, // message_id
            text : String, // message_content
            createdAt : String, // message_creation_time
            user : {
                _id : String, // sender_id
                name : String, // sender_name
                avatar : String // sender_photo
            }
        }
    ]
},
{
    strict : false
})
module.exports = mongoose.model("Chats", ChatSchema);