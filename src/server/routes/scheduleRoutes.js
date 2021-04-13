const express = require("express");
const router = express.Router();
//get all users routes
const routes = require("../../config/routes.json").schedule;
const scheduleController = require("../controllers/scheduleController");


router.route(routes.scheduleView)
    .get(scheduleController.renderSchedule);

router.route(routes.allSchedules)
    .get(scheduleController.getAllSchedule);

module.exports = router;