const Sala = require('../model/sala');
const Aluno = require('../model/aluno');
const {Op} = require('sequelize');

module.exports = {
    list: async function(lim, pag) {
        const aluno = await Aluno.findAll({
            include:[{ 
                model: Sala, as: 'Sala', 
                through:{ attributes:[]}
            }]
        })
        let lista= [];
        let cont = (pag-1)*lim;
        for ( i = 0; i < lim && cont < aluno.length; i++) {
            lista[i] = aluno[cont]
            cont++;
        }

        return lista
    },
    
    save: async function(nome) {
        const aluno = await Aluno.create({
            nome: nome
        })
        
        return aluno
    },

    update: async function(id, obj) {
        let aluno = await Aluno.findByPk(id)
        if (!aluno) {
            return false
        }
        Object.keys(obj).forEach(key => aluno[key] = obj[key])
        await aluno.save()
        return aluno
    },

    delete: async function(id) {
        return await Aluno.destroy({where: { codigo: id }})
    },

    getById: async function(id) {
        return await Aluno.findByPk(id)
    },

    getByName: async function(nome) {
        return await Aluno.findOne({where: {nome: {
            [Op.like]: '%' + nome + '%'
        } }})
    }
}