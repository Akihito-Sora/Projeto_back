const Sequelize = require("sequelize")
const sala = require('../model/sala');
const professor = require('../model/professor');
const aluno = require('../model/aluno');
const user = require('../model/user');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  
{host:  process.env.DB_HOST, port: process.env.DB_PORT, dialect: process.env.DB_DIALECT})

sequelize.authenticate()
    .then(() => console.log("Conectado no Mysql!"))
    .catch(error => console.log(error))


sala.init(sequelize);
professor.init(sequelize);
aluno.init(sequelize);
user.model.init(sequelize);


professor.associate(sequelize.models);
sala.associate(sequelize.models);
aluno.associate(sequelize.models);

module.exports = sequelize