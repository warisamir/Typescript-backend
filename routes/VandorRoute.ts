import express,{Request ,Response,NextFunction} from 'express';
import { GetVandorProfile, UpdateVandorService, VandorLogin ,UpdateVandorProfile, AddFood, GetFoods, UpdateVandorCoverImage } from '../Controller/VandorController';
import { Authenticate } from '../middleware';
import multer from 'multer';

const router =express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});

const images = multer({ storage: imageStorage }).array('images', 10);

router.post('/login',VandorLogin);
router.use(Authenticate);

router.get('/profile',Authenticate , GetVandorProfile);
router.patch('/profile',UpdateVandorProfile);
router.patch('/coverimage',images,UpdateVandorCoverImage)
router.patch('/service',UpdateVandorService);


router.post('/food',images,AddFood)
router.get('/foods',GetFoods)

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
 res.json({message:"hello from vendor"});
})

export {router as VandorRoute}; 