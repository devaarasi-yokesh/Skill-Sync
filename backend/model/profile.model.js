import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true //assuming one profile per user
    },
    name: String,
    email: String,
});

const Profile = mongoose.model('Profile',profileSchema);

export default Profile;