var express = require('express');
var router = express.Router();

const {sucess, fail} = require("../helpers/message")
const SalaDAO = require("../controller/salaController")

router.get("/:lim/:pag", (req, res) => {
    const {lim, pag} = req.params
    if (lim == 5 || lim == 10 || lim == 30) {
        SalaDAO.list(lim,pag).then((Salas) => {
            res.json(sucess(Salas, "list"))
        })
    }else {
        res.json(fail("Limite deve ser 5 ou 10 ou 30"));
    }
})

router.get("/:id", (req, res) => {
    SalaDAO.getById(req.params.id).then(Sala => {
        res.json(sucess(Sala))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possível localizar a Sala"))
    })
})

router.post("/", (req, res) => {
    const {max, prof} = req.body
    
    SalaDAO.save(max, prof).then(Sala => {
        res.json(sucess(Sala))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar a nova Sala"))
    })
})

router.post("/:id/add_aluno", (req, res) => {
    const id = req.params.id;
    const aluno = req.body.aluno;

    const sala = SalaDAO.getById(id)
    if (sala){
        const num = SalaDAO.getNumAlunos(sala)
        if (num < sala.max_aluno) { 
            SalaDAO.addAlunoToSala(sala, aluno).then(Sala => {
                res.json(sucess(Sala))
            }).catch(err => {
                console.log(err)
                res.status(500).json(fail("Falha ao relacionar aluno"))
            })
        }else {
            res.status(500).json(fail("Quantidade maxima de alunos na sala Atingida"));
        }
    }else {
        res.status(500).json(fail("Sala não encontrada"));
    }
})

router.delete('/:id/remove_aluno', (req, res) => {
    const id = req.params.id;
    const aluno = req.body.aluno;

    SalaDAO.removeAluno(id, aluno).then(Sala => {
        res.json(sucess(Sala))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao relacionar aluno"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {max, prof } = req.body

    let obj = {}
    if (max) obj.max = max
    if (prof) obj.prof = prof

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    SalaDAO.update(id, obj).then(Sala => {
        if (Sala)
            res.json(sucess(Sala))
        else
            res.status(500).json(fail("Sala não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar a Sala"))
    })
})

router.delete("/:id", (req, res) => {
    SalaDAO.delete(req.params.id).then(Sala => {
        if (Sala)
            res.json(sucess(Sala))
        else
            res.status(500).json(fail("Sala não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir a Sala"))
    })
})

module.exports = router;
