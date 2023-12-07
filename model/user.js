const {DataTypes, Op, Model} = require("sequelize")
class User extends Model{
    static init(sequelize){
        super.init({
            codigo: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            usuario: DataTypes.STRING,
            senha: DataTypes.STRING,
            nivel_acesso: DataTypes.BOOLEAN
        }, {sequelize})
    }
}

module.exports ={
    save: async function(nome, senha) { 
        const user = await User.create({
            usuario: nome,
            senha: senha,
            nivel_acesso: "false"
        })
        return user
    },

    acesso: async function(id){
        let user = await User.findByPk(id)
        if (!user) {
            return false;
        }
        user.nivel_acesso = 1;
        await user.save()
        return user;
    },

    delete: async function(id) {
        return await User.destroy({where: { codigo: id }})
    }, 

    findByName: async function(nome){
        return await User.findOne({where: {usuario: {
            [Op.like]: '%' + nome + '%'
        } }})
    },

    model: User
}