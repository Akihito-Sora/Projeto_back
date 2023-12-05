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
                { model: Aluno, as: 'alunos' }
            ]
        })
        return sala
    },

    save: async function (numero, prof, aluno) {
        const sala = await Sala.create({
            max_aluno: numero
        })
        const professor = await Professor.getByName(prof);
        if (professor) {
            await sala.addProf(professor);
        }
        const student = await Student.getByName(aluno);
        if (student) {
            await sala.addAluno(student);
        }
        return sala
    },

    addAlunoToSala: async function (id, aluno) {
        const sala = this.getById(id);
        if (!sala) {
            return false
        }
        const student = await Student.getByName(aluno);
        if (student) {
            await sala.addAluno(student);
        }
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
    }
}