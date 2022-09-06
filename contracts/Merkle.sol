// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "hardhat/console.sol";

contract Merkle {
    bytes32 public merkleRoot =
        0x4fb6362bf2bc343224d13d5ec5db0d3eaca634ccafdbf045d842d9884050be8c;
    mapping(address => bool) public whitelistClaimed;

    function whitelistMint(bytes32[] calldata _merkleProof) public {
        require(!whitelistClaimed[msg.sender], "Address has already claimed.");

        console.log("Parameter value: ");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid proof"
        );

        whitelistClaimed[msg.sender] = true;
    }
}
