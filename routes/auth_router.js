const express = require("express");
const router = express.Router();
const multer = require('multer');
var upload = multer();
const AuthController =  require("../controllers/AuthController");
const { validateToken } = require("../middleware/validateToken");

router.post("/admin_login", AuthController.loginAdmin )
router.post("/customer_login", AuthController.loginCustomer )
router.post("/resetPassword", AuthController.resetPassword )

router.get("/getCustomersbyAdmin",validateToken, AuthController.getCustomersbyAdmin )
router.get("/getCustomer/:id",validateToken, AuthController.getCustomer )
router.post("/registerCustomerbyAdmin",validateToken, AuthController.registerCustomerbyAdmin )
router.post("/registerCustomerbySuper",validateToken, AuthController.registerCustomerbySuper )
router.post("/changeCustomer",validateToken, AuthController.changeCustomer )

router.get("/getAdmins",validateToken, AuthController.getAdmins )
router.post("/getCurrentUser",validateToken, AuthController.getCurrentUser )
router.post("/changeAdmin",validateToken, AuthController.changeAdmin )
router.post("/registerAdmin", AuthController.registerAdmin )


module.exports = router;