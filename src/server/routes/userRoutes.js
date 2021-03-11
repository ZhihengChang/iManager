const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//Routes
router.route('/login')
    .post(userController.validateUser);

router.route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/dashboard/:username')
    .get(userController.renderUserDashboard);

module.exports = router;