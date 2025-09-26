// let age = prompt("Enter your age");
// if(age > 18){
//     console.log("You are eligible")
// }
// else{
//     console.log("You are not eligible");
// }
// const prompt = require('prompt-sync')();

// let age = prompt("Enter your age: ");
// console.log(`Your age is ${age}`);

// const notes = require('./notes.js')
// let age = notes.age
// console.log(age)

// let result = notes.addNumber(10 ,20)
// console.log(result) 
const express = require('express')
const app = express()
const db = require('./db')


const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function(req, res){
    res.send("Hello World Hotel... How i can help you?, we have list of menus")
})


const personRoutes = require('./routes/personRoute');
const MenuItemRoutes = require('./routes/MenuItemRoute')




app.use('/person', personRoutes);
app.use('/menu', MenuItemRoutes);



app.listen(3000, ()=>{
    console.log("Server is live: 3000")
})

