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