import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose, { SchemaType } from 'mongoose';
const Schema = mongoose.Schema;

const FaqSchema =  new Schema({
    question:{
        type:String,
        required: true
    },
    response:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true,
        enum:{
            values:["active",'inactive'],
            message: '{VALUE} not supported'
        }
    }
   
},{timestamps:true} );
FaqSchema.plugin(mongoosePaginate);
export default mongoose.model('Faq',FaqSchema);