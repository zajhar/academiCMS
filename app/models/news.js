/**
 * Created by Mario on 28.12.2016.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('news', {
        employeeId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.STRING
    }, {
        tableName: 'News', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};