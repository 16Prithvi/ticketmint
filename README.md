# 🎟️ TicketMint - Blockchain Event Ticketing Platform

[![Solidity](https://img.shields.io/badge/Solidity-2E8B57?style=for-the-badge&logo=solidity&logoColor=white)]()
[![Polygon](https://img.shields.io/badge/Polygon-854ce6?style=for-the-badge&logo=Polygon&logoColor=white)]()

🎫 TicketMint is a decentralized event ticketing system built on the Polygon blockchain.
It leverages NFT-based tickets for transparent, secure, and tamper-proof event management.

🚀 Overview

Traditional ticketing systems face challenges like fraud, duplication, and lack of transparency.
TicketMint solves these by issuing verifiable NFTs as event tickets, enabling seamless on-chain validation and secondary market trading.

🌐 Live Tech Stack
Layer	Technology
Smart Contracts	Solidity, OpenZeppelin
Blockchain Network	Polygon (Mumbai / Mainnet)
Frontend	React.js, Ethers.js, TailwindCSS
Wallet Integration	MetaMask
Backend (optional)	Node.js (for metadata/IPFS handling)
✨ Core Features

🎫 NFT Tickets: Each ticket minted as a unique ERC-721 token.

🔒 Immutable Smart Contracts: Secured via OpenZeppelin templates.

⚡ Polygon Integration: Faster and cheaper transactions than Ethereum mainnet.

💳 MetaMask Payments: Easy ticket purchase & validation directly from the wallet.

🖼️ Ticket Metadata: Stored securely on IPFS or in a decentralized format.

🧾 Resale Tracking: Prevents black-market resale through smart validation.

⚙️ Setup Instructions
1️⃣ Prerequisites

Ensure you have:

Node.js ≥ 16.x

npm or yarn

MetaMask installed and connected to Polygon (Mumbai) testnet

2️⃣ Installation
# Clone the repository
git clone https://github.com/16Prithvi/ticket-mint-bc.git
cd ticket-mint-bc

# Install dependencies
npm install

3️⃣ Smart Contract Deployment
# Compile and deploy contracts to Polygon (using Hardhat)
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygon_mumbai


Make sure your .env file contains:

PRIVATE_KEY=your_wallet_private_key
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com

4️⃣ Frontend Setup
cd client
npm install
npm start


Now open http://localhost:3000
 to view your DApp!

🧠 Smart Contract Design
Component	Description
TicketMint.sol	Core contract managing event creation, ticket minting, and validation
EventFactory.sol	Optional factory contract for managing multiple event contracts
IERC721 / Ownable	OpenZeppelin security and ownership modules
🧩 Future Enhancements

✅ Integrate IPFS for decentralized metadata storage

💰 Add resale royalties for event organizers

📱 Develop a mobile-friendly version using React Native

🧾 Enable on-chain analytics and proof-of-attendance NFTs

🧑‍💻 Contributors
Name	Role
Prithvi Ganiger
	Developer, Smart Contract Architect
🛡️ License

This project is licensed under the MIT License — free to modify and distribute.

📸 Preview (Optional)

(You can later add screenshots or GIFs here)
Example:


💬 Contact

📧 Email: prithviganiger@gmail.com

🔗 LinkedIn: linkedin.com/in/prithvi-ganiger-10bb11365

🌐 GitHub: github.com/16Prithvi