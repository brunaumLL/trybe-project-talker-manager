const express = require('express');
const loginMiddleware = require('../middlewares/loginMiddleware');
const token = require('../token');

const loginRouter = express.Router();

// requisito 03
loginRouter.post('/', loginMiddleware, (_req, res) => {
    const newToken = token();
    res.status(200).json({ token: newToken });
});

module.exports = loginRouter;