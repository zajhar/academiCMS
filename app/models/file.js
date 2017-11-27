/**
 * Created by Mario on 10.01.2017.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('file', {
        employeeId: DataTypes.INTEGER,
        subjectId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        path: DataTypes.INTEGER
    }, {
        tableName: 'Files', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};