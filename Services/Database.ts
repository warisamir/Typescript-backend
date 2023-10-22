import mongoose from 'mongoose';
import { MONGO_URI } from '../Config'

export default async()=>{
    try{
await mongoose.connect(MONGO_URI,{
    // useNewUrlParser: true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
})
console.log(`DB conected`);
}
catch(er)
{
    console.log(er)
}
}
