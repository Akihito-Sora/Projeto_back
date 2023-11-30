const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")

const alunoModel = sequelize.define('Aluno', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: DataTypes.STRING
    }
)
module.exports = {
    list: async function() {
        const aluno = await alunoModel.findAll()
        return aluno
    },
    
    save: async function(nome) {
        const aluno = await alunoModel.create({
            nome: nome
        })
        
        return aluno
    },

    update: async function(id, nome) {
        return await alunoModel.update({nome: nome}, {
            where: { codigo: id }
        })
    },

    delete: async function(id) {
        //Precisa fazer algo para os livros que este autor possui
        return await alunoModel.destroy({where: { codigo: id }})
    },

    getById: async function(id) {
        return await alunoModel.findByPk(id)
    },

    getByName: async function(nome) {
        return await alunoModel.findOne({where: {nome: {
            [Op.like]: '%' + nome + '%'
        } }})
    },

    Model: alunoModel
}