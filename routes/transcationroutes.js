const express = require('express');
const transcation_router = express.Router();
const offers_controller = require('../controllers/offers_controller');
const {isLoggedIn,isAuthor} = require('../middlewares/auth');

transcation_router.post('/like/:id',isLoggedIn,offers_controller.like_function);
transcation_router.post('/offer/:id',isLoggedIn,offers_controller.offer_function);
transcation_router.post('/exchange',isLoggedIn,offers_controller.offer_exchange);
transcation_router.post('/handling/:id',isLoggedIn,offers_controller.handling);
transcation_router.post('/remove/:id',isLoggedIn,offers_controller.remove_transc);
transcation_router.post('/accept/:id',isLoggedIn,offers_controller.accept_transc);

module.exports = transcation_router; 