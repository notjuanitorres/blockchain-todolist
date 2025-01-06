const TodoList = artifacts.require("TodoList");

contract("TodoList", (accounts) => {

    before(async () => {
        this.todoList = await TodoList.deployed(); // Deployed contract
    })

    it("deploys successfully", async () => { // Test if the contract is deployed
        const address = await this.todoList.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    })

    it ('task list' , async () => {
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        assert.equal(task.id.toNumber(), taskCount.toNumber());
        assert.equal(task.content, 'Prepararme para la SYPERCONF')
        assert.equal(task.completed, false);
    })

})