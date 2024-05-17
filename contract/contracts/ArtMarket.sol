// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract ArtMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    uint256 listingPrice = 0.0015 ether;
    address payable owner;

    // Creating MarketItem & Getting Id Of Market  Item

    mapping(uint256 => marketItem) private idMarketItem;
    struct marketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // id of marketitem created

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // checking if only owner

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only Owner Of Market Can Change The Listing Price!"
        );
        _;
    }

    constructor() ERC721("NFT MetaVerse Token", "MYNFT") {
        owner == payable(msg.sender);
    }

    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    //getting permanent price to create a token

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // creating market token

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    // creating art

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price Must Be Greater Than 0");
        require(
            msg.value == listingPrice,
            "Price Must Be Greater Than Listing Price"
        );

        idMarketItem[tokenId] = marketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // resell art

    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only Item Owner Can Perform This Operation"
        );

        require(
            msg.value == listingPrice,
            "Price Must Be Equal To Listing Price"
        );

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // sellable items

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;

        require(msg.value == price, "Please Submit Asked Price!");

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), payable(msg.sender), tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItem() public view returns (marketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unSoldItemsCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        marketItem[] memory items = new marketItem[](unSoldItemsCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                marketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
            return items;
        }
    }

    // fetching own art

    function fetchMyNFT() public view returns (marketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        marketItem[] memory items = new marketItem[](itemCount);

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                marketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // fetching items which has been listed

    function fetchItemListed() public view returns (marketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemsCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemsCount += 1;
            }
        }

        marketItem[] memory items = new marketItem[](itemsCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;

                marketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }
}
