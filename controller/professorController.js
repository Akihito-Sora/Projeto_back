const Prof = require('../model/professor');
const {Op} = require('sequelize');

module.exports = {
    list: async function() {
        const prof = await Prof.findAll()
        return prof
    },
    
    save: async function(nome, diciplina) { 

        const prof = await Prof.create({
            nome: nome,
            diciplina: diciplina,
            //sala_id: sala_id
        })
        
        return prof
    },

    update: async function(id, obj) {
        let professor = await Prof.findByPk(id)
        if (!professor) {
            return false
        }
        Object.keys(obj).forEach(key => professor[key] = obj[key])
        await professor.save()
        return professor
    },

    delete: async function(id) {
        return await Prof.destroy({where: { codigo: id }})
    },

    getById: async function(id) {
        return await Prof.findByPk(id)
    },

    getByName: async function(nome) {
        return await Prof.findOne({where: {nome: {
            [Op.like]: '%' + nome + '%'
        } }})
    }
}