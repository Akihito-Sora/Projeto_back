const Sala = require('../model/sala');
const Prof = require('../model/professor');
const Aluno = require('../model/aluno');
const Professor = require('./professorController');
const Student = require('./alunoController');


module.exports = {
    list: async function () {
        const sala = await Sala.findAll({
            include:[
                { model: Prof, as: 'Prof' },
                { model: Aluno, as: 'alunos', through:{attributes:[]} },
            ]
        })
        let lista= [];
        let cont = (pag-1)*lim;
        for ( i = 0; i < lim && cont < aluno.length; i++) {
            lista[i] = sala[cont]
            cont++;
        }

        return lista
    },

    save: async function (numero, prof) {
        const sala = await Sala.create({
            max_aluno: numero
        })

        const professor = await Professor.getByName(prof);
        if (!professor) {
            return false;
        }
        await sala.addProf(professor);

        return sala;
    },

    addAlunoToSala: async function (sala, aluno) {
        const student = await Student.getByName(aluno);
        if (!student) {
            return false;
        }
        const turma = await this.getById(sala)

        await turma.addAluno(student);
        return turma;
    },

    removeAluno: async function (id, aluno) {
        const sala = await this.getById(id);
        if (!sala) {
            return false;
        }
        const student = await Student.getByName(aluno);
        if (!student) {
            return false;
        }
        await sala.removeAluno(student);
        return sala;
    },

    update: async function (id, obj) {
        let sala = await Sala.findByPk(id)
        if (!sala) {
            return false
        }
        Object.keys(obj).forEach(key => sala[key] = obj[key])
        await sala.save()
        return sala
    },

    delete: async function (id) {
        return await Sala.destroy({ where: { codigo: id } })
    },

    getById: async function (id) {
        return await Sala.findByPk(id)
    },
    getNumAlunos: async function(sala){
        let num = await sala.countAlunos();
        return num;
    }
}