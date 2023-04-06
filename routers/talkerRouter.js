const express = require('express');
const fs = require('fs');
const tokenMiddleware = require('../middlewares/tolkenMiddleware');
const nameMiddleware = require('../middlewares/nameMiddleware');
const ageMiddleware = require('../middlewares/ageMiddleware');
const talkMiddleware = require('../middlewares/talkMiddleware');
const watchedAtMiddleware = require('../middlewares/watchedAtMiddleware');
const rateMiddleware = require('../middlewares/rateMiddleware');
const tolkenMiddleware = require('../middlewares/tolkenMiddleware');

const talkerRouter = express.Router();
const file = 'talker.json';

// requisito 08
talkerRouter.get('/search', tolkenMiddleware, (req, res) => {
    const { q } = req.query;
    const data = fs.readFileSync(file, 'utf8');
    const talkers = JSON.parse(data);
    const filterTalkers = talkers.filter((t) => t.name.includes(q));
    res.status(200).json(filterTalkers);
});

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

// requisito 06
talkerRouter.put('/:id',
    tokenMiddleware,
    nameMiddleware,
    ageMiddleware,
    talkMiddleware,
    watchedAtMiddleware,
    rateMiddleware,
    (req, res) => {
        const { name, age, talk: { watchedAt, rate } } = req.body;
        const { id } = req.params;
        const data = fs.readFileSync(file, 'utf8');
        const talkers = JSON.parse(data);
        const talkerId = talkers.findIndex((t) => t.id === Number(id));
        talkers[talkerId] = { ...talkers[talkerId], name, age, talk: { watchedAt, rate } };
        fs.writeFileSync(file, JSON.stringify(talkers));
        res.status(200).json(talkers[talkerId]);
});

// requisito 07
talkerRouter.delete('/:id', tolkenMiddleware, (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(file, 'utf8');
    const talkers = JSON.parse(data);
    const newTalkers = talkers.filter((t) => t.id !== Number(id));
    fs.writeFileSync(file, JSON.stringify(newTalkers));
    res.status(204).end();
});

module.exports = talkerRouter;