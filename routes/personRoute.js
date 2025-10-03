const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');



router.post('/signup', async(req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("data saved");

        const payload = {
            id : response.id,
            username : response.username
        }
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response : response, token : token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal, Server Error"})
    }
    
})

router.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body;
        const user = await Person.findOne({username : username});

        if(!user || !(await username.comparePassword(password))){
            return res.status(401).json({error : 'Invalid username or password'});
        }

        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);
        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
});



router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log("Data fetched")
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal, Server Error"})
    }
})


router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType;  // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work : workType});
            console.log("Response fetched")
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error : "Invalid work type"});
        }
    }catch(err){
            console.log(err);
            res.status(500).json({error : "Internal, Server Error"})
    }
})


router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new : true,   //Return the updated document
            runValidators : true,   // Run Mongoose validation
        })


        if(!response){
            return res.status(404).json({error : 'Person not found'})
        }

        console.log('data updatd');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'})
    }
})


router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }
        console.log("data delete");
        res.status(200).json({message : 'person Delete Successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Serve Error"})
    }
    
})




module.exports = router;