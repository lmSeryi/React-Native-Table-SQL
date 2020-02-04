const Sequelize = require('sequelize')

const sequelize = new Sequelize('node', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

const Model = Sequelize.Model

class User extends Model {}

User.init({
    _id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Tasks:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Description:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    
},{
    sequelize,
    modelName: 'Tasks',
    timestamps: false
})

User.sync()

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully')
    })
    .catch(err => {
        console.error('Unable to connecto to the database: ', err)
    })

module.exports = {
    sequelize,
    User
}
    