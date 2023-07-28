const express = require('express');
const jwt = require('jsonwebtoken');

const port = 3000

const app = express();

app.get('/api',(req,res)=>{
    res.json({
        message:'Hey there! welcome to wilson api tutorial'
    });
});

app.post('/api/posts',verifyToken, (req,res) => {
    jwt.verify(req.token,"secretkey", (err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
             res.json({
                    message:'Posts created....',
                    authData
                });

        }
    });
   

});

app.post('/api/login',(req,res)=>{
    const user = {
        id:1,
        username:"Peter Lauren",
        email:"peter@gmail.com"
    };

    jwt.sign({user: user},"secretkey",(err, token) => {
        res.json({
            token
        });
    });
});

//verifyToken function
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403) //forbidden
    }

}



app.listen(port,(req,res)=>{
    console.log('server started on port '+port)
});