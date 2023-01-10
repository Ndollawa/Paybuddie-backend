import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const PostSchema =  new Schema({
    author:{
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: true
    },
    title:{
        type:String,
        required: true,
        unique: true
    },
    body:{
        type:String,
        required: true
    },
    description:{
        type:String
        
    },
    tags:{
        type:[String],
        required: true
    },
    category:{
        type:String,
        required: true
    },
    state:{
        type:String,
        enum: {
            values: ['draft', 'published'],
            message: '{VALUE} is not supported'
          },
        default:'draft',
        required: true   
    },
    read_count:{
        type:Number,
        default:0
    },
    reading_time:{
        type:String
    }

},
{timestamps:true});
PostSchema.plugin(mongoosePaginate);
export default mongoose.model('Post',PostSchema);