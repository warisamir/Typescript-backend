import express from 'express';
import App from './Services/ExpressApp'
import dbConnection from './Services/Database'

const StartServer=async()=>{
    const app =express();
    await dbConnection();
    await App(app);
    app.listen(8000,()=>{
        console.log('Listening to port 8000');

    });
}
StartServer();