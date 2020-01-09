const express = require('express');
const controller = require('./note.controller');

const router = express.Router();

router.post('/add', controller.add);
// router.put('/edit', controller.edit);
router.delete('/delete/:id', controller.deleteOne);
router.get('/getAll/:id', controller.getAll);

module.exports = router;