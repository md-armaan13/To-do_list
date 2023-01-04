const express = require("express");
const TodoController = require('../controllers/todo');

const router = express.Router();

router.post('/create/:id', TodoController.createTodo);

router.get('/:id', TodoController.getTodos);

router.get('/:todoId', TodoController.getTodo);

router.get('/delete/:text', TodoController.deleteTodo);

router.get('/done/:text', TodoController.completeTodo);


router.put('/:todoId', TodoController.updateTodo);




router.post('/sign-up',TodoController.Create_user);
router.post('/sign-in',TodoController.signIn);
module.exports = router;