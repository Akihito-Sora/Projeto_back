var express = require('express');
var router = express.Router();
var User = require('../model/user')


router.post('/', async (req, res) =>{
  let { usuario, senha } = req.body;
  const user = await User.findByName({ where: { usuario } });

  if (!user) {
    return res.status(400).send({ status: 0, message: 'E-mail ou senha incorreto!', user: {} });
  }
  if (senha == user.senha) {
    return res.status(400).send({ status: 0, message: 'E-mail ou senha incorreto!', user: {} });
  }
  user.senha = undefined

  const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, {expiresIn: '10 min'})

  return res.status(200).send({
    status: 1,
    message: "Usuário logado com sucesso!",
    user, token
  });
})

module.exports = router;
