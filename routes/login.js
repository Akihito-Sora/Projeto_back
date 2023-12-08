var express = require('express');
var router = express.Router();
var User = require('../model/user')
const jwt = require('jsonwebtoken');
const auth = require('../helpers/auth');

const {sucess, fail} = require("../helpers/message")

router.post('/novologin', async function (req, res) {
  let {usuario, senha} = req.body
  await User.save(usuario, senha).then(User => {
    res.json(sucess(User))
  }).catch(err => {
    console.log(err)
    res.status(500).json(fail("Falha ao salvar o novo Usuario"))
  })
})

router.post('/',async (req, res) =>{
  let { usuario, senha } = req.body;
  const user = await User.findByName(usuario);
  if (!user) {
    return res.redirect('/novologin');
  }
  if (!senha == user.senha) {
    return res.status(400).send({ status: 0, message: 'Usuario ou senha incorreta', user: {} });
  }
  user.senha = undefined

  const token = jwt.sign({usuario: user}, process.env.TOKEN_SECRET, {expiresIn: '30 min'})

  return res.status(200).send({
    status: 1,
    message: "Usuário logado com sucesso!",
    user, token
  });
})

router.put("/:id",auth.validaAcesso, auth.permissao, (req, res) => {
  let id = req.params.id
  User.acesso(id).then(user => {
    if (user)
        res.json(sucess(user))
    else
        res.status(500).json(fail("usuario não encontrado"))
}).catch(err => {
    console.log(err)
    res.status(500).json(fail("Falha ao excluir o usuario"))
})
})

router.delete("/:id",auth.validaAcesso, auth.permissao, async (req, res) => {
  User.delete(req.params.id).then(user => {
    if (user)
        res.json(sucess(user))
    else
        res.status(500).json(fail("usuario não encontrado"))
}).catch(err => {
    console.log(err)
    res.status(500).json(fail("Falha ao altear acesso"))
})
})

module.exports = router;
