const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});


// this is going to add into userSchema
// this make sure username are unqiue 
// it add  fields username and password for us 

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);