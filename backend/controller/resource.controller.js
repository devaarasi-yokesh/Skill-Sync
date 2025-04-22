import mongoose from "mongoose";
import Resource from "../model/resource.model.js";


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

export const updateResource = async(req,res) =>{
    const {id} = req.params;
    const resource = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }
    try{
        const updatedResource = await Resource.findByIdAndUpdate(id, resource, {new:true});
        return res.status(200).json({success:true, message:"Resource updated successfully",data:updatedResource});
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

