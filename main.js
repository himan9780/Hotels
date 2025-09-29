const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


//Middleware function
// const logRequest = (req, res, next) => {
//     console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
//     next();
// }
// app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session : false})
app.get('/', function(req, res){
    res.send("Hello World Hotel... How i can help you?, we have list of menus")
})


const personRoutes = require('./routes/personRoute');
const MenuItemRoutes = require('./routes/MenuItemRoute')




app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu', MenuItemRoutes);




app.listen(PORT, ()=>{
    console.log("Server is live: 3000")
})

