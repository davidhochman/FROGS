const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

//FUNCTION DEFINITIONS
const { createUser } = require('../data-access/userDAO'); 
const { updateUser } = require('../data-access/userDAO'); 
const { bookAppointment } = require('../data-access/userDAO');
const { getUserApp } = require('../data-access/userDAO'); 
const { createBusiness } = require('../data-access/businessDAQ');
const { updateReview } = require('../data-access/businessDAQ');
const { getMetrics } = require('../data-access/businessDAQ');
const { getApp } = require('../data-access/businessDAQ');
const { getReview } = require('../data-access/businessDAQ');
const { updateProfile } = require('../data-access/profUpdate');
const { updateBooking } = require('../data-access/profUpdate');
const { getBusiness } = require('../data-access/businessDAQ');
const { getBusinessBusid } = require('../data-access/businessDAQ');
const { getBusinesses } = require('../data-access/businessDAQ');
const { deleteApp } = require('../data-access/businessDAQ');
const { createBooking } = require('../data-access/businessDAQ');
const { getUser } = require('../data-access/userDAO');
const { newReview } = require('../data-access/userDAO'); 
const { cancelApp } = require('../data-access/userDAO'); 
const { getUserReview } = require('../data-access/userDAO'); 


//REGISTER ENDPOINT
router.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
});

//REGISTER BUSINESS ENDPOINT
router.post('/regbusiness', async (req, res) => {
    try {
        console.log('Regbusiness Reached');
        const userID = req.body;
        const newBusiness = await createBusiness(userID);
    } catch (err) {
        console.error('Error in businessregistration:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//GET USER ENDPOINT
router.post('/getuser', async (req, res) => {
    try {
        console.log('getuser Reached');
        const userID = req.body;
        const  newUser = await getUser(userID);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error in businessregistration:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//GET BUSINESS ENDPOINT
router.post('/getbusiness', async (req, res) => {
    try {
        console.log('getbusiness Reached');
        const userID = req.body;
        const newBusiness = await getBusiness(userID);
        res.status(201).json(newBusiness);
    } catch (err) {
        console.error('Error in businessregistration:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//GETT APPOINTMENTS ENDPOINT
router.post('/getapps', async (req, res) => {
    try {
        console.log('getapps Reached');
        const busID = req.body;
        const appData = await getApp(busID);
        res.status(201).json(appData);
    } catch (err) {
        console.error('Error in getapps:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//BUSINESS PROF UPDATE ENDPOINT
router.post('/update', async (req, res) => {

    try {
        console.log('Update profile reached');

        const updatedData = req.body.updatedData; 
        const userID = req.body.userID;     
        const busID = req.body.busID;  

        const update = await updateProfile(updatedData, userID, busID); 
        res.status(201).json(update);

    } catch (err) {
        console.error('Error in updating profile:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//USER PROF UPDATE ENDPOINT
router.post('/updateuser', async (req, res) => {

    try {
        console.log('Update user reached');

        const updatedData = req.body.updatedData; 
        const userID = req.body.userID;     

        const update = await updateUser(updatedData, userID); 
        res.status(201).json(update);

    } catch (err) {
        console.error('Error in updating profile:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//LOGIN ENDPOINT
router.post('/login', async (req, res, next) => {
    try {
        console.log('Login route reached');
        const { username, password } = req.body;
        const result = await authService.loginUser(username, password);

        if (result) { 
            console.log('VALID')
            res.json(result);
        }
        else{
            console.log('INVALID')
            res.status(401).json({ error: 'Invalid credentials' }); 
        }
        
    } catch (err) {
        next(err); 
    }
});

//CREATE BOOKING ENDPOINT
router.post('/createbooking', async (req, res) => {

    try {
        console.log('createbooking profile reached');

        const formData = req.body.data; 
        console.log(formData);
        const busID = req.body.busID;  
        console.log(busID);

        const update = await createBooking(formData, busID); 
        res.status(201).json(update);

    } catch (err) {
        console.error('Error in creating booking:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//UPDATE BOOKING ENDPOINT
router.post('/updatebooking', async (req, res) => {

    try {
        console.log('Update booking reached');

        const updatedData = req.body.updatedData; 
        const appID = req.body.appID;     

        const update = await updateBooking(updatedData, appID); 
        res.status(201).json(update);

    } catch (err) {
        console.error('Error in updating profile:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//DELETE BOOKING ENDPOINT
router.post('/deletebooking', async (req, res) => {
    try {
        console.log('delete business Reached');
        const appID = req.body;
        const  response = await deleteApp(appID);
        res.status(201).json(response);
    } catch (err) {
        console.error('Error in booking deletion:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//GET REVIEWS ENDPOINT
router.post('/getreviews', async (req, res) => {
    try {
        console.log('getreviews Reached');
        const busID = req.body;
        const reviewData = await getReview(busID);
        res.status(201).json(reviewData);
    } catch (err) {
        console.error('Error in getreviews:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//UPDATE REVIEW ENDPOINT
router.post('/updatereview', async (req, res) => {

    try {
        console.log('Update booking reached');

        const reviewID = req.body.updatedData; 
        const reply = req.body.reply;
        
        console.log(reviewID);
        console.log(reply);

        const update = await updateReview(reviewID, reply); 
        res.status(201).json(update);

    } catch (err) {
        console.error('Error in updating profile:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//GET METRICS ENDPOINT
router.post('/getmetrics', async (req, res) => {
    try {
        console.log('getmetrics Reached');
        const busID = req.body;
        const  metricData = await getMetrics(busID);
        res.status(201).json(metricData);
    } catch (err) {
        console.error('Error in getting metrics:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//GET BUSINESS ENDPOINT
router.post('/getbusinesses', async (req, res) => {
    try {
        console.log('getbusiness Reached');
        const busData = await getBusinesses();
        res.status(201).json(busData);
    } catch (err) {
        console.error('Error in businessregistration:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//BOOK APPOINTMENT ENDPOINT
router.post('/bookappointment', async (req, res) => {

    try {
        console.log('Update user reached');

        const appID = req.body.updatedData; 
        const userID = req.body.userID;     

        const update = await bookAppointment(appID, userID); 
        res.status(201).json(update);

    } catch (err) {
        console.error('Error in updating profile:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//USER APPOINTMENTS ENDPOINT
router.post('/getuserapps', async (req, res) => {
    try {
        console.log('getapps Reached');
        const userID = req.body;
        const appData = await getUserApp(userID);
        res.status(201).json(appData);
    } catch (err) {
        console.error('Error in getapps:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//BUSID HELPER FUNCTION ENDPOINT
router.post('/getbusinessbusid', async (req, res) => {
    try {
        console.log('getbusinessbusid Reached');
        const busID = req.body;
        const newBusiness = await getBusinessBusid(busID);
        res.status(201).json(newBusiness);
    } catch (err) {
        console.error('Error in businessregistration:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//CANCEL APP ENDPOINT
router.post('/cancelapp', async (req, res) => {
    try {
        console.log('cancelapp Reached');
        const userID = req.body;
        const deleteApp = await cancelApp(userID);
        res.status(201).json(deleteApp);
    } catch (err) {
        console.error('Error in cancelapp:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//NEW REVIEW ENDPOINT
router.post('/newreview', async (req, res) => {

    try {
        console.log('Update profile reached');

        const review = req.body.newReview; 
        const userID = req.body.userID;     
        const busID = req.body.busID;  
        const rating = req.body.rating

        const update = await newReview(review, userID, busID, rating); 
        res.status(201).json(update);

    } catch (err) {
        console.error('Error in updating profile:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

//USER REVIEWS ENDPOINT
router.post('/getuserreviews', async (req, res) => {
    try {
        console.log('getuserreviews Reached');
        const userID = req.body;
        const reviewData = await getUserReview(userID);
        res.status(201).json(reviewData);
    } catch (err) {
        console.error('Error in getreviews:', err); 
        res.status(500).json({ error: err.message }); 
    }
});





module.exports = router;