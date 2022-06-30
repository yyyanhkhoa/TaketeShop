const router = require("express").Router();
const {verifyToken, verifyTokenWithSHOPRoles, verifyTokenWithSTAFFRoles } = require('../app/middleware/auth')
const { chanelController } = require("../app/controller/index");

router.get('/',chanelController.getAllChanel)//http://localhost:5000/chanel/

router.get('/:userId',chanelController.findChanelFromUserId)//http://localhost:5000/chanel/:userId

router.post('/:userId',chanelController.addChanel)

router.delete('/:userId',chanelController.deleteChanelFromUserId)


module.exports = router;
