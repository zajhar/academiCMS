/**
 * Created by Mario on 30.12.2016.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('institute', {
        name: DataTypes.STRING,
        departmentId: DataTypes.INTEGER
    }, {
        tableName: 'Institutes', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};