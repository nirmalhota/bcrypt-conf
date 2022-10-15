pragma solidity ^0.8.1;

import "./SimpleNFTContract.sol";

contract ContractGenerator {
    uint256 public generatedCounter;
    mapping(string => address) idAddressMapping;

    event contractGenerated (address contractAddress);

    function createNftContract(string memory id, string memory name, string memory symbol, uint256 price, uint256 maxQty)
        public returns (address) {
        address contractAddress = address(new SimpleCollectible(name, symbol, price * 1000000000, maxQty));
        generatedCounter++;
        // address contractAddressAddress = contractAddress.address;
        emit contractGenerated(contractAddress);
        idAddressMapping[id] = contractAddress;
        return contractAddress;
    }

    function getAddress(string memory id) public view returns(address) {
        return idAddressMapping[id];
    }
}