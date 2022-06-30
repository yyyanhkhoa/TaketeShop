const router = require('express').Router()
const {verifyToken, verifyTokenWithSHOPRoles, verifyTokenWithSTAFFRoles } = require('../app/middleware/auth')
const { signupValidation, loginValidation } = require("../app/validations/authValidation");

const { userController } = require('../app/controller/index')

router.get('/getAllUser',userController.getAllUser)
router.get('/getAllStaff',verifyTokenWithSHOPRoles,userController.getAllStaff)
router.get('/:id', verifyToken,userController.getUserByIDRequest)
router.patch('/:id', verifyToken, userController.updateUserByIDRequest)
//router.patch('/staff/:id', verifyTokenWithSTAFFRoles, userController.updateUserByIDRequest)
router.patch('/addmin/staff/:id', verifyTokenWithSHOPRoles, userController.updateStaffByIDRequest)
router.patch('/password/:id', verifyToken, userController.updatePassByIDRequest)
// router.patch('/password/admin/:id', verifyTokenWithSHOPRoles, userController.updatePassByIDRequestADMIN)
// router.patch('/password/staff/:id', verifyTokenWithSTAFFRoles, userController.updatePassByIDRequestSTAFF)

router.post('/register', signupValidation, userController.register)
router.post('/login', loginValidation, userController.login)
router.delete('/:id', userController.deleteUserByIDRequest)
router.delete('/addmin/staff/:id',verifyTokenWithSHOPRoles, userController.deleteStaffByIDRequest)
router.patch('/addmin/staff/password/:id', verifyTokenWithSHOPRoles, userController.updatePassByIDAdmin)
router.get('/admin/:id', verifyTokenWithSHOPRoles, userController.getUserByIDRequestADMIN)
router.get('/refresh_token', userController.refreshToken)
router.get('/', userController.index)

module.exports = router