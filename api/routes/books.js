const express = require('express');
const jwt = require('express-jwt');
const _ = require('lodash');

const router = express.Router();

const { SECRET: secret } = require('../utils/constants');

const books = [
  { id: 1, name: "Such a Fun Age", author: "Kiley Reid" },
  { id: 2, name: "George Washington's Teeth", author: "Kiley Reid" },
  {
    id: 3,
    name: "One True Loves",
    author: "Taylor Jenkins Reid",
  },
  { id: 4, name: "Daisy Jones and The Six", author: "Taylor Jenkins Reid" },
  {
    id: 5,
    name: "Let's Learn ES6",
    author: "Ryan Christiani",
  },
  {
    id: 6,
    name: "I am Malala",
    author: "Malala Yousafzai",
  },
  {
    id: 7,
    name: "Maybe in Another Life",
    author: "Taylor Jenkins Reid",
  },
];

router.route('/:id')
  .get((req, res, next) => {
    const { params } = req;
    const { id } = params;
    const book = books.filter((b) => b.id === Number(id)).pop();

    if (!book) {
      return res.status(404).send({ data: [] });
    }

    res.json({ data: [ book ] });
  })
  .post(jwt({ secret }), (req, res, next) => {
    const { params, body } = req;
    const { id } = params;
    const { name, author } = body;
    const book = books.filter((b) => b.id === Number(id)).pop();

    if (!book) {
      return res.status(404).send({ data: [] });
    }

    book.name = name || book.name;
    book.author = author || book.author;

    res.json({ data: [ book ] });
  });

router.route('/')
  .get((req, res, next) => {
    res.json({ data: books });
  })
  .post(jwt({ secret }), (req, res, next) => {
    const { body } = req;
    const { name, author } = body;

    const id = Math.max(...books.map((b) => b.id)) + 1;

    const book = {
      id,
      name,
      author,
    };

    books.push(book);
    res.json({ data: [{ id }] });
  });

exports.router = router;
