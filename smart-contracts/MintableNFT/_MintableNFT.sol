// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintableNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter = 0;

    constructor() ERC721("MintableNFT", "MNFT") {}

    mapping(uint256 => string) private _tokenURIs;

    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function mintNFT(
        address recipient,
        string memory newTokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter = _tokenIdCounter + 1;

        _mint(recipient, _tokenIdCounter);
        _setTokenURI(_tokenIdCounter, newTokenURI);

        return _tokenIdCounter;
    }
}
