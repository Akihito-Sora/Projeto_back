var express = require('express');
var router = express.Router();

const {sucess, fail} = require("../helpers/message")
const ProfessorDAO = require("../model/professor")

router.get("/", (req, res) => {
    ProfessorDAO.list().then((Professores) => {
        res.json(sucess(Professores, "list"))
    })
})

router.get("/:id", (req, res) => {
    ProfessorDAO.getById(req.params.id).then(Professor => {
        res.json(sucess(Professor))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Não foi possível localizar o Professor"))
    })
})

router.post("/", (req, res) => {
    const {nome, disciplina} = req.body
    
    ProfessorDAO.save(nome, disciplina).then(Professor => {
        res.json(sucess(Professor))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar o novo Professor"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {nome,disciplina} = req.body

    let obj = {}
    if (nome) obj.nome = nome
    if (disciplina) obj.disciplina = disciplina

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    ProfessorDAO.update(id, obj).then(Professor => {
        if (Professor)
            res.json(sucess(Professor))
        else
            res.status(500).json(fail("Professor não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar o Professor"))
    })
})

router.delete("/:id", (req, res) => {
    ProfessorDAO.delete(req.params.id).then(Professor => {
        if (Professor)
            res.json(sucess(Professor))
        else
            res.status(500).json(fail("Professor não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o Professor"))
    })
})

module.exports = router;
