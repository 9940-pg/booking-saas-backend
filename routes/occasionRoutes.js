const express = require("express");
const router = express.Router();
const occasionController = require("../controllers/occasionController");

router.get("/:professionalId", occasionController.getOccasions);
router.get("/fields/:occasionId", occasionController.getOccasionFields);

module.exports = router;