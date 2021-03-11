const express = require("express");
//get all users routes
const routes = require("../../config/routes.json").users;
const userController = require("../controllers/userController");

const router = express.Router();

//Routes
router.route(routes.userLogin)
    .post(userController.validateUser);

router.route(routes.userRoot)
    .get(userController.getAllUser)
    .post(userController.createUser);

router.route(routes.userProfile)
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/dashboard/:username')
// router.route(routes.userDashboard)
    .post(userController.renderUserDashboard);

module.exports = router;