const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")

const professorModel = require("../model/professor")
const alunoModel = require("../model/aluno")
const salaModel = require("../model/sala")

router.get('/', async (req, res) => {
    await sequelize.sync({force: true})

    let professores = [];
    professores.push( await professorModel.save("teste", "matematica"))

    let alunos =[];
    alunos.push( await alunoModel.save("toshio") )

    let salas =[];
    salas.push(await salaModel.save(10, "teste"));

    res.json({status:true, professores: professores, alunos: alunos, salas:salas});
})

module.exports = router