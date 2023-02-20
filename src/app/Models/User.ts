import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const Schema = mongoose.Schema;


export interface userInterface{
        _id:string | undefined;
        firstName: string | undefined;
        lastName: string | undefined;
        email: string;
        password: string;
        username: string | undefined;
        phone: string | undefined;
        dob: string | undefined;
        gender: string | undefined;
        address: string | undefined;
        city: string | undefined;
        state: string | undefined;
        country: string | undefined;
        occupation: string | undefined;
        bio: string | undefined;
        userImage: string | undefined;
        accountStatus:string | number;
        verificationStatus: number | boolean;
        accountSecurity_2FA: boolean | string;
        roles:  {
            User: number;
            Admin?: number | undefined;
            Dev?: number | undefined;
            Staff?: number | undefined;
        } ;
        refreshToken: string[];
}
// :userInterface 
const UserSchema=  new Schema({
    firstName:{
        type:String,
    },
    lastName:{
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
    gender:{
         type:String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported'
          },
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    occupation:{
        type:String
    },
    bio:{
        type:String
    },
    userImage:{
        type:String
    },
    accountStatus:{
         type:String,
    enum: {
        values: ['active', 'banned','disabled','deactivated','deleted'],
        message: '{VALUE} is not supported'
      },
    default:'active',
    required: true   
    },
      
    verificationStatus:{
         type:Boolean,
    enum: {
        values: [0,1],
        message: '{VALUE} is not supported' 
      },
    default:0,
    required: true   
    },
    accountSecurity_2FA:{
        type:Number,
        enum: {
            values: [0, 1],
            message: '{VALUE} is not supported'
          },
        default:0,
        required: true   
    },
    roles:{
        User:{ 
        type:Number,
        default:1003,},
        Admin:Number,
        Dev:Number,
        Staff:Number, 
    },
    refreshToken: [String]


},
{timestamps:true});
UserSchema.plugin(mongoosePaginate);

export default mongoose.model('User',UserSchema);