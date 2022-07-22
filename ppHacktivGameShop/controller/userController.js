const {User} = require('../models')
const bcryptjs = require('bcryptjs')
class userController{

    static registerForm(req,res){
        res.render('registerForm')
    }

    static postRegister(req,res){
        const {username,email,password} = req.body
        User.create({username,email,password})
            .then(newUser =>{
                res.redirect('/login')
            })
            .catch((err)=>{
                res.send(err)
            })
    }

    static loginForm(req,res){
        const {error} = req.query
        res.render('loginForm.ejs', {error})
    }

    static postLogin(req,res){
        const {username,password} = req.body
        User.findOne({where:{username}})
        .then(user =>{
            if(user){
            const isValidPassword = bcryptjs.compareSync(password,user.password)

            if(isValidPassword && user.isAdmin === true){
                return res.redirect('/adminHome')
            }else if(isValidPassword){
                return res.redirect('/')
            } else {
                const error = "Invalid username or password"
                return res.redirect(`/login?error =${error}`)
            }
        }else{
            const error = "Username not found"
            return res.redirect(`/login?error =${error}`)
        }
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = userController