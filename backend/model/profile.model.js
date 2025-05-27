import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: String,
    email: String,
});

export default profileSchema;