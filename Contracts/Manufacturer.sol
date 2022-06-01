// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// 0x9f43BBcA63d6B7D22cd9FD93b0e450183C3Cb649
contract Manufacturer {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    address[] manufacturer = [
        0xdb13C31089Da26FCE9679C54162388EBC06eAA52,
        0x4F028B1a0A4C47E2B52a13FB43831AffC748EBf8
    ];

    event NewDrug(
        string name,
        uint256 netContent,
        string mfgLicenseNum,
        uint256 batchNum,
        uint256 mfdDate,
        uint256 expDate,
        uint256 price,
        address mfdBy,
        string ingredients
    );

    struct Drugdetails {
        string name;
        uint256 netContent;
        string mfgLicenseNum;
        uint256 batchNum;
        uint256 mfdDate;
        uint256 expDate;
        uint256 price;
        address mfdBy;
        string ingredients;
    }

    mapping(address => Drugdetails[]) MfgData;

    modifier onlyManufacturers() {
        require(
            msg.sender == manufacturer[0] || msg.sender == manufacturer[1],
            "You are not a manufacturer"
        );
        _;
    }

    function setDrugDetails(
        string memory _name,
        uint256 _netContent,
        string memory _mfgLicenseNum,
        uint256 _batchNum,
        uint256 _price,
        string memory _ingredients
    ) external onlyManufacturers {
        MfgData[msg.sender].push(
            Drugdetails({
                name: _name,
                netContent: _netContent,
                mfgLicenseNum: _mfgLicenseNum,
                batchNum: _batchNum,
                mfdDate: block.timestamp,
                expDate: block.timestamp + 2,
                price: _price,
                mfdBy: msg.sender,
                ingredients: _ingredients
            })
        );

        emit NewDrug(
            _name,
            _netContent,
            _mfgLicenseNum,
            _batchNum,
            block.timestamp,
            block.timestamp + 2,
            _price,
            msg.sender,
            _ingredients
        );
    }

    function getDrugDetails(address _mfgAdrs, uint256 _id)
        external
        view
        returns (
            string memory name,
            uint256 netContent,
            string memory mfgLicenseNum,
            uint256 batchNum,
            uint256 mfdDate,
            uint256 expDate,
            uint256 price,
            address mfdBy,
            string memory ingredients
        )
    {
        Drugdetails memory data = MfgData[_mfgAdrs][_id - 1];
        return (
            data.name,
            data.netContent,
            data.mfgLicenseNum,
            data.batchNum,
            data.mfdDate,
            data.expDate,
            data.price,
            data.mfdBy,
            data.ingredients
        );
    }
}
