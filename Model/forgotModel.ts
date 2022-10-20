import mongoose from "mongoose"

const forgotSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    creationTime: {
        type: Number,
        required: true
    },
    expiration: {
        type: Number,
        required: true
    }
})

export default mongoose.model("ForgotPassword",forgotSchema )