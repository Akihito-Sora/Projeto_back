var express = require('express');
var router = express.Router();
const Auth = require('../helpers/auth');

const {sucess, fail} = require("../helpers/message")
const AlunoDAO = require("../controller/alunoController")

router.get("/:lim/:pag", (req, res) => {
    const {lim, pag} = req.params
    if (lim == 5 || lim == 10 || lim == 30) {
        AlunoDAO.list(lim, pag).then((alunos) => {
            res.json(sucess(alunos, "list"))
        })
    }else {
        res.json(fail("Limite deve ser 5 ou 10 ou 30"));
    }
})

router.get("/:id", (req, res) => {
    AlunoDAO.getById(req.params.id).then(aluno => {
        res.json(sucess(aluno))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possível localizar o aluno"))
    })
})

router.post("/", Auth.validaAcesso,(req, res) => {
    const {nome} = req.body
    
    AlunoDAO.save(nome).then(aluno => {
        res.json(sucess(aluno))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar o novo Aluno"))
    })
})

router.put("/:id", Auth.validaAcesso, (req, res) => {
    const {id} = req.params
    const {nome} = req.body

    let obj = {}
    if (nome) obj.nome = nome

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    AlunoDAO.update(id, obj).then(aluno => {
        if (aluno)
            res.json(sucess(aluno))
        else
            res.status(500).json(fail("Aluno não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar o Aluno"))
    })
})

router.delete("/:id",Auth.validaAcesso, (req, res) => {
    AlunoDAO.delete(req.params.id).then(aluno => {
        if (aluno)
            res.json(sucess(aluno))
        else
            res.status(500).json(fail("Aluno não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o Aluno"))
    })
})

module.exports = router;
