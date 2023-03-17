const express = require('express');
const traderouter = express.Router();
const tradecontroller = require('../controllers/Tradecontroller');
const {isLoggedIn,isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');
const{validateDress,validateResult} = require('../middlewares/validator');

//GET /tradess: send all items to the user
traderouter.get('/', tradecontroller.trades);


//GET /trades/new: send html form for creating a new DressItem
traderouter.get('/newTrade',isLoggedIn,tradecontroller.new);

//POST /trades: create a new DressItem
traderouter.post('/',isLoggedIn, validateDress, validateResult, tradecontroller.create);

//GET /trades/:id: send details of DressItem identified by id
traderouter.get('/:id', validateId, tradecontroller.show);

//GET /trades/:id/edit: send html form for editing existing DressItem
traderouter.get('/:id/edit',isLoggedIn, validateId, isAuthor, tradecontroller.edit);

//PUT /trades/:id: update the DressItem identified by id
traderouter.put('/:id',isLoggedIn, validateId, isAuthor, validateDress, validateResult, tradecontroller.update);

//DELETE /trades/:id/edit: send html form for editing existing DressItem
traderouter.delete('/:id',isLoggedIn, validateId, isAuthor,tradecontroller.delete);


// Exporting the route to the server
module.exports = traderouter; 