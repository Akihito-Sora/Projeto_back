const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")

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
module.exports = {
    list: async function() {
        const sala = await salaModel.findAll()
        return sala
    },
    
    save: async function(numero) {
        const sala = await salaModel.create({
            max_aluno: numero
        })
        
        return sala
    },

    update: async function(id, numero) {
        return await salaModel.update({max_aluno: numero}, {
            where: { codigo: id }
        })
    },

    delete: async function(id) {
        //Precisa fazer algo para os livros que este autor possui
        return await salaModel.destroy({where: { codigo: id }})
    },

    getById: async function(id) {
        return await salaModel.findByPk(id)
    },

    Model: salaModel
}