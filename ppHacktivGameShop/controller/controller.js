const {Item} = require('../models/index')
const { Op } = require("sequelize")

class controller{
    static mainpg(req,res){
        Item.findAll({where : {availability : {[Op.eq] : true}}})
        .then(result =>{
            res.render('home.ejs',{result})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static adminMain(req,res){
        Item.findAll()
        .then(result =>{
            res.render('adminHome.ejs',{result})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static addItem(req,res){
        res.render('addItem.ejs')
    }

    static postAddItem(req,res){
        const {name,price,stock,CategoryId} = req.body
        Item.create({name,price,stock,CategoryId})
            .then(newItem =>{
                console.log("Success")
                res.redirect('/adminHome')
            })
            .catch((err)=>{
                console.log("error")
                res.send(err)
            })
    }
}

module.exports = controller