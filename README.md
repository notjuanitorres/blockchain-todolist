# 📋 Ethereum To-Do List DApp

**A decentralized to-do list application powered by Ethereum blockchain, MetaMask, and smart contracts.** This project demonstrates how to build and deploy a simple blockchain-based application using **Solidity**, **Truffle**, **Web3.js**, and **Bootstrap** for a modern, clean user interface.

---

## 🛠️ Features

- Add new tasks to your personal to-do list stored on the Ethereum blockchain.
- Mark tasks as completed, with blockchain-based state persistence.
- Real-time updates via smart contract events.
- MetaMask integration for secure blockchain interactions.
- Fully decentralized — tasks are stored on the blockchain and not on a centralized database.

---

## 🌟 Demo

### User Interface:

- A clean, responsive design built with **Bootstrap 4.1.3**.
- Interact with your smart contract directly via MetaMask and Web3.js.
- Easy-to-use form for adding new tasks and toggling task completion.

### Core Blockchain Functionality:

- The Ethereum **smart contract** stores all task data securely.
- State changes (e.g., adding or completing tasks) are recorded immutably on the blockchain.

---

## 📦 Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites:
1. **Node.js** (v14+ recommended)
2. **MetaMask** browser extension installed.
3. **Ganache** for running a local blockchain instance.
4. **Truffle Framework** for managing smart contracts.

### Step 1: Clone the Repository
```bash
git clone https://github.com/notjuanitorres/blockchain-todolist.git
cd eth-todo-list
```
### Step 2: Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### Step 3: Compile and Migrate the Smart Contract

Run the following commands to compile and deploy the smart contract to your local blockchain:

```bash
truffle compile
truffle migrate --reset
```

Make sure Ganache is running on http://127.0.0.1:7545 and matches the configuration in truffle-config.js.

### Step 4: Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

The application will be available at: http://localhost:3000

---

## 📄 Smart Contract

The **`TodoList` smart contract** is written in Solidity and deployed on the Ethereum blockchain. It includes the following functionalities:
- **Create a Task**: Adds a new task to the blockchain.
- **Toggle Task Completion**: Updates the `completed` state of an existing task.
- **Event Emission**: Emits `TaskCreated` and `TaskCompleted` events to notify the frontend.

## 🖥️ Technologies Used

### Frontend:
- **HTML5 / CSS3**: For the basic structure and styling.
- **Bootstrap 4.1.3**: For responsive and modern UI components.
- **jQuery**: For DOM manipulation and AJAX requests.

### Backend:
- **Solidity**: The language used to write the smart contract.
- **Truffle**: Framework for contract deployment and testing.
- **Ganache**: Local Ethereum blockchain for testing and development.

### Blockchain Integration:
- **Web3.js**: For interacting with the Ethereum blockchain.
- **MetaMask**: For user authentication and transaction signing.

---

## 📚 How It Works

1. **MetaMask Integration**:
   - Connect your Ethereum wallet via MetaMask.
   - Interact with the blockchain by signing transactions directly from MetaMask.

2. **Smart Contract Interaction**:
   - Tasks are stored on the blockchain using the `TodoList` smart contract.
   - Task states are toggled and updated immutably on the blockchain.

3. **Frontend Updates**:
   - The frontend listens for smart contract events (`TaskCreated`, `TaskCompleted`) to dynamically update the UI.

---

## 🧪 Testing

This project uses **Chai** for testing the smart contract. To run the tests:

```bash
truffle test
```

## 🛡️ Security

## Key Considerations:
- **Gas Optimization**: The contract is designed to minimize gas costs for creating and toggling tasks.
- **Account and Network Changes**: The app dynamically detects and responds to MetaMask account or network changes.

---

## 📜 License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for more details.

---

## 🤝 Contributing

Contributions are welcome! If you’d like to make improvements, please fork this repository and submit a pull request.

---

## 📧 Contact

For questions or feedback, feel free to reach out:

- **Author**: elgoat16  
- **GitHub**: [notjuanitorres](https://github.com/notjuanitorres)















