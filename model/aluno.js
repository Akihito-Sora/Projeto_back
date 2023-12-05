const {DataTypes, Model} = require("sequelize")
class Aluno extends Model{
    static init(sequelize){
        super.init({
            codigo: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: DataTypes.STRING
        }, {sequelize})
    }
    static associate(models){
        this.belongsToMany(models.Sala, { foreignKey: 'aluno_id', through: 'Alunos_sala', as: 'Sala' })
    }
}

module.exports = Aluno