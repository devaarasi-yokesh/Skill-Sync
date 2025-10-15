import mongoose from "mongoose";


const resourceSchema = new mongoose.Schema(
    {
       name: { type: String, required: true},
       link: { type: String, required: true },
       id: { type: String, required: true },
       completed: { type: Boolean, default: false },
    }
,
{
    timestamps: true
});

const Resource = mongoose.model('Resource',resourceSchema);

export default Resource;