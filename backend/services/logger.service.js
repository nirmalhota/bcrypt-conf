const fs = require('fs');
const winston = require('winston');
const { combine, timestamp, json } = winston.format;


class Logger {
    constructor(sourceFile, sourceFileType) {
        this.sourceFile = sourceFile;
        this.sourceFileType = sourceFileType;
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(timestamp(), json()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'logs/main.log',
                })
            ],
        });
    }
    log = async (level,message,details) => {
        if(!fs.existsSync('logs')) {
            fs.mkdirSync('logs');
        }
        const data = {source: this.sourceFile, sourceType: this.sourceFileType,
                         message : message ? message: "undefined", ...details};
        this.logger.log(level, data);
    }
}

module.exports = Logger;