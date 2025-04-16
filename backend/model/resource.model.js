import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    goal:{
        type: String,
        required: true
    },
    resName:{
        type: Array,
        required: true
    },
    resLink:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Resource = mongoose.model('Resource',resourceSchema);

export default Resource;