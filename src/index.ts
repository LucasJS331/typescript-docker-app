import express from 'express';
import axios from 'axios';
import User from '../interfaces/user-interface';
import db_user  from '../models/user';
import mongoose from 'mongoose'

const app = express();
const port = 5000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());


mongoose
.connect("mongodb://mongo:27017/app_types")
.then(()=> console.log('mongo is connected'))
.catch((err)=> console.log(err))

app.get("/", async (req,res)=>{
    let result: User = (await axios.get("https://randomuser.me/api/")).data.results[0].name;
    res.json(result);

})

app.post('/user', async (req,res)=>{
    let result: User = (await axios.get("https://randomuser.me/api/")).data.results[0].name;
    try {
       let newUser = new db_user({
           name: result.first
       })

       await newUser.save();
       res.send(result.first);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }


})

app.listen(port, ()=>{
    console.log(`this aplication is running on port ${port}`);
})