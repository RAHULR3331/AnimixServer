const jwt = require('jsonwebtoken');

//import DB
const db = require("./db");

const register = (email, username, password) => {
    return db.User.findOne({
            email
        })
        .then(user => {
            if (user) {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: 'user already registered'
                }
            } else {
                const newUser = new db.User({
                    email:email,
                    username:username,
                    password:password,
                    
                })

                newUser.save();
                return {
                    status: 'True',
                    statusCode: 200,
                    message: 'Register successfull'
                }

            }
        })
}

const login = (email, pswd) => {
    return db.User.findOne({
            email,
            password: pswd
        })
        .then(user => {
            if (user) {
                currentUser = user.username
                currentemail = email
                const token = jwt.sign({
                    currentemail: email
                }, 'superkey2022') //to generate token
                return {
                    status: 'true',
                    statusCode: 200,
                    message: "login sucessfull",
                    token: token,
                    currentemail:email,
                    currentUser:currentUser
                }

            } else {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: "invalid userdetails"
                }
            }
        })
}


//get manga for dispay in dashboard
const getmanga = () => {
    return db.Manga.find().then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    animies: result
                }
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: 'No products found'
                }
            }
        }
    )
}

//add to watch list
const addtowatchlist=(email,id,name,description,Rating,episode,categorie,studio,img)=>{
    return db.Watchlist.findOne({email,id})
    .then(watchlist=>{
        if(watchlist){
            return{
                  status:false,
                   statusCode:404,
                   message:"Movie already exist in your Watch list"                   
                }
        }else{
            const newMovie =new db.Watchlist({email,id,name,description,Rating,episode,categorie,studio,img})
                    newMovie.save()

                    return{
                        status:true,
                        statusCode:200,
                        message:'The Movie added to Watchlist'
                    }
        }

    })
}

//get watchlist from db to show in watch list component 
const getwatchlist=(email)=>{
    return db.Watchlist.find({email})
    .then(watchlist=>{
        if(watchlist){
            return{
                status:true,
                statusCode:200,
                watchlist,
            }

        }
        else{
            return{
                status: false,
                statusCode: 401,
                message: 'No movies in here'
            }
        }
    })
}

//delete watch list
const deletewatchlist=(email)=>{
    return db.Watchlist.deleteOne({email})
    .then(result=>{
        if(result){
            return{
                status:true,
                statuscode:200,
                message:'Anime deleted'
            }
        }
        else{
            return{
                status:false,
                statuscode:404,
                message:'No Anime found'
            }
        }
       }
        )
    }



module.exports = {
    register,
    login,
    getmanga,
    addtowatchlist,
    getwatchlist,
    deletewatchlist,

}