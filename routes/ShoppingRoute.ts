import express,{Request ,Response, NextFunction} from 'express';
import { GetFoodAvailability, GetFoodsIn30min, GetTopResturants, ResturantById, SearchFoods } from '../Controller';
const router=express.Router();

/**food Availaibility * */

router.get('/:pincode',GetFoodAvailability)

////////top   resturant///////
router.get('/top-restaurants/:pincode',GetTopResturants)


///search foods  ////////
router.get('/foods-in-30-min/:pincode',GetFoodsIn30min)


router.get('/search/:pincode',SearchFoods)

router.get('/restaurant/:id',ResturantById)

export {router as ShoppingRoute};
