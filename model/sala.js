const { DataTypes, Model} = require("sequelize")
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
        this.belongsTo(models.Prof)
        this.belongsToMany(models.Aluno, {foreignKey: 'sala_id', through: 'Alunos_sala', as: 'alunos'})
    }
    addProf(professor) {
        return this.setProf(professor);
    }
}

module.exports = Sala