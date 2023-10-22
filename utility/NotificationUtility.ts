
export const GenerateOtp=()=>{
const otp =Math.floor(100000+Math.random()*900000);
let expiry =new Date();
expiry.setTime(new Date().getTime()+(30*60*1000));

return {otp,expiry};
}



export const onRequestOTP=async(otp:number,toPhoneNumber:string)=>{
    const accountSid='ACefea2cb3fbf6d2514bc646e9c3bc9806';
    const authToken='33741c4d5e9a1e0c15fc13178bd1a532';
    const client =require('twilio')(accountSid,authToken);
    const response =await client.messages.create({
        body:`Your OTP is ${otp}`,
        from:'+15855662541',
        to:`+91${toPhoneNumber}`,
    })
    return response;
}

