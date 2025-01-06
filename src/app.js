// App object containing all application functionality
App = {
  // State variable to track loading status
  loading: false,
  // Object to store contract instances
  contracts: {},

  // Main load function to initialize the app
  load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
  },

  // Initialize Web3 with MetaMask
  loadWeb3: async () => {
      try {
          if (window.ethereum) {
              App.web3Provider = window.ethereum;
              web3 = new Web3(window.ethereum);

              try {
                  // Request account access from MetaMask
                  await window.ethereum.request({ method: 'eth_requestAccounts' });

                  // Listen for MetaMask account changes 
                  window.ethereum.on('accountsChanged', function (accounts) {
                      App.account = accounts[0];
                      App.render();
                  });

                  // Listen for MetaMask network changes
                  window.ethereum.on('chainChanged', function (chainId) {
                      window.location.reload();
                  });

                  // Listen for MetaMask disconnect events
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

  // Load the current Ethereum account
  loadAccount: async () => {
      const accounts = await web3.eth.getAccounts();
      App.account = accounts[0];
  },

  // Load the smart contract
  loadContract: async () => {
      try {
          // Get contract JSON file
          const todoList = await $.getJSON('ToDoList.json');
          // Create contract instance
          App.contracts.TodoList = TruffleContract(todoList);
          // Set Web3 provider for contract
          App.contracts.TodoList.setProvider(App.web3Provider);
          // Get deployed contract instance
          App.todoList = await App.contracts.TodoList.deployed();
          console.log('Contract loaded successfully');
          
          if (typeof App.todoList.toggleCompleted !== 'function') {
              console.error('toggleCompleted method not found on contract');
          }
      } catch (error) {
          console.error('Error loading contract:', error);
          throw error;
      }
  },

  // Render the application UI
  render: async () => {
      // Prevent double rendering
      if (App.loading) {
          return
      }

      // Update loading state
      App.setLoading(true)
      // Display current account
      $('#account').html(App.account)
      // Load and display tasks
      await App.renderTasks()
      // Reset loading state
      App.setLoading(false)
  },

  // Render all tasks from the blockchain
  renderTasks: async () => {
      try {
          // Get total number of tasks
          const taskCount = await App.todoList.taskCount()
          const $taskTemplate = $('.taskTemplate')

          // Loop through all tasks
          for (var i = 1; i <= taskCount; i++) {
              // Get task data from blockchain
              const task = await App.todoList.tasks(i)
              const taskId = task[0].toNumber()
              const taskContent = task[1]
              const taskCompleted = task[2]

              // Create new task template
              const $newTaskTemplate = $taskTemplate.clone()
              $newTaskTemplate.find('.content').html(taskContent)
              $newTaskTemplate.find('input')
                  .prop('name', taskId)
                  .prop('checked', taskCompleted)
                  .on('click', App.toggleCompleted)

              // Add task to appropriate list based on completion status
              if (taskCompleted) {
                  $('#completedTaskList').append($newTaskTemplate)
              } else {
                  $('#taskList').append($newTaskTemplate)
              }

              // Display the task
              $newTaskTemplate.show()
          }
      } catch (error) {
          console.error('Error rendering tasks:', error);
      }
  },

  // Create a new task
  createTask: async () => {
      try {
          App.setLoading(true)
          // Get task content from input
          const content = $('#newTask').val()
          // Create task on blockchain
          await App.todoList.createTask(content, { from: App.account })
          // Reload page to show new task
          window.location.reload()
      } catch (error) {
          console.error('Error creating task:', error);
          App.setLoading(false)
      }
  },

  // Toggle task completion status
  toggleCompleted: async (e) => {
      try {
          App.setLoading(true)
          // Get task ID from checkbox
          const taskId = parseInt(e.target.name)
          
          if (!App.todoList) {
              throw new Error('Contract not loaded')
          }
          
          await App.todoList.toggleCompleted(taskId, { 
              from: App.account,
              gas: 200000
          })
          // Reload page to show updated status
          window.location.reload()
      } catch (error) {
          console.error('Error toggling task:', error);
          App.setLoading(false)
      }
  },

  // Control loading state and UI visibility
  setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')

      // Show/hide loader and content based on loading state
      if (boolean) {
          loader.show()
          content.hide()
      } else {
          loader.hide()
          content.show()
      }
  }
}

// Initialize app when document is ready
$(() => {
  $(window).load(() => {
      App.load()
  })
})