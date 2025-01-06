App = {
  loading: false,
  contracts: {},
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },
  loadWeb3: async () => {
    try {
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Add MetaMask event listeners
          window.ethereum.on('accountsChanged', function (accounts) {
            App.account = accounts[0];
            App.render();
          });

          window.ethereum.on('chainChanged', function (chainId) {
            window.location.reload();
          });

          window.ethereum.on('disconnect', function (error) {
            console.log('MetaMask disconnected');
            window.location.reload();
          });

        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        window.alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error('Error loading Web3:', error);
    }
  },
  loadAccount: async () => {
    // Get current account
    const accounts = await web3.eth.getAccounts();
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      // Create a JavaScript version of the smart contract
      const todoList = await $.getJSON('ToDoList.json');
      App.contracts.TodoList = TruffleContract(todoList);
      App.contracts.TodoList.setProvider(App.web3Provider);
      // Hydrate the smart contract with values from the blockchain
      App.todoList = await App.contracts.TodoList.deployed();
      console.log('Contract loaded successfully');
    } catch (error) {
      console.error('Error loading contract:', error);
    }
  },
  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }
    // Update app loading state
    App.setLoading(true)
    // Render Account
    $('#account').html(App.account)
    // Render Tasks
    await App.renderTasks()
    // Update loading state
    App.setLoading(false)
  },
  renderTasks: async () => {
    try {
      // Load the total task count from the blockchain
      const taskCount = await App.todoList.taskCount()
      const $taskTemplate = $('.taskTemplate')
      // Render out each task with a new task template
      for (var i = 1; i <= taskCount; i++) {
        // Fetch the task data from the blockchain
        const task = await App.todoList.tasks(i)
        const taskId = task[0].toNumber()
        const taskContent = task[1]
        const taskCompleted = task[2]
        // Create the html for the task
        const $newTaskTemplate = $taskTemplate.clone()
        $newTaskTemplate.find('.content').html(taskContent)
        $newTaskTemplate.find('input')
          .prop('name', taskId)
          .prop('checked', taskCompleted)
          .on('click', App.toggleCompleted)
        // Put the task in the correct list
        if (taskCompleted) {
          $('#completedTaskList').append($newTaskTemplate)
        } else {
          $('#taskList').append($newTaskTemplate)
        }
        // Show the task
        $newTaskTemplate.show()
      }
    } catch (error) {
      console.error('Error rendering tasks:', error);
    }
  },
  createTask: async () => {
    try {
      App.setLoading(true)
      const content = $('#newTask').val()
      await App.todoList.createTask(content)
      window.location.reload()
    } catch (error) {
      console.error('Error creating task:', error);
      App.setLoading(false)
    }
  },
  toggleCompleted: async (e) => {
    try {
      App.setLoading(true)
      const taskId = e.target.name
      await App.todoList.toggleCompleted(taskId)
      window.location.reload()
    } catch (error) {
      console.error('Error toggling task:', error);
      App.setLoading(false)
    }
  },
  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})