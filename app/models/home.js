/**
 * Created by Mario on 10.12.2016.
 */
/***************Sequelize configuration********************/
var Sequelize = require('sequelize');
var sequelize = new Sequelize('m11620_academicms', 'm11620_acad', 'ZAQ!2wsx', {
    host: "mysql9.mydevil.net",
    dialect: "mysql" // or 'sqlite', 'postgres', 'mariadb'
//    port:    3306, // or 5432 (for postgres)
});

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });
//define the schema for our user model
var models = [
    'admin',
    'employee',
    'department',
    'institute',
    'counter',
    'ticket',
    'news',
    'subject',
    'studies',
    'static',
    'file'
];

models.forEach(function (model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports['sequelize'] = sequelize;

