pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0; // State variable which stores the number of tasks
    
    struct Task {
        uint id;
        string content; // Content of the task
        bool completed; // Boolean to check if the task is completed
    }
    
    mapping(uint => Task) public tasks; // Mapping to store the tasks (kinda like a database)
    
    // Event to notify the frontend that a task has been created
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );
    
    event TaskCompleted(
        uint id,
        bool completed
    );
    
    constructor() public {
        createTask("Prepararme para la SYPERCONF"); // Create a default task when the contract is deployed
    }
    
    function createTask(string memory _content) public {
        taskCount++; // Increment the task count
        tasks[taskCount] = Task(taskCount, _content, false); // Create a new task and store it in the mapping
        emit TaskCreated(taskCount, _content, false); // Emit an event to notify the frontend
    }
    
    function toggleCompleted(uint _id) public {
        Task memory task = tasks[_id]; // Fetch the task from the mapping
        task.completed = !task.completed; // Toggle the completed status
        tasks[_id] = task; // Update the task in the mapping
        emit TaskCompleted(_id, task.completed); // Emit an event to notify the frontend
    }
}