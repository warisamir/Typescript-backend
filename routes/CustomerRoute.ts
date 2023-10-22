import express from 'express'
import { CustomerSignup } from '../Controller/CustomerController';
const router=express.Router();


//create customer & login
router.post('/signup',CustomerSignup);
router.post('/login')

// /Authencticate
router.patch('/verify')
router.get('/otp')
router.get('/profile')
router.patch('/profile')


export {router as CustomerRoute};

