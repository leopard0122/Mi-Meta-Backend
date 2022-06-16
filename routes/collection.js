const express = require("express");
const router = express.Router();

const { create, get, addFavorite } = require("../controllers/CollectionController");

router.post("/create", create );
router.post("/addFavorite", addFavorite );
router.get("/get", get );

module.exports = router;