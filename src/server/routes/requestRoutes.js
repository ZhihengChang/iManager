const express = require("express");
const router = express.Router();
//get all users routes
const routes = require("../../config/routes.json").request;
const requestController = require("../controllers/requestController");

//  /:username
router.route(routes.requestView)
    .get(requestController.renderRequest);

//  /create/:username
router.route(routes.requestCreate)
    .post(requestController.sendRequest);

module.exports = router;