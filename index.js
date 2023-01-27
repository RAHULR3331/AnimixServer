 //Server Creation




 // 1)import Express
 const express = require('express');


 //import data services
 const dataservice = require('./services/data.service')

 //import cors
 const cors =  require('cors')
 //import jwt
 const jwt = require('jsonWebtoken')


 // 2)Create an application using the Exxpress
 const app = express();

 //To parse JSON from request body
 app.use(express.json())
 
//give command to share data via cors
 app.use(cors({
    origin:['http://localhost:4200','http://192.168.0.123:8080','http://127.0.0.1:8080']
 }))

 // 3)Create a Port Number
 app.listen(3000, () => {
     console.log('listening on port 3000 ');
 })
 //Application spesific middleware
 const appMiddileeware = (req, res, next) => {
     console.log("Application spesific middleware");
     next();
 }
 app.use(appMiddileeware)

 //Router specific middleware\
 const jwtMiddleware = (req, res, next) => {
 try {
    
         console.log("Router spesific middleware");
         const token = req.headers['x-access-token'];
         const data = jwt.verify(token, 'superkey2022');
         console.log(data);
         next();
     }


 catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login first"
    })
 }
}

 //Registration request
 app.post('/register', (req, res) => {
     console.log(req.body);
     dataservice.register(req.body.email, req.body.username, req.body.pswd)
     .then(result=>{
        res.status(result.statusCode).json(result);

     })
     
     //  res.send('register successfull')
 })

 //Login request
 app.post('/login', (req, res) => {
     console.log(req.body);
     dataservice.login(req.body.email, req.body.pswd)
     .then(result=>{
        res.status(result.statusCode).json(result);
     })    
     //  res.send('login successfull')
 })

 //api to get manga items
 app.get('/getmanga', (req, res) => {
    dataservice.getmanga(req.body.id,req.body.name, req.body.description, req.body.Rating ,req.body.episode, req.body.categorie, req.body.studio, req.body.img).then(
        (result) => {
            res.status(result.statusCode).json(result)
        })
})

//api to post watchlist
app.post('/addtowatchlist',(req,res)=>{
    dataservice.addtowatchlist(req.body.email,req.body.id,req.body.name,req.body.description,req.body.Rating,req.body.episode,req.body.categorie,req.body.studio,req.body.img)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//api to post getwatch list
app.post('/getwatchlist',(req,res)=>{
    dataservice.getwatchlist(req.body.email)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//api to delete a anime from watch list
app.delete('/deletewatchlist/:email',(req,res)=>{
    dataservice.deletewatchlist(req.params.email)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})
