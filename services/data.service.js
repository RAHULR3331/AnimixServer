const jwt = require('jsonwebtoken');

//import DB
const db = require("./db");

const register = (acno, username, password) => {
    return db.User.findOne({
            acno
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
                    acno:acno,
                    username:username,
                    password:password,
                    balance: 0,
                    transaction: []
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

const login = (acno, pswd) => {
    return db.User.findOne({
            acno,
            password: pswd
        })
        .then(user => {
            if (user) {
                currentUser = user.username
                currentAcno = acno
                const token = jwt.sign({
                    currentAcno: acno
                }, 'superkey2022') //to generate token
                return {
                    status: 'true',
                    statusCode: 200,
                    message: "login sucessfull",
                    token: token,
                    currentAcno:acno,
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
                    products: result
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
const addtowatchlist = (id,description,Rating,episode,categorie,studio,img) => {
    //data added to mongodb -- Creat a model db.js
    return db.watchlist.findOne({
        id
    }).then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    message: "Item already exist....."
                }
            } else {
                const newProduct = new db.wishlist({
                    id,
                    name,
                    description,
                    Rating,
                    episode,
                    categorie,
                    studio,
                    img
                })
                newProduct.save();
                return {
                    status: true,
                    statusCode: 400,
                    message: "Item added wishlist successfully"
                }
            }
        }
    )


}



module.exports = {
    register,
    login,
    getmanga,
    addtowatchlist
}