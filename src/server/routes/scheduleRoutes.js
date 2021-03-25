const express = require("express");
const router = express.Router();
//get all users routes
const {ensureEmployeeAuthenticated, ensureAdminAuthenticated} = require("../../config/auth");
const routes = require("../../config/routes.json").schedule;
const scheduleController = require("../controllers/scheduleController");


router.route(routes.scheduleView)
    .get(ensureEmployeeAuthenticated, scheduleController.renderSchedule);


module.exports = router;