const express = require('express');
const fs = require('fs');
const tokenMiddleware = require('../middlewares/tolkenMiddleware');
const nameMiddleware = require('../middlewares/nameMiddleware');
const ageMiddleware = require('../middlewares/ageMiddleware');
const talkMiddleware = require('../middlewares/talkMiddleware');
const watchedAtMiddleware = require('../middlewares/watchedAtMiddleware');
const rateMiddleware = require('../middlewares/rateMiddleware');

const talkerRouter = express.Router();
const file = 'talker.json';

// requisito 01
talkerRouter.get('/', (_req, res) => {
    const data = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(data);
    res.status(200).json(parsed);
});

// requisito 02
talkerRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(data);

    const talkerId = parsed.find((t) => t.id === Number(id));
    if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talkerId);
});

// requisito 05
talkerRouter.post('/',
    tokenMiddleware,
    nameMiddleware,
    ageMiddleware,
    talkMiddleware,
    watchedAtMiddleware,
    rateMiddleware,
    (req, res) => {
        const { name, age, talk: { watchedAt, rate } } = req.body;
        const data = fs.readFileSync(file, 'utf8');
        const talkers = JSON.parse(data);
        const id = talkers.length + 1;
        const newTalker = { id, name, age, talk: { watchedAt, rate } };
        talkers.push(newTalker);
        fs.writeFileSync(file, JSON.stringify(talkers));
        res.status(201).json(newTalker);
});
module.exports = talkerRouter;