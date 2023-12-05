const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")

const professor = require("../controller/professorController")
const aluno = require("../controller/alunoController")
const sala = require("../controller/salaController")

router.get('/', async (req, res) => {
    await sequelize.sync({force: true})

    let professores = [];
    professores.push( await professor.save("teste", "matematica"))

    let alunos =[];
    alunos.push( await aluno.save("toshio") )

    let salas =[];
    salas.push(await sala.save(10, "teste", "toshio"));

    res.json({status:true, professores: professores, alunos: alunos, salas:salas});
})

module.exports = router