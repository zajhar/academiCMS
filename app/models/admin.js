/**
 * Created by Mario on 27.12.2016.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('admin', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        last_logged: DataTypes.STRING
    }, {
        tableName: 'Admins', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};