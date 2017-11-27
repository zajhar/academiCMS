/**
 * Created by Mario on 09.01.2017.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('static', {
        employeeId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING
    }, {
        tableName: 'Statics', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};