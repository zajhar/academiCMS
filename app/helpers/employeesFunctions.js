/**
 * Created by Mario on 03.01.2017.
 */
var express = require('express');
var app = express();

var bcrypt = require('bcrypt-nodejs');
var config = require('../../config');
var functions = require('../../functions');

app.set('models', require('../models/home.js'));
var Employee = app.get('models').employee;
var Department = app.get('models').department;

var directory = new functions.directory();

module.exports = {
    searchOneWithPagination: function (req, res, phrase, page, limit) {
        Employee.belongsTo(Department);

        Employee.findAndCountAll({
            where: {
                $or: [
                    {
                        firstName: {
                            $like: '%' + phrase[0] + '%'
                        }
                    },
                    {
                        lastName: {
                            $like: '%' + phrase[0] + '%'
                        }
                    }
                ]

            },
            attributes: {exclude: ['password', 'departmentId']},
            offset: limit * (page - 1),
            limit: limit,
            include: [Department]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });

        // sequelize.query("SELECT COUNT(*) AS `count` FROM Employees " +
        //         "INNER JOIN Departments ON Employees.departmentID = Departments.ID " +
        //         "WHERE " + search, {type: sequelize.QueryTypes.SELECT}).then(function (count) {
        //
        //             sequelize.query("SELECT Employees.id, academicTitle, firstName, lastName, function, email, Departments.name, Departments.shortcut FROM Employees " +
        //                 "INNER JOIN Departments ON Employees.departmentID = Departments.ID " +
        //                 "WHERE " + search + " LIMIT " + limit + " OFFSET " + limit * (page - 1), {type: sequelize.QueryTypes.SELECT})
        //             .then(function (rows) {
        //                 res.json({success: true, results: count[0].count, list: rows});
        //             });
        //     });
    },

    searchOneWithoutPagination: function (req, res, phrase) {
        Employee.belongsTo(Department);

        Employee.findAndCountAll({
            where: {
                $or: [
                    {
                        firstName: {
                            $like: '%' + phrase[0] + '%'
                        }
                    },
                    {
                        lastName: {
                            $like: '%' + phrase[0] + '%'
                        }
                    }
                ]

            },
            attributes: {exclude: ['password', 'departmentId']},
            include: [Department]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
        // sequelize.query("SELECT COUNT(*) AS `count` FROM Employees " +
        //     "INNER JOIN Departments ON Employees.departmentID = Departments.ID " +
        //     "WHERE " + search, {type: sequelize.QueryTypes.SELECT}).then(function (count) {
        //
        //     sequelize.query("SELECT Employees.id, academicTitle, firstName, lastName, function, email, Departments.name, Departments.shortcut FROM Employees " +
        //         "INNER JOIN Departments ON Employees.departmentID = Departments.ID " +
        //         "WHERE " + search, {type: sequelize.QueryTypes.SELECT})
        //         .then(function (rows) {
        //             res.json({success: true, results: count[0].count, list: rows});
        //         });
        // });
    },

    searchTwoWithoutPagination: function (req, res, phrase) {
        Employee.belongsTo(Department);

        Employee.findAndCountAll({
            where: {
                $or: [
                    {
                        $and: {
                            firstName: {$like: '%' + phrase[0] + '%'},
                            lastName: {$like: '%' + phrase[1] + '%'},
                        }
                    },
                    {
                        $and: {
                            firstName: {$like: '%' + phrase[1] + '%'},
                            lastName: {$like: '%' + phrase[0] + '%'},
                        }
                    }
                ]
            },
            attributes: {exclude: ['password', 'departmentId']},
            include: [Department]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    searchTwoWithPagination: function (req, res, phrase, page, limit) {
        Employee.belongsTo(Department);

        Employee.findAndCountAll({
            where: {
                $or: [
                    {
                        $and: {
                            firstName: {$like: '%' + phrase[0] + '%'},
                            lastName: {$like: '%' + phrase[1] + '%'},
                        }
                    },
                    {
                        $and: {
                            firstName: {$like: '%' + phrase[1] + '%'},
                            lastName: {$like: '%' + phrase[0] + '%'},
                        }
                    }
                ]
            },
            attributes: {exclude: ['password', 'departmentId']},
            offset: limit * (page - 1),
            limit: limit,
            include: [Department]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getEmployeesListWithPagination: function (req, res, page, limit) {
        Employee.belongsTo(Department);

        Employee.findAndCountAll({
            where: ['employee.id >= ?', 0],
            attributes: {exclude: ['password', 'departmentId']},
            include: [Department],
            offset: limit * (page - 1),
            limit: limit
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getEmployeesListWithoutPagination: function (req, res) {
        Employee.belongsTo(Department);

        Employee.findAndCountAll({
            where: ['employee.id >= ?', 0],
            attributes: {exclude: ['password', 'departmentId']},
            include: [Department]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    updateEmployee: function (req, res, employeeObject) {
        Employee.find({where: ["id = ?", employeeObject.id]}).then(function (employee) {
            if (!employee) res.json({success: false, message: "Nie znaleziono pracownika"});
            else {
                var newExt;
                var oldExt;

                if (employee.avatarPath) oldExt = employee.avatarPath.split('.')[1];
                if (employeeObject.avatarPath) {
                    newExt = employeeObject.avatarPath.split('.')[1];
                    employeeObject.avatarPath = functions.saveAvatar(employee.avatarPath, employeeObject.avatarPath, employee.id, oldExt == newExt);
                }


                Object.keys(employeeObject).forEach(function (element) {
                    employee[element] = employeeObject[element];
                });

                if (employeeObject.password) hashAndUpdateEmployee(req, res, employee, employeeObject);
                else updateEmployee(req, res, employee, employeeObject);
            }
        });
    },

    hasDuplicates: function (employeeObject) {
        return Employee.find({where: ["subdomain = ?", employeeObject.subdomain]}).then(function (employee) {
            if (employee) return true;
            else return false;
        });
    },

    addEmployee: function (req, res, employeeObject) {
        if (checkAllAtributesWithPassword(employeeObject)) {
            bcrypt.hash(employeeObject.password, null, null, function (err, hash) {
                employeeObject.password = hash;
                var employee = Employee.build(employeeObject);
                res.json({success: true, message: "Dodano pracownika."});
                employee.save().then(function (json) {
                    directory.makeDirectory(json.id);
                    var newPath = functions.saveAvatar(undefined, json.avatarPath, json.id, false);
                    json.avatarPath = newPath;
                    json.save();
                });
            });
        }
        else res.json({
            success: false,
            message: "Nie wypełniono wszystkich pól lub hasło za krótkie (min " + config.passwordLengthRequired + " znaków)"
        });
    },

    deleteEmployee: function (req, res, id) {
        Employee.find({where: ["id = ?", id]}).then(function (employee) {
            if (employee) {
                employee.destroy().then(function () {
                    res.json({success: true, message: "Pracownik usunięty."});
                    directory.removeDirectory(employee.id);
                    functions.deleteAvatar(employee.avatarPath);
                });
            }
            else res.json({success: false, message: "Pracownik nie istnieje."});
        });
    },

    getAvatarPath: function (req, res, id) {
        Employee.find({where: ["id = ?", id]}).then(function (employee) {
            if (!employee) res.json({success: false, message: "Nie znaleziono pracownika"});
            else res.json({success: true, avatarPath: employee.avatarPath});
        });
    }
};

function checkAllAtributesWithPassword(object) {
    var flag = true;

    Object.keys(object).forEach(function (element) {
        if (element != 'id' && element != 'function' && element != 'avatarPath' && element != 'tutorship' && element != 'mainPageInfo' && typeof object[element] == 'undefined') flag = false;
    });
    if (!isPasswordLengthValid(object.password)) flag = false;
    return flag;
};

function hashAndUpdateEmployee(req, res, employee, employeeObject) {
    if (isPasswordLengthValid(employeeObject.password)) {
        bcrypt.hash(employeeObject.password, null, null, function (err, hash) {
            employee.password = hash;
            employee.save({fields: Object.keys(employeeObject)}).then(function () {
                res.json({success: true, message: "Pracownik zmodyfikowany"});
            });
        });
    } else res.json({
        success: false,
        message: "Hasło musi się składać z minimum " + config.passwordLengthRequired + " znaków"
    });
};

function updateEmployee(req, res, employee, employeeObject) {
    employee.save({fields: Object.keys(employeeObject)}).then(function () {
        res.json({success: true, message: "Pracownik zmodyfikowany"});
    });
};

function isPasswordLengthValid(password) {
    if (password && password.length >= config.passwordLengthRequired) return true;
    else return false;
};