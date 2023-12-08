const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")

const User = require("../model/user")

const professor = require("../controller/professorController")
const aluno = require("../controller/alunoController")
const sala = require("../controller/salaController")

router.post('/', async (req, res) => {
    await sequelize.sync({force: true})
    
    let professores = ["Adriano", "Back-end","Antonio", "Redes de Computadores","Matheus","SO","Camila","IHC","Cleverson","Empreendedorismo"];
    let listap = []
    for (let i = 0; i < professores.length; i += 2) {
        listap.push( await professor.save(professores[i], professores[i+1]))
    }
    
    let lista = ["Toshio", "Hector", "Maria", "Eduarda", "Gabriela"]
    let alunos =[];
    for (let i = 0; i <lista.length; i++) {
        alunos.push( await aluno.save(lista[i]) )
    }

    let salas =[];
    for (let i=0; i < professores.length/2; i++){
        salas.push(await sala.save( (3+i)*2, professores[i*2]));  
    }

    for (let i=0; i< 5; i++){
        await sala.addAlunoToSala(i+1,lista[i])
    } 

    let user = await User.save("Rivolli", "Password")
    user = await User.acesso(user.codigo)


    res.json({status:true, professores: listap, alunos: alunos, salas:salas, user:user});
})

module.exports = router