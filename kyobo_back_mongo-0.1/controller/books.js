const Book = require("../models/book");

// mock으로 할 수 있음 
exports.createBook = (req, res, next) => {
    Book.create(req.body);
    res.status(201).send();
};