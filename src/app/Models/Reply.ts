import mongoose, { SchemaType } from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema =  new Schema({
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    roles:{
        type:String,
        required: true
    }

});

module.exports = mongoose.model('User',UserSchema);