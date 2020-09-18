const express =  require('express');
const  router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const User = require('../models/user');

router.get('/watchlater', requireLogin, (req,res) =>{
    User.findById({_id:req.user._id}).select("-password")
    .then(user=>{
        res.json({user})
    })
    .catch(err=>{console.log(err);})
});

router.post('/watchlater', requireLogin, (req, res)=>{
    const {title, episodes} = req.body;
    User.findByIdAndUpdate(req.user._id,{
        $push:{watchLater:{title:title, episodes: episodes}}
    },{new:true})
    .then(result=>{
        console.log(result);
        res.json(result);
    }).catch(err=>{
        return res.status(422).json({error: err})
    })
})

router.put("/watchlater", requireLogin, (req,res)=>{
    const {title, episodes} = req.body;
    User.findByIdAndUpdate(req.user._id,{
        $pull:{watchLater:{title:title, episodes: episodes}}
    },{
        new:true
    }).then(result=>{
        console.log(result);
        res.json(result);
    }).catch(err=>{
        return res.status(422).json({error: err})
    })
})

router.get('/watchlist', requireLogin, (req, res)=>{
    User.findById({_id:req.user._id}).select("-password")
    .then(user=>{
        res.json({user})
    })
    .catch(err=>{console.log(err);})
})

router.post('/watchlist/add', requireLogin, (req,res)=>{
   const {title, episodes, watched} = req.body;
   User.findByIdAndUpdate(req.user._id,{
        $push:{watchList:{title:title, episodes: episodes, watched}}
    },{
        new:true
    }).then(result=>{
        console.log(result);
        res.json(result);
    }).catch(err=>{
        return res.status(422).json({error: err})
    })
   
  
    //check full then remove
    //increase watched 
})

router.post('/watchlist/save', requireLogin, async (req,res)=>{
    const {title, episodes, watched} = req.body;
    User.findOne({_id:req.user._id})
    .then(user=>{
        for(let i = 0; i<user.watchList.length;i++){
            if(user.watchList[i].title === title){
                user.watchList[i].watched = watched;
                break;
            }
        }
        user.save();
    })
    // .then(result=>{
    //     console.log(result);
    //     res.json(result);
    //     }).catch(err=>{
    //     console.log(err);
    //     return res.status(422).json({error: err})
    //     })
})

router.post('/watchlist/del', requireLogin, (req,res)=>{
    const {title, episodes, watched} = req.body;
    User.findByIdAndUpdate(req.user._id,{
        $pull:{watchList:{title:title, episodes: episodes, watched: watched}}
    },{
        new:true
    }).then(result=>{
        console.log(result);
        res.json(result);
    }).catch(err=>{
        return res.status(422).json({error: err})
    })
})

module.exports = router;



// { 
//     "$set": {["watchList.$[outer].$watched"]: watched} 
//   },
//   { 
//    "arrayFilters": [{ "outer.id": title }]
// })

