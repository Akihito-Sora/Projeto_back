const Sala = require('../model/sala');
//const Aluno = require('../model/aluno');
const Professor = require('../model/professor');


module.exports = {
    list: async function () {
        const sala = await Sala.findAll()
        return sala
    },

    save: async function (numero, prof) {
        if (prof instanceof Professor) {
            prof = prof.codigo
        } else if (typeof prof == 'string') {
            obj = await Professor.getByName(prof)
            if (!obj) {
                return null
            }
            prof = obj.codigo
        }
/*
        if (student instanceof Aluno) {
            student = student.codigo
        } else if (typeof student == 'string') {
            obj = await Aluno.getByName(student)
            if (!obj) {
                return null
            }
            student = obj.codigo
        }
*/
        const sala = await Sala.create({
            max_aluno: numero,
            Professor_id: prof
        })

        return sala
    },

    update: async function (id, obj) {
        let turma = await Sala.findByPk(id)
        if (!turma) {
            return false
        }
        Object.keys(obj).forEach(key => turma[key] = obj[key])
        await turma.save()
        return turma
    },

    delete: async function (id) {
        return await Sala.destroy({ where: { codigo: id } })
    },

    getById: async function (id) {
        return await Sala.findByPk(id)
    }
}