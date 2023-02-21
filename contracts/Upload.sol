// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// pragma solidity >=0.7.0 < 0.9.0;
contract Upload {
    struct Access{
        address user;
        bool access;
    }

    mapping(address=>string[]) dataContainer;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>Access[]) accessList;
    mapping(address=>mapping(address=>bool)) previousData;

    function addData(address _user, string memory url) external {
        dataContainer[_user].push(url);
    }

    function allowAccess(address _user) external {
        ownership[msg.sender][_user] = true;
        if(previousData[msg.sender][_user]){
            for(uint i =0; i<accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function disallowAccess(address _user) public {
        ownership[msg.sender][_user] = false;
        for(uint i=0; i<accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == _user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function displayData(address _user) external view returns(string[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access" );
        return dataContainer[_user];
    } 

    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }

}