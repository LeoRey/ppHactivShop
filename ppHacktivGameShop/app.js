const express = require('express')
const app =express()
const port = 3000
const routes = require('./routes/routes')

app.set('view engine','ejs')

app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(express.static('statics'))
app.use('/css',express.static(__dirname + 'statics/css'))
app.use('/js',express.static(__dirname + 'statics/js'))

app.listen(port, ()=>{
    console.log("Project hacktiv game shop at port 3000")
})