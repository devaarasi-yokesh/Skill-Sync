import mongoose from "mongoose";
import Goal from "../model/goal.model.js";
import dotenv from 'dotenv'
import CompletedGoal from "../model/completedGoal.model.js";
import Resource from "../model/resource.model.js";

dotenv.config()

export const getGoal = async(req,res) =>{
    
    try{
       const Goals = await Goal.find({}); 
       return res.status(200).json({success:true,data:Goals});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}


export const createGoal = async(req,res) =>{
    const goal = req.body;
    console.log(goal)
    if(!goal.goal || !goal.task ){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    const newGoal = new Goal(goal);

    try{
       await newGoal.save(); 
       return res.status(200).json({success:true, message:"Goal successfully added",data:newGoal});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}



export const updateGoal = async(req,res) =>{
    const {id} = req.params;
    const goal = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }
    try{
        const updatedGoal = await Goal.findByIdAndUpdate(id, goal, {new:true});
       
        return res.status(200).json({success:true, message:"Goal updated successfully"});
    }catch(error){
        console.error(error);
        res.status(400).json({success:false, message: 'Product not found '})
    }
}

export const deleteGoal = async(req,res) =>{
    const {id} = req.params;
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }
    
    try{
       
         await Goal.findByIdAndDelete(id);
         
        return res.status(200).json({success:true, message:"Goal deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(400).json({success:false, message: 'Product not found '})
    }
}



export const createCompletedGoal = async(req,res) =>{
    const goal = req.body;
    if(!goal.goal ){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    const newGoal = new CompletedGoal(goal);

    try{
       await newGoal.save(); 
       return res.status(200).json({success:true, message:"Goal successfully added",data:newGoal});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}



export const createResource = async(req,res) =>{
    const rsc = req.body;
    console.log(rsc)
    if(!rsc.resource ){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    const newRes = new Resource(rsc);

    try{
       await newRes.save(); 
       return res.status(200).json({success:true, message:"Goal successfully added",data:newRes});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}

export const getResource = async(req,res) =>{
    
    try{
       const resources = await Resource.find({}); 
       return res.status(200).json({success:true,data:resources});
    }catch(error){
        return res.status(500).json({success:false, message:"Server Error"});
    }
}

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