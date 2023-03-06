const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/:id', boardController.getBoardsByUser)

router.route('/').post(boardController.createNewBoard)
                .delete(boardController.deleteBoard);

router.route('/sections').put(boardController.addingNewSection)
                        .delete(boardController.deleteSection);

router.put('/tasks', boardController.addingNewTask);

module.exports = router;