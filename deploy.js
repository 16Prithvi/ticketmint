require("dotenv").config();

async function main() {
    console.log("Deploying contracts...");

    // Get the signer from MetaMask
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Deploy EventChainEventManagerContract
    const EventChainEventManagerContract = await ethers.getContractFactory("EventChainEventManagerContract");
    const eventManager = await EventChainEventManagerContract.deploy();
    await eventManager.deployed();
    console.log("EventChainEventManagerContract deployed to:", eventManager.address);

    // Deploy EventChainContract
    const EventChainContract = await ethers.getContractFactory("EventChainContract");
    const eventChain = await EventChainContract.deploy(eventManager.address);
    await eventChain.deployed();
    console.log("EventChainContract deployed to:", eventChain.address);

    // Save the addresses to a file
    const fs = require("fs");
    const contracts = {
        EventChainEventManagerContract: eventManager.address,
        EventChainContract: eventChain.address
    };
    fs.writeFileSync("./deployed-contracts.json", JSON.stringify(contracts, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
