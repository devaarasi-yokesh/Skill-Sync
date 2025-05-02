import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    resource:{
        type: Array,
        required: true
    },
    completedResources:{
        type: Array,
        required: true
    }
},
{
    timestamps: true
});

const Resource = mongoose.model('Resource',resourceSchema);

export default Resource;