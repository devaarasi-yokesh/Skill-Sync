import mongoose from "mongoose";
import Resource from "../model/resource.model.js";
import dotenv from 'dotenv'
import Goal from "../model/goal.model.js";

dotenv.config()

export const getResource = async(req,res) =>{
    
    try{
       const resources = await Resource.find({}); 
       return res.status(200).json({success:true,data:resources});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}


export const createResource = async(req,res) =>{
    const resource = req.body;
    console.log(resource)
    if(!resource.goal || !resource.task ){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    const newResource = new Resource(resource);

    try{
       await newResource.save(); 
       return res.status(200).json({success:true, message:"Resource successfully added",data:newResource});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}

export const createGoal = async(req,res) =>{
    const resource = req.body;
    if(!resource.goal ){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    const newGoal = new Goal(resource);

    try{
       await newGoal.save(); 
       return res.status(200).json({success:true, message:"Resource successfully added",data:newGoal});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}

export const updateResource = async(req,res) =>{
    const {id} = req.params;
    const resource = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }
    try{
        const updatedResource = await Resource.findByIdAndUpdate(id, resource, {new:true});
       
        return res.status(200).json({success:true, message:"Resource updated successfully"});
    }catch(error){
        console.error(error);
        res.status(400).json({success:false, message: 'Product not found '})
    }
}

export const deleteResource = async(req,res) =>{
    const {id} = req.params;
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }
    
    try{
       
         await Resource.findByIdAndDelete(id);
         
        return res.status(200).json({success:true, message:"Resource deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(400).json({success:false, message: 'Product not found '})
    }
}

// export const getArticles = async (req,res)=>{
//     const {article} = req.params;
//     const articles = await fetch(`https://dev.to/api/articles?tag=${article}&per_page=5`).then((data)=> data.json());
   
//     res.status(200).json({success:true, message:'Articles found',data:articles});
// }

export const getVideos = async (req,res)=>{
    const {tag} = req.params;
    const key = process.env.YOUTUBE_API_KEY;
    const videos = await fetch(`https://www.googleapis.com/youtube/v3/search
?part=snippet
&maxResults=2
&q=${tag}
&type=video
&key=${key}`).then((data)=> data.json());

    console.log(videos.items.map((item)=> JSON.stringify(item,null,2)))
    res.status(200).json({success:true, message:'Articles found',data:videos});
}