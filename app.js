const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {MONGOURI} = require('./config/keys');
const PORT = process.env.PORT||5000;
const authRoutes = require('./routes/auth');
const animeRoutes = require('./routes/anime');
app.use(express.json());
mongoose.connect(MONGOURI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(authRoutes);
app.use(animeRoutes);

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })

}

app.listen(PORT, ()=>{
    console.log("Server running at port 5000");
});

