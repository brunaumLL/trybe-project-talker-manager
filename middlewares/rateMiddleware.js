// requisito 05
const rateMiddleware = (req, res, next) => {
    const { talk: { rate } } = req.body;

    if (!rate && rate !== 0) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (rate < 1 || rate > 5) {
        return res.status(400).json(
            { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
        );
    }
    
    next();
};

module.exports = rateMiddleware;