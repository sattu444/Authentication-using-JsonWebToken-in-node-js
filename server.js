const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

app.listen(3000, () => console.log(`server started at ${3000} ` ));

app.get("/" , (req, res) => {
    res.send("hello satya");
})

app.post("/api/posts/", verifyToken,(req ,res ) => {
    jwt.verify(req.token, "secretkey", (err,authData) => {
        if(err){
            res.status(400).send(err)
        }else{
            res.json({
                message: "post created...."
            });
            authData
        }
    })
    
});

app.post('/api/login', (req, res) => {
    const user = {
        user: 'satya',
        email: 'satya@gmail.com'
    };
    jwt.sign({user} , 'secretkey',{expiresIn : "30sec"}, (err, token) => {
        if(err){
            res.json({message: err.message});
        }else{  
            res.json({
                token
            })
        }
    });
    
})

//format of token
//Authorization : Satya <acessstoken>

function verifyToken(req, res ,next){
    const satyaHeader = req.headers['authorization'];
    
    //check type
    if(typeof satyaHeader !== undefined){

        const satya = satyaHeader.split(' ');
        const satyaToken = satya[1];
        req.token = satyaToken;

        next();
        
    }else{
        res.status(403).json({message: err.message})
    }

}