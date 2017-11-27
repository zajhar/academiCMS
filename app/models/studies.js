/**
 * Created by Mario on 07.01.2017.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('studies', {
        name: DataTypes.STRING
    }, {
        tableName: 'Studies', // this will define the table's name
        timestamps: false           // this will deactivate the timestamp columns
    });
};