const express = require("express");
const router = express.Router();
//get all users routes
const routes = require("../../config/routes.json").request;
const requestController = require("../controllers/requestController");

//  /:username
router.route(routes.requestView)
    .get(requestController.renderViewRequest);

//  /create/:username
router.route(routes.requestCreate)
    .post(requestController.sendRequest);

router.route(routes.requestHandleApprove)
    .get(requestController.approveRequest);

router.route(routes.requestHandleDecline)
    .get(requestController.declineRequest);

module.exports = router;