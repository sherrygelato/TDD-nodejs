const Book = require("../models/book");

// mock으로 할 수 있음 
exports.createBook = (req, res) => {
    Book.create(req.body)
    .then(book => {
        res.status(200).send(book);
    })
    .catch(err => res.status(500).send(err));
}