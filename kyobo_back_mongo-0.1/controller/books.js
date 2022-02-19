const Book = require("../models/book");

// mock으로 할 수 있음 
exports.createBook = async (req, res, next) => {
    try{
        const createBook = await Book.create(req.body);
        // res.status(201).send();
        res.status(201).json(createBook);
    } catch (error) {
        // 프로젝트 index.js 예외처리 코드
        next(error)
    }
};

exports.getBooks = async (req, res, next) => {
    try{
        const allBooks = await Book.findAll();
        // res.status(201).send();
        res.status(200).json(allBooks);
    } catch (error) {
        // 프로젝트 index.js 예외처리 코드
        next(error)
    }
};

exports.getBookById = async (req, res, next) => {
    try{
        const book = await Book.findById(req.params.id);
        if (book) {
            // res.status(201).send();
            res.status(200).json(book);
        } else {
            res.status(400).json({
                err: "Book doesn't exist"
            })
        }
        
    } catch (error) {
        // 프로젝트 index.js 예외처리 코드
        next(error)
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const updatedBook = await Book.updateById(
            req.params.id,
            req.body
        )
        if (updatedBook) {
            res.status(200).json(updatedBook)
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error)
    }

};

exports.deleteBook = async (req, res, next) => {
    try {
        let deletedBook = await Book.deleteById(req.params.id)
        if (deletedBook) {
            res.status(200).json(deletedBook)
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error)
    }
};