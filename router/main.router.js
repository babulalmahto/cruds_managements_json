const router = require("express").Router();
const mainController = require("../controller/main.controller");

router.get('/user', mainController.getUser);

router.post('/user', mainController.createUser);

router.put('/user', mainController.updateUser);

router.delete('/user', mainController.deleteUser);

module.exports = { router };