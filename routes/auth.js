const express =  require('express');
const  router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {JWT_SECRET} = require('../config/keys');

router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body;
    if(!email||!password||!name){
        return res.status(422).json({error: 'Please provide all the fields'});
    }
    User.findOne({email: email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: 'This email is already in use.'});
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name,
            })
            user.save()
            .then(user=>{
                res.json({message:"User Created Successfully"})
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
    .catch(err=>{
        console.log(err);
    })
});

router.post('/login', (req, res)=>{
    const {email, password} = req.body;
    if(!email||!password){
        res.status(422).json({error: "Please enter both email and password."})
    }
    User.findOne({email:email})
    .then(usr=>{
        if(!usr){
          return res.status(422).json({error: "Account with this email does not exist."})
        }
        bcrypt.compare(password,usr.password)
        .then(doMatch=>{
            if(doMatch){
               // res.json({message: "Signed in successfully."})
               const token = jwt.sign({_id: usr._id}, JWT_SECRET)
               const{_id,name,email,watchList,watchLater} = usr
               res.json({token,user:{_id,name,email,watchList,watchLater}})
            }
            else{ 
                res.status(422).json({error: "Incorrect password."})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
});

module.exports = router;