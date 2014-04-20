var util = require("util");
var fs = require("fs");

function Prent() {
    // Default setting
    var defaultNameFileForLog = "log-" + new Date().getTime() + ".txt";
    // Object with setting. Will overwrite when init will called
    var config = {
        consoleOutput: true,
        fileOutput: {
            enable: false,
            type: "File",
            path: defaultNameFileForLog,
            frequency: 0

        }
    };
    var awaitingLogs = [];

    function write(args) {
        createConsoleString(args, function(formattedString) {
            if (config.consoleOutput) {
                util.puts(formattedString);
            }
            if (config.fileOutput) {
                if (config.fileOutput.enable) {
                    formattedString = util.format("[%s] [%s]: %s", args.level, args.datetime, args.message);
                    awaitingLogs.push(formattedString);
                    if (awaitingLogs.length = config.fileOutput.frequency) {
                        if (config.fileOutput.type == "Directory") {
                            writeDir({message: formattedString});
                        } else {
                            writeFile({message: formattedString});
                        }
                        awaitingLogs = [];
                    }
                }
            }
        });
    }

    function createConsoleString(args, callback) {
        var colors = {
            Trace:  ['\x1B[90m', '\x1B[39m'],   // Grey
            Debug:  ['\x1B[30m', '\x1B[39m'],   // Black
            Info:   ['\x1B[34m', '\x1B[39m'],   // Blue
            Warn:   ['\x1B[33m', '\x1B[39m'],   // Yellow
            Error:  ['\x1B[31m', '\x1B[39m']    // Red
        };
        var data = util.format("[%s%s%s] [%s]: %s".replace(/\[/g, "\x1B[1m[\x1B[22m").replace(/\]/g, "\x1B[1m]\x1B[22m"), colors[args.level][0], args.level, colors[args.level][1], args.datetime, args.message);
        callback(data);
    }

    function writeFile(args) {
        fs.appendFile(config.fileOutput.path, args.message, function (error) {
            if (error) {
                console.error(error);
            }
        });
    }

    function writeDir(args) {
        fs.exists(config.fileOutput.path, function (exists) {
            if (exists) {
                fs.appendFile(config.fileOutput.path + "/" + defaultNameFileForLog, args.message, function (error) {
                    if (error) {
                        console.error(error);
                    }
                })
            } else {
                fs.mkdir(config.fileOutput.path, function() {
                    writeDir(args);
                })
            }
        });
    }

    this.init = function (args) {
        config = args || config;
    };

    this.trace = function (message) {
        write({level: "Trace", message: message, datetime: new Date().toUTCString()});
    };

    this.debug = function (message) {
        write({level: "Debug", message: message, datetime: new Date().toUTCString()});
    };

    this.info = function (message) {
        write({level: "Info", message: message, datetime: new Date().toUTCString()});
    };

    this.warn = function (message) {
        write({level: "Warn", message: message, datetime: new Date().toUTCString()});
    };

    this.error = function (message) {
        write({level: "Error", message: message, datetime: new Date().toUTCString()});
    };
}

var prent = new Prent();
module.exports = prent;
prent.init({
    consoleOutput: true,
    fileOutput: {
        enable: false,
        type: "File",
        path: 0,
        frequency: 0

}});