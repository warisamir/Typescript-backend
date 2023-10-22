import express,{Request ,Response,NextFunction} from 'express';
import { CreateVandor, GetVandorById, GetVandors } from '../Controller';
const router =express.Router();
router.post('/vandor',CreateVandor);

router.get('/vandors',GetVandors);

router.get('/vandor/:id',GetVandorById);

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    return res.json({message:"helo from rocky"});
})


export {router as AdminRoute};
