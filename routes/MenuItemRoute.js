const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem')


// POST method for menu
router.post('/', async(req, res) => {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);

        const response = await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal, Server Error"})
    }
    
})


// GET method for menu
router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log("Data fetched")
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal, Server Error"})
    }
})

//Comment added
module.exports = router;



