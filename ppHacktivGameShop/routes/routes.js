const routes =require('express').Router()
const controller = require('../controller/controller')
const userController = require('../controller/userController')

routes.get('/',controller.mainpg)
routes.get('/register',userController.registerForm)
routes.post('/register',userController.postRegister)
routes.get('/login',userController.loginForm)
routes.post('/login',userController.postLogin)
routes.get('/adminHome',controller.adminMain)
routes.get('/addItem',controller.addItem)
routes.post('/addItem',controller.postAddItem)

module.exports = routes