import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose, { SchemaType } from 'mongoose';
const Schema = mongoose.Schema;

const SliderSchema =  new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true,
        unique: true
    },
    status:{
        type:String,
        required: true,
        enum:{
            values:["active",'inactive'],
            message: '{VALUE} not supported'
        },
        default:'active'
    },
    image:{
        type:String,
        required:false
    }
   
},{timestamps:true} );
SliderSchema.plugin(mongoosePaginate);

export default mongoose.model('Slider',SliderSchema);