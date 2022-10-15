require("dotenv").config();
require("./services/database.service").connect();
const express = require("express");
const app = express();
const cors = require("cors");
const Results = require("./services/results.service");
const results = new Results("route", "app.js");

const contracts = require("./routes/contract");

app.use(cors());
app.use("/contracts", contracts);

app.use("/", (req,res) => {
    results.status(404).message("uri not found").send(req,res);
});

app.listen(process.env.API_PORT, () => {console.log("server started...")});

