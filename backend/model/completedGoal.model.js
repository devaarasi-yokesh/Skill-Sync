import mongoose from "mongoose";

const completedGoalSchema = new mongoose.Schema({
    goal:{
        type: Object,
        required: true
    }
},
{
    timestamps: true
});

const completedGoal = mongoose.model('CompletedGoal',completedGoalSchema);

export default completedGoal;