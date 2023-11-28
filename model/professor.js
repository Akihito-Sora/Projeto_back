const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")

const ProfModel = sequelize.define('Professor', 
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
        const prof = await ProfModel.findAll()
        return prof
    },
    
    save: async function(nome) {
        const Prof = await ProfModel.create({
            nome: nome
        })
        
        return Prof
    },

    update: async function(id, nome) {
        return await ProfModel.update({nome: nome}, {
            where: { codigo: id }
        })
    },

    delete: async function(id) {
        //Precisa fazer algo para os livros que este autor possui
        return await ProfModel.destroy({where: { codigo: id }})
    },

    getById: async function(id) {
        return await ProfModel.findByPk(id)
    },

    getByName: async function(nome) {
        return await ProfModel.findOne({where: {nome: {
            [Op.like]: '%' + nome + '%'
        } }})
    },

    Model: ProfModel
}