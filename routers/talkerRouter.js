const express = require('express');
const fs = require('fs');

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

module.exports = talkerRouter;