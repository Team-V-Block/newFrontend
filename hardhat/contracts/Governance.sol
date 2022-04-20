// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Governance {
    //Hash roles using keccak256 hashing
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE");
    bytes32 public constant TEACHER_ROLE = keccak256("TEACHER_ROLE");
    bytes32 public constant CHAIRMAN_ROLE = keccak256("CHAIRMAN_ROLE");

    address[] accounts;
    mapping(bytes32 => address[]) private roles;

    constructor() {
        //Grant admin role to the contract deployer
        // _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // _grantRole(CHAIRMAN_ROLE, msg.sender);
    }

    function grantRole(bytes32 role, address account) public returns (bool) {
        roles[role].push(account);
        return true;
    }

    function getRoleMembers(bytes32 role)
        public
        view
        returns (address[] memory)
    {
        return roles[role];
    }

    function getRoleChairman() public view returns (address) {
        // address chairman = _roles(CHAIRMAN_ROLE).members[1];
        //  return _roles[CHAIRMAN_ROLE].members[msg.sender];
    }
}
