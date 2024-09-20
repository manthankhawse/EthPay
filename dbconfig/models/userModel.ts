import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    wallet:{
        type:String,
        required: [true, "enter a valid wallet address"]
    },
    walletAddresses:{
        type:[String],
        default:[]
    }
})

const User = mongoose.model("users", userSchema);

export default User;