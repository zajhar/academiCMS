/**
 * Created by Mario on 07.01.2017.
 */
var express = require('express');
var app = express();

var functions = require('../../../functions');
var config = require('../../../config');

app.set('models', require('../../../app/models/home.js'));
var Subject = app.get('models').subject;
var Studies = app.get('models').studies;
var File = app.get('models').file;

var directory = new functions.directory();

module.exports = {
    getSubjectsList: function (req, res, employeeId) {
        Subject.findAndCountAll({
            where: ['employeeId = ?', employeeId]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getStudiesList: function (req, res) {
        Studies.findAndCountAll({
            where: ['id >= ?', 0]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    uploadFiles: function (req, res) {
        var fileArray = [];
        var files = req.files[Object.keys(req.files)];
        files.forEach(function (file) {
            var filename = file.path.split('\\');
            filename = filename[filename.length - 1];
            var dir = '/public/' + filename;
            fileArray.push({name: file.name, path: dir});
        });
        res.json({success: true, files: fileArray});
    },

    saveFiles: function (req, res, employeeId, id, fileArray) {
        Subject.find({
            where: {
                $and: {
                    id: id,
                    employeeId: employeeId
                }
            }
        }).then(function (subject) {
            if (!subject) res.json({success: false, message: "Nie znaleziono przedmiotu"});
            else {
                var flag = true;
                fileArray.forEach(function (fileObject) {
                    var newDir = subject.path + '/' + fileObject.name;
                    if (!functions.moveFile(fileObject.path, '/public/' + newDir)) flag = false;
                    fileObject.path = newDir;
                    fileObject.employeeId = subject.employeeId;
                    fileObject.subjectId = subject.id;

                    var file = File.build(fileObject);
                    file.save();
                });
                if (flag) res.json({success: true, message: "Pliki zostały przesłane"});
                else res.json({success: false, message: "Wystąpił błąd podczas przesyłu plików"});
            }
        });
    },

    deleteFile: function (req, res, employeeId, subjectId, id) {
        File.find({
            where: {
                subjectId: subjectId,
                employeeId: employeeId,
                id: id
            }
        }).then(function (file) {
            if (!file) res.json({success: false, message: "Nie znaleziono pliku"});
            else {
                functions.deleteFile(file.path);
                file.destroy().then(function () {
                    res.json({success: true, message: "Plik usunięty"});
                });
            }
        });
    },

    updateFile: function (req, res, name, employeeId, id)
    {
        File.find({
            where: {
                employeeId: employeeId,
                id: id
            }
        }).then(function (file) {
            if (!file) res.json({success: false, message: "Nie znaleziono pliku"});
            else {
                if(name) {
                    var ext = file.name.split('.')[1];
                    var fullname = name+"."+ext;
                    var newPath = file.path.replace(file.name,fullname);
                    functions.renameFile(file.path, newPath);
                    file.path = newPath;
                    file.name = fullname;
                }
                file.save().then(function () {
                    res.json({success: true, message: "Plik zmodyfikowany"});
                });
            }
        });
    },

    fileList: function (req, res, employeeId, subjectId) {
        File.findAndCountAll({
            where: {
                subjectId: subjectId,
                employeeId: employeeId
            }
        }).then(function (files) {
            res.json({success: true, results: files.count, list: files.rows});
        });
    },

    addSubject: function (req, res, subjectObject) {
        if (functions.checkAllAtributes(subjectObject)) {
            var subject = Subject.build(subjectObject);
            subject.save().then(function (subject) {
                directory.makeDirectory(subject.path);
                res.json({success: true, message: "Dodano przedmiot"});
            });
        } else res.json({success: false, message: "Nie wypełniono wszystkich pól"});
    },

    updateSubject: function (req, res, subjectObject) {
        Subject.find({
            where: {
                $and: {
                    id: subjectObject.id,
                    employeeId: subjectObject.employeeId
                }
            }
        }).then(function (subject) {
            if (!subjectObject.name) {
                subjectObject.path = subjectObject.path.replace('undefined', subject.name);
                subjectObject.path = subjectObject.path.replace(/ /g, '_');
            }
            if (!subjectObject.studiesId) {
                var studies;
                (subject.studiesId == 1) ? studies = "s" : studies = "ns";
                subjectObject.path += "_" + studies;
            }
            directory.renameDirectory(subject.path, subjectObject.path);

            changeFilesPath(subject.id, subject.path, subjectObject.path);

            Object.keys(subjectObject).forEach(function (element) {
                subject[element] = subjectObject[element];
            });

            subject.save({fields: Object.keys(subjectObject)}).then(function () {
                res.json({success: true, message: "Przedmiot zmodyfikowany"});
            });
        });
    },

    deleteSubject: function (req, res, employeeId, id) {
        Subject.find({
            where: {
                $and: {
                    id: id,
                    employeeId: employeeId
                }
            }
        }).then(function (subject) {
            if (subject) {
                directory.removeDirectory(subject.path);
                deleteFiles(subject.id);
                subject.destroy().then(function () {
                    res.json({success: true, message: "Usunięto przedmiot."});
                });
            }
            else res.json({success: false, message: "Przedmiot nie istnieje."});
        });
    }
};

function changeFilesPath(subjectId, oldPath, newPath) {
    File.findAll({
        where: {
            subjectId: subjectId
        }
    }).then(function (files) {
        if (files) {
            files.forEach(function (file) {
                file.path = file.path.replace(oldPath, newPath);
                file.save();
            });
        }
        else res.json({success: false, message: "Przedmiot nie istnieje."});
    });
};

function deleteFiles(subjectId) {
    File.findAll({
        where: {
            subjectId: subjectId
        }
    }).then(function (files) {
        if (files) {
            files.forEach(function (file) {
                file.destroy();
            });
        }
        else res.json({success: false, message: "Przedmiot nie istnieje."});
    });
};