
import express, {Request,Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import {plainToClass} from 'class-transformer';
import { CreateCustomerInputs } from '../dto/Customer.dto';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP } from '../utility';
import { Customer } from '../Model/Customer';
    

export const CustomerSignup = async (req:Request,res:Response,next:NextFunction)=>{
const customerInputs=plainToClass(CreateCustomerInputs,req.body)
const inputErrors= await validate(customerInputs,{validationError:{target:true}})
if(inputErrors.length>0){
    return res.status(400).json(inputErrors);
}
const {email,phone,password}=customerInputs;
const salt =await GenerateSalt();
const userpassword=await GeneratePassword(password,salt);
const {otp, expiry}=GenerateOtp();
const result=await Customer.create({
        email:email,
        password:userpassword,
        phone:phone,
        salt:salt,
        otp:otp,
        opt_expiry:expiry,
        firstName:'',
        lastName:'',
        address:'',
        verified:false,
        lat:0,
        lng:0
})

if(result){
    //send the otp
await onRequestOTP(otp,phone)
const signature=GenerateSignature({
    _id:result._id,
    email:result.email,
    verified:result.verified
});
return res.status(201).json({signature:signature,verified:result.verified,email:result.email})
}
return res.status(201).json({message:"error"})
}


export const CustomerLogin = async (req:Request,res:Response,next:NextFunction)=>{

}

export const CustomerVerify = async (req:Request,res:Response,next:NextFunction)=>{

}
export const RequestOtp = async (req:Request,res:Response,next:NextFunction)=>{

}


export const GetCustomerProfile = async (req:Request,res:Response,next:NextFunction)=>{

}

export const CustomerProfile= async (req:Request,res:Response,next:NextFunction)=>{

}