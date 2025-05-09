const express = require('express');
const router = express.Router();

const {createActivity, getAllActivity} = require("../controller/Activity")
const {createActivitySchema} = require("../validations/activityValidator")
const {validate} = require("../middleware/validate")

router.post("/createActivity",validate(createActivitySchema),createActivity)
router.get("/listActivities",getAllActivity);
module.exports = router;