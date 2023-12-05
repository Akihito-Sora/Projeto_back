const { DataTypes, Model} = require("sequelize")

const professor = require("./professor")
const aluno = require("./aluno")

class Sala extends Model {
    static init(sequelize){
        super.init({
            codigo: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            max_aluno: DataTypes.INTEGER
        }, {sequelize})
    }
    static associate(models){
        this.belongsTo(models.Prof, { foreingKey: 'Professor_id', as: 'Professor' })
        this.belongsToMany(models.Aluno, {foreignKey: 'sala_id', through: 'Alunos_sala', as: 'alunos'})
    }
}

module.exports = Sala