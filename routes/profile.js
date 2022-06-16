const express = require("express");
const router = express.Router();

const { save, get } = require("../controllers/ProfileController");

router.post("/save", save );
router.get("/get", get );

module.exports = router;

