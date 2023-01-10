import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema =  new Schema({
    author:{
        type:String,
        required: true
    },
    comment:{
        type:String,
        required: true
    }

},
{timestamps:true});

export default mongoose.model('Comment',CommentSchema);