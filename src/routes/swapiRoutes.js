const express = require("express");
const swapiController = require("../controller/swapiController");


const router = express.Router();

router.post("/save/:id", swapiController.post);
router.get("/obtain", swapiController.get);

module.exports = router;