// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "hardhat/console.sol";

contract MetaBoxMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemCounter;
    Counters.Counter private _itemSoldCounter;

    address payable public marketowner;
    uint256 public listingFee = 0 ether;

    enum State {
        Created,
        Release,
        Inactive
    }

    struct MarketItem {
        uint id;
        address nftContract;
        uint256 tokenId;
        string metadata;
        string chain;
        address payable seller;
        address payable buyer;
        uint256 price;
        State state;
    }

    mapping(uint256 => MarketItem) private marketItems;

    event MarketItemCreated(
        uint indexed id,
        address indexed nftContract,
        uint256 indexed tokenId,
        string metadata,
        string chain,
        address seller,
        address buyer,
        uint256 price,
        State state
    );

    event MarketItemSold(
        uint indexed id,
        address indexed nftContract,
        uint256 indexed tokenId,
        string metadata,
        string chain,
        address seller,
        address buyer,
        uint256 price,
        State state
    );

    constructor() {
        marketowner = payable(msg.sender);
    }

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    /**
     * @dev create a MarketItem for NFT sale on the marketplace.
     *
     * List an NFT.
     */
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory metadata,
        string memory chain
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingFee, "Fee must be equal to listing fee");

        // require(
        //     IERC721(nftContract).getApproved(tokenId) == address(this),
        //     "NFT must be approved to market"
        // );
        // IERC721(nftContract).approve(address(this), tokenId);
        // change to approve mechanism from the original direct transfer to market
        // IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        _itemCounter.increment();
        uint256 id = _itemCounter.current();

        marketItems[id] = MarketItem(
            id,
            nftContract,
            tokenId,
            metadata,
            chain,
            payable(msg.sender),
            payable(address(0)),
            price,
            State.Created
        );

        emit MarketItemCreated(
            id,
            nftContract,
            tokenId,
            metadata,
            chain,
            msg.sender,
            address(0),
            price,
            State.Created
        );
    }

    /**
     * @dev delete a MarketItem from the marketplace.
     *
     * de-List an NFT.
     *
     * todo ERC721.approve can't work properly!! comment out
     */
    function deleteMarketItem(uint256 itemId) public nonReentrant {
        require(itemId <= _itemCounter.current(), "id must <= item count");
        require(
            marketItems[itemId].state == State.Created,
            "item must be on market"
        );
        MarketItem storage item = marketItems[itemId];

        require(
            IERC721(item.nftContract).ownerOf(item.tokenId) == msg.sender,
            "must be the owner"
        );
        require(
            IERC721(item.nftContract).getApproved(item.tokenId) ==
                address(this),
            "NFT must be approved to market"
        );

        item.state = State.Inactive;

        emit MarketItemSold(
            itemId,
            item.nftContract,
            item.tokenId,
            item.metadata,
            item.chain,
            item.seller,
            address(0),
            0,
            State.Inactive
        );
    }

    /**
     * @dev (buyer) buy a MarketItem from the marketplace.
     * Transfers ownership of the item, as well as funds
     * NFT:         seller    -> buyer
     * value:       buyer     -> seller
     * listingFee:  contract  -> marketowner
     */

    function createSale(
        address nftContract,
        uint256 id
    ) public payable nonReentrant {
        MarketItem storage item = marketItems[id]; //should use storge!!!!
        uint price = item.price;
        uint tokenId = item.tokenId;

        require(msg.value == price, "Please submit the asking price");
        require(
            IERC721(nftContract).getApproved(tokenId) == address(this),
            "NFT must be approved to market"
        );

        IERC721(nftContract).transferFrom(item.seller, msg.sender, tokenId);

        payable(marketowner).transfer(listingFee);
        item.seller.transfer(msg.value);

        item.buyer = payable(msg.sender);
        item.state = State.Release;
        _itemSoldCounter.increment();

        emit MarketItemSold(
            id,
            nftContract,
            tokenId,
            item.metadata,
            item.chain,
            item.seller,
            msg.sender,
            price,
            State.Release
        );
    }

    function createMarketSale(
        address nftContract,
        uint256 id
    ) public nonReentrant {
        MarketItem storage item = marketItems[id]; //should use storge!!!!
        uint price = item.price;
        uint tokenId = item.tokenId;

        require(
            IERC721(nftContract).getApproved(tokenId) == address(this),
            "NFT must be approved to market"
        );

        IERC721(nftContract).transferFrom(item.seller, msg.sender, tokenId);

        // payable(marketowner).transfer(listingFee);

        item.buyer = payable(msg.sender);
        item.state = State.Release;
        _itemSoldCounter.increment();

        emit MarketItemSold(
            id,
            nftContract,
            tokenId,
            item.metadata,
            item.chain,
            item.seller,
            msg.sender,
            price,
            State.Release
        );
    }

    /**
     * @dev Returns all unsold market items
     * condition:
     *  1) state == Created
     *  2) buyer = 0x0
     *  3) still have approve
     */
    function fetchActiveItems() public view returns (MarketItem[] memory) {
        return fetchHepler(FetchOperator.ActiveItems);
    }

    function getNftDetails(
        uint256 _id
    ) external view returns (MarketItem memory) {
        return marketItems[_id];
    }

    /**
     * @dev Returns only market items a user has purchased
     * todo pagination
     */
    function fetchMyPurchasedItems() public view returns (MarketItem[] memory) {
        return fetchHepler(FetchOperator.MyPurchasedItems);
    }

    /**
     * @dev Returns only market items a user has created
     * todo pagination
     */
    function fetchMyCreatedItems() public view returns (MarketItem[] memory) {
        return fetchHepler(FetchOperator.MyCreatedItems);
    }

    enum FetchOperator {
        ActiveItems,
        MyPurchasedItems,
        MyCreatedItems
    }

    /**
     * @dev fetch helper
     * todo pagination
     */
    function fetchHepler(
        FetchOperator _op
    ) private view returns (MarketItem[] memory) {
        uint total = _itemCounter.current();

        uint itemCount = 0;
        for (uint i = 1; i <= total; i++) {
            if (isCondition(marketItems[i], _op)) {
                itemCount++;
            }
        }

        uint index = 0;
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 1; i <= total; i++) {
            if (isCondition(marketItems[i], _op)) {
                items[index] = marketItems[i];
                index++;
            }
        }
        return items;
    }

    /**
     * @dev helper to build condition
     *
     * todo should reduce duplicate contract call here
     * (IERC721(item.nftContract).getApproved(item.tokenId) called in two loop
     */
    function isCondition(
        MarketItem memory item,
        FetchOperator _op
    ) private view returns (bool) {
        if (_op == FetchOperator.MyCreatedItems) {
            return
                (item.seller == msg.sender && item.state != State.Inactive)
                    ? true
                    : false;
        } else if (_op == FetchOperator.MyPurchasedItems) {
            return (item.buyer == msg.sender) ? true : false;
        } else if (_op == FetchOperator.ActiveItems) {
            return
                (item.buyer == address(0) &&
                    item.state == State.Created &&
                    (IERC721(item.nftContract).getApproved(item.tokenId) ==
                        address(this)))
                    ? true
                    : false;
        } else {
            return false;
        }
    }
}
