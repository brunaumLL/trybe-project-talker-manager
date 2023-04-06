const express = require('express');
const fs = require('fs');

const talkerRouter = express.Router();

talkerRouter.get('/', (_req, res) => {
    const file = 'talker.json';
    const data = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(data);
    res.json(parsed);
});

module.exports = talkerRouter;