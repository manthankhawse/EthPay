// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferEther {

    address public admin;

    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        uint flag;
        uint timestamp;
    }

    Transaction[] private transactions;

    event PaymentSent(address indexed from, address indexed to, uint amount);

    constructor() {
        admin = msg.sender; 
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "You are not the admin.");
        _;
    }

    function sendEther(address payable _to, uint _amount, uint _flag) public payable {

        if (_flag == 1) {
            require(msg.value == _amount, "Incorrect amount of Ether sent.");

            transactions.push(Transaction(msg.sender, _to, _amount, _flag, block.timestamp));

            payable(msg.sender).transfer(msg.value);
            return;
        }

        require(msg.sender.balance >= _amount, "Insufficient balance.");
        require(msg.value == _amount, "Incorrect amount of Ether sent.");

        transactions.push(Transaction(msg.sender, _to, _amount, _flag, block.timestamp));

        _to.transfer(_amount);

        emit PaymentSent(msg.sender, _to, _amount);
    }

    function getTransactions() public view onlyAdmin returns (Transaction[] memory) {
        return transactions;
    }

    function getWalletTransactions(address user) public view returns (Transaction[] memory) {
    uint count = 0;

    // Step 1: Count matching transactions based on address.
    for (uint i = 0; i < transactions.length; i++) {
        if (transactions[i].sender == user || transactions[i].receiver == user) {
            count++;
        }
    }

    // Step 2: Create an array with the correct size.
    Transaction[] memory userTransactions = new Transaction[](count);
    uint index = 0;

    // Step 3: Populate the array with matching transactions.
    for (uint i = 0; i < transactions.length; i++) {
        if (transactions[i].sender == user || transactions[i].receiver == user) {
            userTransactions[index] = transactions[i];
            index++;
        }
    }

    return userTransactions;
}

}
