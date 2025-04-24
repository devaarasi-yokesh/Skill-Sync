import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    goal:{
        type: Object,
        required: true
    }
},
{
    timestamps: true
});

const Goal = mongoose.model('Goal',goalSchema);

export default Goal;