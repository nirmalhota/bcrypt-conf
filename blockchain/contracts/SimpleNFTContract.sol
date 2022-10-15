pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract SimpleCollectible is ERC721URIStorage {
  uint256 public tokenCounter;
  uint256 public price;
  uint256 public max;
  constructor (string memory name, string memory symbol, uint256 _price, uint256 _max) public ERC721 (name, symbol){
    tokenCounter = 0;
    price = _price;
    max = _max;
  }
  function createCollectible(string memory tokenURI) payable external returns (uint256) {
    uint256 newItemId = tokenCounter;
    require(msg.value >= price, "not enough eth");
    require(tokenCounter < max, "maximum quantity reached");
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    tokenCounter = tokenCounter + 1;
    return newItemId;
  }
}