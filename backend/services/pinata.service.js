const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
const fs = require("fs");

const createUri = async (data) => {
    const results = await pinata.pinJSONToIPFS(data);
    console.log(results);
    return `https://gateway.pinata.cloud/ipfs/${results.IpfsHash}`;
}

const createImageUri = async (filename) => {
    const readableStreamForFile = fs.createReadStream(`./uploads/${filename}`);
    let results = await pinata.pinFileToIPFS(readableStreamForFile);
    const imageUri = `https://gateway.pinata.cloud/ipfs/${results.IpfsHash}`;
    return imageUri;
}

// createUri("digitalart-1661877230686-737.jpg", {name: "testNFTs", description: "testing the nfts", symbol:"TSNFT"});
module.exports = {createUri, createImageUri};