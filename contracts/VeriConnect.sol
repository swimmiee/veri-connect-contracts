// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VeriConnect is ERC1155, Ownable {
    uint256 public tokenCounter = 1;

    // 명함의 소유자를 추적
    mapping(uint256 => address) public cardOwners;

    // 각 사용자가 소유한 명함 목록
    mapping(address => uint256[]) public userCards;
    // 명함을 가진 유저
    mapping(uint256 => address[]) public cardIdToOwners;

    // 각 소유자(owner)에게 할당된 cardId 목록 추적
    mapping(address => uint256) public ownerToCardId;

    constructor(
        address initialOwner,
        string memory uri
    ) ERC1155(uri) Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function registerCard() external {
        if (ownerToCardId[msg.sender] > 0) return; // 이미 등록된 사용자인 경우

        uint256 newCardId = tokenCounter;
        cardOwners[newCardId] = msg.sender; // 명함의 소유자 설정
        ownerToCardId[msg.sender] = newCardId; // 소유자에게 cardId 할당
        tokenCounter += 1;
    }

    // 2. Give a card to a friend
    function mintCardToFriend(address recipient) external {
        uint256 cardId = ownerToCardId[msg.sender];
        require(cardId > 0, "You do not own any cards to mint.");

        _mint(recipient, cardId, 1, "");
        userCards[recipient].push(cardId);
        cardIdToOwners[cardId].push(recipient);
    }

    // 3. View all 
    function getMyOwnedCardIds(
        address user
    ) external view returns (uint256[] memory) {
        return userCards[user];
    }

    // 4. View all cards that I minted to friends
    function getMyCards(address user) external view returns (address[] memory) {
        uint cardId = ownerToCardId[user];
        return cardIdToOwners[cardId];
    }
}
