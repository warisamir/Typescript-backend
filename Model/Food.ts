import mongoose,{ Schema, Document } from 'mongoose';

export interface FoodDoc extends Document {
    name:string;
    vandorId:string;
    description:string;
    categories:string;
    foodType:string;
    readyTime:number;
    price:number;
    rating:number;
    images:[string]
}
const FoodSchema=new Schema({
    vandorId:{type:String},
    name:{type:String ,required:true},
    description:{type:String,required:true},
    categories:{type:String},
    foodType:{type:String,required:true},
    readyTime:{type:Number},
    price:{type:Number,required:true},
    rating:{type:Number},
    imageS:{type:[String]}
},{
    toJSON:{
        transform(doc, ret) {
            delete ret._v,
            delete ret.createdAt,
            delete ret.updatedAt
        },
    },
    timestamps:true
})
const Food=mongoose.model<FoodDoc>('food',FoodSchema);
export { Food };
