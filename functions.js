var jwt = require('jsonwebtoken');
var path = require('path');
var recursive = require('recursive-readdir');
var fs = require('fs');

var cpuStat = require('cpu-stat');
var os = require('os');

var config = require('./config');

module.exports = {
    check: function (req, res, cookieName) {
        var token = req.cookies[cookieName];

        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) { // || !decoded.admin
                    if (err.name = 'TokenExpiredError') {
                        res.clearCookie(cookieName);
                        return res.redirect('/#/login?errorType=Unauthorized'); //401
                    }
                    else {
                        console.log(err);
                        return res.redirect('/#/login?errorType=Forbidden'); //403
                    }
                } else {
                    req.decoded = decoded;
                    res.render('admin.ejs');
                }
            });
        } else return res.redirect('/#/login?errorType=Forbidden'); //403
    },

    checkLogin: function (req, res, next, cookieName) {
        var token = req.cookies[cookieName];

        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    if (err.name = 'TokenExpiredError') {
                        res.clearCookie(cookieName);
                        return res.status(401).send('Unauthorized');
                    }
                    else {
                        console.log(err);
                        return res.status(403).send('Forbidden');
                    }
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else return res.status(403).send('Forbidden');
    },

    getDate: function () {
        var date = new Date();
        return date.toLocaleDateString();
    },

    getDateTime: function () {
        var date = new Date();
        return date.toLocaleString();
    },

    searchString: function (searchJson) {
        var search = [];
        for (var i = 0; i < searchJson.length; i++) {
            search.push("firstName LIKE '%" + searchJson[i] + "%'");
            search.push("lastName LIKE '%" + searchJson[i] + "%'");
            // search.push("name LIKE '%" + searchJson[i] + "%'");
            // search.push("shortcut LIKE '%" + searchJson[i] + "%'");
            //search += "imie LIKE '%" + searchJson[i] + "%' OR nazwisko LIKE '%" + searchJson[i] + "%' OR nazwa_wydzialu LIKE '%" + searchJson[i] + "%' OR skrot LIKE '%" + searchJson[i] + "%' OR ";
        }
        return search.join(" OR ");
    },

    joinArray: function (array) {
        var search = [];
        var tmp = [];
        search.push(array[0]);
        if (array.length > 1) {
            for (var i = 1; i < array.length; i++) {
                tmp.push(array[i]);
            }
            tmp.join(" ");
            search.push(tmp);
        }
        return search;
    },

    getDir: function (employeeID) {
        var directory = './public/';
        return path.join(__dirname, directory + employeeID + "/");
    },

    getFilesSize: function (dir) {
        recursive(dir, function (err, files) {
            // Files is an array of filename
            var size = 0;
            files.forEach(function (file) {
                size += getFilesizeInBytes(file);
            });
            console.log(size);
        });
    },

    getFilesCount: function (dir) {
        recursive(dir, function (err, files) {
            // Files is an array of filename
            console.log(files.length);
        });
    },

    // saveAvatar: function(avatarPath, employeeId) {
    //
    //     var ext = avatarPath.split('.');
    //     ext = ext[ext.length-1];
    //
    //     var newDestination = '/avatars/'+employeeId+"."+ext;
    //
    //     fs.rename(__dirname+avatarPath, __dirname+'/public'+newDestination, function (err) {
    //         if (err) throw err;
    //         console.log('file '+ newDestination +' uploaded!');
    //     });
    //
    //     return newDestination;
    // },

    saveAvatar: function (oldDir, newDir, employeeId, isExtEqual) {
        if (newDir) {
            var ext = newDir.split('.')[1];
            var employeeAvatarPath = "/avatars/" + employeeId + "." + ext;
            var dir = __dirname + '/public';

            fs.rename(__dirname + newDir, dir + employeeAvatarPath, function (err) {
                if (err) throw err;
                console.log('file ' + employeeAvatarPath + ' changed!');
            });

            if (!isExtEqual && oldDir) fs.unlink(dir + oldDir);

            return employeeAvatarPath;
        }

        return '';
    },

    deleteAvatar: function (dir) {
        if (dir) {
            var directory = __dirname + '/public';
            fs.unlink(directory + dir);
        }
    },

    saveTimetable: function (newDir, employeeId) {
        if (newDir) {
            var ext = newDir.split('.')[1];
            var employeeTimetablePath = '/' + employeeId + '/timetable.' + ext;
            var dir = __dirname + '/public';
            fs.rename(__dirname + newDir, dir + employeeTimetablePath, function (err) {
                if (err) return false;
                else return true;
            });
        }

        return true;
    },

    moveFile: function (oldDir, newDir) {
        if (newDir && oldDir) {
            fs.rename(__dirname + oldDir, __dirname + newDir, function (err) {
                if (err) return false;
                else return true;
            });
            return true;
        }
        else return false;
    },

    // fileList: function (dir, callback) {
    //     var dirpath = path.join(__dirname, dir);
    //     var fileArray = [];
    //     if (dir) {
    //         fs.readdir(dirpath, function (err, files) {
    //             files.forEach(function (file) {
    //                 fileArray.push(file);
    //             });
    //             return callback(fileArray);
    //         });
    //     }
    // },

    deleteFile: function(dir) {
        if(dir)  {
            var directory = __dirname + '/public';
            fs.unlink(directory + dir);
        }
    },

    renameFile: function(oldPath, newPath) {
        if(oldPath && newPath) {
            var directory = __dirname + '/public';
            //console.log(directory + oldPath, directory + newPath);
            fs.rename(directory + oldPath, directory + newPath, function (err) {
                if (err) return false;
                else return true;
            });
        }
    },

    checkAllAtributes: function (object) {
        var flag = true;

        Object.keys(object).forEach(function (element) {
            if (element != 'id' && typeof object[element] == 'undefined') flag = false;
        });
        return flag;
    },

    checkAllAtributesWithPassword: function (object) {
        var flag = true;

        Object.keys(object).forEach(function (element) {
            if (element != 'id' && typeof object[element] == 'undefined') flag = false;
        });
        if (!isPasswordLengthValid(object.password)) flag = false;
        return flag;
    },

    // usedDisk: function() {
    //     diskspace.check('C', function (err, total, free, status) {
    //         return parseInt((total-free) / 1024 / 1024 / 1024);
    //     });
    // },

    memory: function () {
        // diskspace.check('C', function (err, total, free, status) {
        //     return JSON.stringify({used: parseInt((total-free) / 1024 / 1024 / 1024), total: parseInt((total) / 1024 / 1024 / 1024)});
        // });
    },

    CPU: function () {
        cpuStat.usagePercent(function (err, percent, seconds) {
            usagePercent = parseInt(percent);
        });
    },

    usedRAM: function () {
        return parseInt(os.totalmem() / 1024 / 1024 - os.freemem() / 1024 / 1024);
    },

    totalRAM: function () {
        return parseInt(os.totalmem() / 1024 / 1024);
    },

    directory: function () {
        var directory = './public/';

        this.removeDirectory = function (pathName) {

            var dir = path.join(__dirname, directory + pathName);
            if (fs.existsSync(dir)) {
                deleteFolderRecursive(dir);
            }

        };

        this.renameDirectory = function (oldPath, newPath) {
            var oldDir = path.join(__dirname, directory + oldPath);
            var newDir = path.join(__dirname, directory + newPath);

            console.log(oldDir, newDir);
            if (fs.existsSync(oldDir)) {
                fs.rename(oldDir, newDir, function (err) {
                    if (err) console.log(err);
                });
            } else fs.mkdirSync(newDir);
        };

        this.makeDirectory = function (pathName) {

            var dir = path.join(__dirname, directory + pathName);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        };

        var deleteFolderRecursive = function (path) {
            if (fs.existsSync(path)) {
                fs.readdirSync(path).forEach(function (file, index) {
                    var curPath = path + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        };
    }

};

function isPasswordLengthValid(password) {
    if (password && password.length >= config.passwordLengthRequired) return true;
    else return false;
};

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
};