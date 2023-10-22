import {NextFunction, Request ,Response} from 'express';
import {CreateVandorInput} from '../dto';
import { Vandor } from '../Model';
import { GeneratePassword, GenerateSalt } from '../utility/PasswordUtility';


export const FindVandor=async(id:string | undefined,email?:string)=>{
    if(email){
        return await Vandor.findOne({email:email})
    }
    else{
        return await Vandor.findById(id);
    }
}

export const CreateVandor=async(req:Request,res:Response,next:NextFunction)=>{
const {name,address,pincode,foodType,email,password,OwnerName,phone}=<CreateVandorInput>req.body;

const existingVandor=await FindVandor('',email);
if(existingVandor!==null){
    return res.json({"message":"A vandor is exist with this email ID"})
}

//generate the salt 
const salt=await GenerateSalt();
const userPasword =await GeneratePassword(password,salt);

//encrypt the password using the salt




const CreateVandor= await Vandor.create({
    name:name,
    address:address,
    pincode:pincode,
    foodType:foodType,
    email:email,
    password:userPasword,
    salt:salt,
    OwnerName:OwnerName,
    phone:phone,
    rating:0,
    serviceAvailable:false,
    coverImages:[],foods:[]
});

return res.json(CreateVandor);
}


export const GetVandors=async(req:Request,res:Response,next:NextFunction)=>{
const vandors=await Vandor.find();
if(vandors!==null){
return res.json(vandors)
}
return res.json({"message":'vandors data not available'})
}



export const GetVandorById=async(req:Request,res:Response,next:NextFunction)=>{
const vandorId=req.params.id;
const vandor=await FindVandor(vandorId);
if(vandor!==null){
    return res.json(vandor);
}
return res.json({"message":'vandors data not available'})
}

