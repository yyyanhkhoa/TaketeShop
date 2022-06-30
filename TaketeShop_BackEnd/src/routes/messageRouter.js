const router = require("express").Router();
const {verifyToken, verifyTokenWithSHOPRoles, verifyTokenWithSTAFFRoles } = require('../app/middleware/auth')
const { messagerController } = require("../app/controller/index");

router.get('/',verifyTokenWithSTAFFRoles,messagerController.getAllMessager)
router.get('/chanel/:chanelId',verifyToken,messagerController.getMessagerFromChanelId)
router.get('/staff/chanel/:chanelId',verifyTokenWithSTAFFRoles,messagerController.getMessagerFromChanelIdSTAFF)
router.get('/admin/chanel/:chanelId',verifyTokenWithSHOPRoles,messagerController.getMessagerFromChanelIdADMIN)
router.get('/:userId',verifyToken,messagerController.getMessagerFromUserId)
router.get('/admin/:userId',verifyTokenWithSHOPRoles,messagerController.getMessagerFromUserIdADMIN)
router.get('/staff/:userId',verifyTokenWithSTAFFRoles,messagerController.getMessagerFromUserIdSTAFF)

router.post('/add/:chanelId',messagerController.addMessager)


module.exports = router;
