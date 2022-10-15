const Logger = require("./logger.service");
class Results {
    constructor(filetype, filename) {
        this.filetype = filetype;
        this.filename = filename;
        this.logger = new Logger(filename,filetype);
    }
    endpoint = (endpt) => {
        this.endpt = endpt;
        return this;
    }
    status = (stat) => {
        this.stat = stat;
        return this;
    }
    message = (msg) => {
        this.msg = msg
        return this;
    }
    exception = (error) => {
        this.error = error;
        return this;
    }
    data = (dat) => {
        this.dat = dat;
        return this;
    }
    send = (req,res) => {
        const status = this.error ? 500 : this.stat ? this.stat : 200;
        const results = {
            status,
            message : this.msg ? this.msg : null,
            data: this.dat ? this.dat: null,
            error : this.error ? this.error: null
        }
        this.logger.log(this.error ? "error" : "info", this.msg, {results, reqBody : req.body, query: req.query});
        res.status(results.status).json(results);
    }
}

module.exports = Results;