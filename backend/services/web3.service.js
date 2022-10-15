require("dotenv").config();
const fs = require("fs/promises");
const ethers = require("ethers");

const getGenerator = async () => {
    const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli",process.env.ALCHEMY_API_KEY);
    const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, alchemyProvider);
    const conf = JSON.parse(await fs.readFile("./config/contract.json","utf-8"));
    const contract = new ethers.Contract(conf.generator.address, conf.generator.abi, signer);
    return contract;
}
// console.log(web3.eth.accounts.privateKeyToAccount(process.env.WALLET_PRIVATE_KEY));

const createContractAlchemy = async(uuid, name, symbol, price, qty) => {
    const contract = await getGenerator();
    const address = await contract.createNftContract(uuid, name, symbol,price * 1000000000, parseInt(qty));
    // console.log(address);
    return address;
}

const getAddress = async (id) => {
    const contract = await getGenerator();
    const results = await contract.getAddress(id);
    return results;
}

module.exports = { createContractAlchemy, getAddress};