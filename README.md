<div align="center">

  <h1>🎟️ TicketMint</h1>
  
  <h3>The Future of Decentralized Event Ticketing</h3>

  <p>
    <b>Secure • Transparent • Immutable</b>
  </p>

  <p>
    <a href="https://github.com/16Prithvi/ticketmint/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/16Prithvi/ticketmint?style=for-the-badge&logo=github&color=00f2ea" alt="Contributors" />
    </a>
    <a href="https://github.com/16Prithvi/ticketmint/network/members">
      <img src="https://img.shields.io/github/forks/16Prithvi/ticketmint?style=for-the-badge&logo=github&color=ff0050" alt="Forks" />
    </a>
    <a href="https://github.com/16Prithvi/ticketmint/stargazers">
      <img src="https://img.shields.io/github/stars/16Prithvi/ticketmint?style=for-the-badge&logo=github&color=yellow" alt="Stars" />
    </a>
    <a href="https://github.com/16Prithvi/ticketmint/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
    </a>
  </p>
  
  <br />
</div>

---

## 📋 Table of Contents

1. [🤖 About The Project](#-about-the-project)
2. [⚙️ Tech Stack](#-tech-stack)
3. [✨ Key Features](#-key-features)
4. [📸 Screenshots](#-screenshots)
5. [🚀 Getting Started](#-getting-started)
6. [📜 Smart Contract Info](#-smart-contract-info)
7. [🛣️ Roadmap](#-roadmap)
8. [🤝 Contributing](#-contributing)

---

## 🤖 About The Project

**TicketMint** is a decentralized event ticketing platform built on the **Polygon** blockchain. It addresses the critical issues plaguing the traditional ticketing industry—scalping, counterfeit tickets, and lack of transparency.

By leveraging **NFT (Non-Fungible Token)** technology, every ticket issued on TicketMint is a unique digital asset. This ensures verifiable ownership, allows for controlled secondary market trading, and provides organizers with real-time data on ticket lifecycles.

---

## ⚙️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Blockchain** | <img src="https://img.shields.io/badge/Polygon-8247E5?style=flat&logo=polygon&logoColor=white"/> | High-speed, low-cost EVM network (Mumbai/Mainnet) |
| **Smart Contracts** | <img src="https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white"/> | Core logic for minting and validation (ERC-721) |
| **Frontend** | <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/> | Interactive UI with Hooks and Context API |
| **Styling** | <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/> | Responsive and modern design framework |
| **Web3 Client** | <img src="https://img.shields.io/badge/Ethers.js-2A2C3E?style=flat&logo=ethereum&logoColor=white"/> | Blockchain interaction and state management |
| **Storage** | <img src="https://img.shields.io/badge/IPFS-65C2CB?style=flat&logo=ipfs&logoColor=white"/> | Decentralized storage for NFT metadata |

---

## ✨ Key Features


* **🎫 Verifiable NFT Tickets:** Every ticket is an ERC-721 token, preventing duplication and fraud.
* **💳 Seamless Payments:** Purchase tickets directly using crypto via MetaMask.
* **🧾 Resale Controls:** Smart contracts can enforce royalty fees or price caps on secondary sales.
* **📱 QR Validation:** (Planned) On-chain ownership verification via QR codes at entry.
* **🖼️ Dynamic Metadata:** Event details stored securely on IPFS.
* **⚡ Low Gas Fees:** Optimized for the Polygon network to ensure affordability for users.

---

## 📸 Screenshots


| Landing Page |
| :---: |
|<img width="1245" height="882" alt="image" src="https://github.com/user-attachments/assets/e6531e8a-7969-4223-9992-204afe693ebf" />


---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (v16.x or higher)
* **MetaMask Wallet** (Browser Extension)
* **Git**

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/16Prithvi/ticketmint.git](https://github.com/16Prithvi/ticketmint.git)
    cd ticketmint
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    REACT_APP_ALCHEMY_API_URL=your_alchemy_url_here
    REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
    ```

4.  **Run the application**
    ```bash
    npm start
    ```

The app should now be running on `http://localhost:3000`.

---

## 📜 Smart Contract Info

* **Network:** Polygon Mumbai Testnet
* **Contract Address:** `0x...` (Add your deployed address here)
* **Standard:** ERC-721 (OpenZeppelin)

To deploy the contracts yourself:
```bash
npx hardhat run scripts/deploy.js --network mumbaierifiable NFT Tickets:** Every ticket is an ERC-721 token, preventing duplication and fraud.
* **💳 Seamless Payments:** Purchase tickets directly using crypto via MetaMask.
* **🧾 Resale Controls:** Smart contracts can enforce royalty fees or price caps on secondary sales.
* **📱 QR Validation:** (Planned) On-chain ownership verification via QR codes at entry.
* **🖼️ Dynamic Metadata:** Event details stored securely on IPFS.
* **⚡ Low Gas Fees:** Optimized for the Polygon network to ensure affordability for users.

---


## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (v16.x or higher)
* **MetaMask Wallet** (Browser Extension)
* **Git**

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/16Prithvi/ticketmint.git](https://github.com/16Prithvi/ticketmint.git)
    cd ticketmint
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    REACT_APP_ALCHEMY_API_URL=your_alchemy_url_here
    REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
    ```

4.  **Run the application**
    ```bash
    npm start
    ```

The app should now be running on `http://localhost:3000`.

---

## 📜 Smart Contract Info

* **Network:** Polygon Mumbai Testnet
* **Contract Address:** `0x...` (Add your deployed address here)
* **Standard:** ERC-721 (OpenZeppelin)

To deploy the contracts yourself:
```bash
npx hardhat run scripts/deploy.js --network mumbai
