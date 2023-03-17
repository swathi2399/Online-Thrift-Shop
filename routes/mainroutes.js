const express = require('express');
const router = express.Router();
const controller = require('../controllers/maincontroller');
// GET Request for displaying homepage of the website
router.get('/',controller.homepage)
// GET Request for about page of the website
router.get('/about',controller.about)
//GET Request for the contact of the website
router.get('/contact',controller.contact)
//Exporting the route
module.exports = router 