const express = require('express');
const crypto = require('crypto');

const loginRouter = express.Router();

// requisito 03
const token = () => crypto.randomBytes(8).toString('hex');
loginRouter.post('/', (req, res) => {
    const newToken = token();
    res.status(200).json({ token: newToken });
});

module.exports = loginRouter;