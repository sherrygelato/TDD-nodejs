const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.get('/', (req, res) => {
    Book.findAll()
    .then(books => {
        if(!books.length) return res.status(404).send({ err: 'Todo not found' });
        res.send(books);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
    .then(books => {
        // if(!books.length) return res.status(404).send({ err: 'Todo not found' });
        res.send(books);
    })
    .catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
    Book.create(req.body)
    .then(book => {
        res.send(book);
    })
    .catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
    console.log(req.params.id, req.body);
    Book.updateById(req.params.id, req.body)
    .then(book => {
        res.send(book);
    })
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', (req, res) => {
    Book.deleteById(req.params.id)
    .then(book => {
        res.send(book);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;