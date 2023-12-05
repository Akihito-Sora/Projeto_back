const {DataTypes, Model} = require("sequelize")

class Prof extends Model{
    static init(sequelize){
        super.init({
            codigo: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: DataTypes.STRING,
            disciplina: DataTypes.STRING
        },{sequelize})
    }
    static associations(models) {
        this.hasMany(models.Sala, {foreignKey: 'professor_id', as:'sala'})
    }
}
module.exports = Prof