const express = require("express");
const router = express.Router();
//get all users routes
const {ensureEmployeeAuthenticated, ensureAdminAuthenticated} = require("../../config/auth");
const routes = require("../../config/routes.json").payroll;
const payrollController = require("../controllers/payrollController");


router.route(routes.payrollView)
    .get(payrollController.renderPayroll);

module.exports = router;