import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    institute: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    grade: {
        type: Number,
        min: 5,
        max: 10,
        default: 5
    },
    lastLogin : {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema)