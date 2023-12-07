const jwt = require('jsonwebtoken');

module.exports = {
    validaAcesso: (req, res, next) => {
        let beartoken = req.headers['authorization'] || ""
        let token = beartoken.split(" ")
        if (token[0] == 'Bearer') {
            token = token[1]
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) res.status(403).json({mensagem: "Token invalido, acesso negado"})
            else {
                req.acesso = decoded.usuario.nivel_acesso
                next()
            }
        })
    }, 
    permissao:(req, res, next) => {
        if (req.acesso){
            next()
        }else{
            res.status(403).json({ mensagem: "Acesso negado. Você não tem permissão para acessar este recurso." });
        }
    }
}