const ToDoList = artifacts.require("TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(ToDoList);
};
