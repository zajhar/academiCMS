/**
 * Created by Mario on 28.12.2016.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('department', {
        name: DataTypes.STRING,
        shortcut: DataTypes.STRING
    }, {
        tableName: 'Departments', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};