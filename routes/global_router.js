const express = require("express");
const router = express.Router();
const multer = require('multer');
var upload = multer();
// const {SaveAppearence, GetAppearence, SaveMenuSetting, GetMenuSetting, SaveFooter, GetFooter, GetCommunication, SaveCommunication,GetCreateData, SetCreateData} = require('../controllers/GlobalController')
const GlobalControl = require('../controllers/GlobalController')
const { validateToken } = require("../middleware/validateToken");


router.get("/getAppearence", GlobalControl.GetAppearence )
router.post("/saveAppearence", GlobalControl.SaveAppearence )

router.get("/getMenuSetting", GlobalControl.GetMenuSetting )
router.post("/saveMenuSetting", GlobalControl.SaveMenuSetting )

router.get("/getFooter", GlobalControl.GetFooter )
router.post("/saveFooter", GlobalControl.SaveFooter )

router.get("/getCommunication", GlobalControl.GetCommunication )
router.post("/saveCommunication", GlobalControl.SaveCommunication )

router.get("/getCreateData", GlobalControl.GetCreateData )
router.post("/saveCreateData", GlobalControl.SaveCreateData )

router.get("/getMarketPlace", GlobalControl.GetMarketPlace )
router.post("/saveMarketPlace", GlobalControl.SaveMarketPlace )

router.get("/getWallet", GlobalControl.GetWallet )
router.post("/saveWallet", GlobalControl.SaveWallet )

router.get("/getPermission", GlobalControl.GetPermission )
router.post("/savePermission", GlobalControl.SavePermission )

router.get("/getFonts", GlobalControl.getFonts )








module.exports = router;