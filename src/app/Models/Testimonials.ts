import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose, { SchemaType } from 'mongoose';
const Schema = mongoose.Schema;

const TestimonialSchema =  new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type:String,
        required: true
    },
    // description:{
    //     type:String,
    //     required: true
    // },
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
        }
    }
   
},{timestamps:true} );
TestimonialSchema.plugin(mongoosePaginate);
export default mongoose.model('Testimonial',TestimonialSchema);