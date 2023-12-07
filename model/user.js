const {DataTypes, Op, Model} = require("sequelize")
class User extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            usuario: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {sequelize})
    }
}

module.exports ={
    save: async function(nome, senha) { 

        const user = await User.create({
            usuario: nome,
            senha: senha
        })
        
        return user
    },
    findByName: async function(nome){
        return await User.findOne({where: {nome: {
            [Op.like]: '%' + nome + '%'
        } }})
    },
    model: User
}