const jwt = require('jsonwebtoken');

module.exports = {
    validar: (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(403).send({ error: 'Token não informado' });
        }
        const token = authHeader.split(' ');

        if (!token.length == 2) {
            return res.status(403).send({ error: 'Erro na formatação do Token' });
        }
        token = token[1]

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).send({ error: 'Token invalido' });
            req.userId = decoded.id;
            console.log(req.userId);
            return next();
        });
    }
}