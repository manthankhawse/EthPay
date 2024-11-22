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
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema);


export default User;