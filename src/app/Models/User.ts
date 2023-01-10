import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const Schema = mongoose.Schema;


export interface userInterface{
        first_name: string | undefined;
        last_name: string | undefined;
        email: string;
        password: string;
        roles:  {
            User: number;
            Admin?: number | undefined;
            Dev?: number | undefined;
            Staff?: number | undefined;
        } ;
        refreshToken: string[];
        username: string | undefined;
        phone: string | undefined;
        dob: string | undefined;
        user_image: string | undefined;
}
// :userInterface 
const UserSchema=  new Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    username:{
        type:String
    },
    password:{
        type:String,
        required: true
    },
     phone:{
        type:String
    },
    dob:{
        type:String
    },
    roles:{
        User:{ 
        type:Number,
        default:1003,},
        Admin:Number,
        Dev:Number,
        Staff:Number, 
    },
    user_image:{
        type:String
    },
    refreshToken: [String]


},
{timestamps:true});
UserSchema.plugin(mongoosePaginate);

export default mongoose.model('User',UserSchema);