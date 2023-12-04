const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/bd")
const professor = require("./professor")
const aluno = require("./aluno")

const salaModel = sequelize.define('sala',
    {
        codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        max_aluno: DataTypes.INTEGER

    }
)

salaModel.belongsTo(professor.Model, {
    foreign_key: 'Professor'
})
salaModel.belongsToMany(aluno.Model, {
    through: 'alunos_Sala', 
})


module.exports = {
    list: async function () {
        const sala = await salaModel.findAll()
        return sala
    },

    save: async function (numero, prof, student) {
        if (prof instanceof professor.Model) {
            prof = prof.codigo
        } else if (typeof prof == 'string') {
            obj = await professor.getByName(prof)
            if (!obj) {
                return null
            }
            prof = obj.codigo
        }

        if (student instanceof aluno.Model) {
            student = student.codigo
        } else if (typeof student == 'string') {
            obj = await aluno.getByName(student)
            if (!obj) {
                return null
            }
            student = obj.codigo
        }

        
        const sala = await salaModel.create({
            max_aluno: numero,
            ProfessorCodigo: prof
        })

        return sala
    },

    update: async function (id, numero) {
        return await salaModel.update({ max_aluno: numero }, {
            where: { codigo: id }
        })
    },

    delete: async function (id) {
        //Precisa fazer algo para os livros que este autor possui
        return await salaModel.destroy({ where: { codigo: id } })
    },

    getById: async function (id) {
        return await salaModel.findByPk(id)
    },

    Model: salaModel
}