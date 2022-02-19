const express = require('express');
const router = express.Router();

const bookController = require("../controller/books");

// 라우터를 컨트롤러로 위임
router.post('/', bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;