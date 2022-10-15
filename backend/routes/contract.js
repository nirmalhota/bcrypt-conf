const router = require("express").Router();
const multer = require("multer");
const uuid = require("uuid");
const Contract = require("../models/contract.model");

const Results = require("../services/results.service");
const blockchain = require("../services/web3.service");
const pinata = require("../services/pinata.service");
const results = new Results("route","contract.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        req.filename = file.originalname;
        cb(null, file.originalname)
    }
});
   
const upload = multer({ storage });

router.post("/createContract", upload.single("file"), async (req,res) => {
    try {
        // console.log(req.query);
        const image = await pinata.createImageUri(req.filename);
        const mints = [];
        for(let i = 1; i < parseInt(req.query.qty) + 1; i++) {
            mints.push(i);
        }
        const uid = uuid.v4();
        await blockchain.createContractAlchemy(uid, req.query.name, req.query.symbol, req.query.price, req.query.qty);
        await Contract.create({
            uuid: uid,
            name : req.query.name,
            price: req.query.price,
            description: req.query.description,
            quantity: req.query.qty,
            image, mints
        });
        results.data({id: uid}).send(req,res);
    }catch(error) {
        console.log(error);
        results.exception(error).send(req,res);
    }
});

router.get("/mint/:contractId", async (req, res) => {
    try {
        console.log(req.params);
        const contract = await Contract.findOne({uuid: req.params.contractId});
        const mintIndex = parseInt(Math.random()*contract.mints.length);
        const nftMeta = {
            name : `${contract.name} #${contract.mints[mintIndex]}`,
            image : contract.image,
            description : contract.description,
            attributes: []
        };
        const uri = await pinata.createUri(nftMeta);
        const address = await blockchain.getAddress(req.params.contractId);
        console.log(contract.mints);
        contract.mints.splice(mintIndex, 1);
        console.log(mintIndex,contract.mints);
        contract.markModified("mints");
        contract.save();
        results.data({uri, address, price: contract.price}).send(req,res);
    }catch(error) {
        results.exception(error).send(req,res);
    }
});

router.get("/address/:contractId", async(req,res) => {
    try {
        const address = await blockchain.getAddress(req.params.contractId);
        results.data({address}).send(req,res);
    }catch(error) {
        results.exception(error).send(req,res);
    }
});



module.exports = router;