import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    goal:{
        type: String,
        required: true
    },
    task:{
        type: Array,
        required: true
    },
    completedTasks:{
        type: Array,
        required: true
    }
},
{
    timestamps: true
});

const Resource = mongoose.model('Resource',resourceSchema);

export default Resource;