/**
 * Created by Mario on 19.12.2016.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('employee', {
        academicTitle: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        function: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        address: DataTypes.STRING,
        building: DataTypes.STRING,
        room: DataTypes.STRING,
        tutorship: DataTypes.STRING,
        mainPageInfo: DataTypes.STRING,
        subdomain: DataTypes.STRING,
        password: DataTypes.STRING,
        last_logged: DataTypes.STRING,
        departmentId: DataTypes.INTEGER,
        avatarPath: DataTypes.STRING
    }, {
        tableName: 'Employees', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};