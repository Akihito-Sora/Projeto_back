const Prof = require('../model/professor');
const Sala = require('../model/sala');
const {Op} = require('sequelize');

module.exports = {
    list: async function(lim, pag) {
        const prof = await Prof.findAll({
            include:[{ model: Sala }]
        })
        let lista= [];
        let cont = (pag-1)*lim;
        for ( i = 0; i < lim && cont < aluno.length; i++) {
            lista[i] = prof[cont]
            cont++;
        }

        return lista
    },
    
    save: async function(nome, disciplina) { 

        const prof = await Prof.create({
            nome: nome,
            disciplina: disciplina
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