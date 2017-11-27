/**
 * Created by Mario on 28.12.2016.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ticket', {
        employeeId: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        description: DataTypes.STRING,
        date: DataTypes.STRING
    }, {
        tableName: 'Tickets', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};