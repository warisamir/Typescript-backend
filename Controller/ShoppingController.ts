import express ,{Request,Response, NextFunction } from "express";
import { FoodDoc, Vandor } from "../Model";


export const GetFoodAvailability =async(req:Request,res:Response,next:NextFunction)=>{
const pincode =req.params.pincode;
const result=await Vandor.find({pincode:pincode, serviceAvailable:true})
.sort([['rating','descending']])
.populate("foods")
if(result.length>0)
{
   return res.status(200).json(result)
}
return res.status(400).json({message:"Data not found!"})
}

export const GetTopResturants=async(req:Request,res:Response ,next:NextFunction)=>{
    const pincode =req.params.pincode;
    const result=await Vandor.find({pincode:pincode, serviceAvailable:true})
    .sort([['rating','descending']])
    .limit(1)
    if(result.length>0)
    {
       return res.status(200).json(result)
    }
    return res.status(400).json({message:"Data not found!"})
}


export const GetFoodsIn30min=async(req:Request,res:Response,next:NextFunction)=>{
    const pincode =req.params.pincode;
    const result=await Vandor.find({pincode:pincode, serviceAvailable:true})
    .populate("foods")
    if(result.length>0)
   {
    let foodResult:any=[];
    result.map(vandor=>{
        const foods=vandor.foods as [FoodDoc]
        foodResult.push(...foods.filter(food=>food.readyTime<=15))  
    })
    return res.status(200).json(foodResult);
}
    return res.status(400).json({message:"Data not found!"})
}


export const SearchFoods=async(req:Request,res:Response,next:NextFunction)=>{
    const pincode =req.params.pincode;
    const result=await Vandor.find({pincode:pincode, serviceAvailable:false})
    .populate("foods")
    if(result.length>0) {
        let foodResult:any=[];
        result.map(item=>foodResult.push(...item.foods)) 
        return res.status(200).json(foodResult)
          }
     return res.status(400).json({message:"Data not found!"})   
}

export const ResturantById =async(req:Request,res:Response,next:NextFunction)=>{
    const Id =req.params.id;
    const result=await Vandor.findById(Id).populate("foods")
    if(result)
    {
       return res.status(200).json(result)
    }
    return res.status(400).json({message:"Data not found!"})
}