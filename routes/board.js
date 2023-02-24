const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.route('/').post(boardController.createNewBoard)
                .delete(boardController.deleteBoard);

router.put('/sections', boardController.addingNewSection);

router.put('/tasks', boardController.addingNewTask);

module.exports = router;