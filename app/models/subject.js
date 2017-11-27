/**
 * Created by Mario on 07.01.2017.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('subjects', {
        employeeId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        studiesId: DataTypes.INTEGER
    }, {
        tableName: 'Subjects', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};