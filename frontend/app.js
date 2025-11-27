let web3;
let eventManagerContract;
let ticketContract;
const eventManagerABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            }
        ],
        "name": "createEvent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "eventId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "mintTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "eventId",
                "type": "uint256"
            }
        ],
        "name": "getEventDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "organizer",
                        "type": "address"
                    }
                ],
                "internalType": "struct EventChainEventManagerContract.Event",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const ticketABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "isTicketUsed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "validateTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Contract addresses (replace with your deployed contract addresses)
const EVENT_MANAGER_ADDRESS = "YOUR_EVENT_MANAGER_CONTRACT_ADDRESS";
const TICKET_CONTRACT_ADDRESS = "YOUR_TICKET_CONTRACT_ADDRESS";

async function connectWallet() {
    try {
        const { ethereum } = window;
        if (!ethereum) {
            showMessage("Please install MetaMask!", "error");
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        document.getElementById('walletAddress').textContent = account;
        
        web3 = new Web3(ethereum);
        
        // Initialize contracts
        eventManagerContract = new web3.eth.Contract(eventManagerABI, EVENT_MANAGER_ADDRESS);
        ticketContract = new web3.eth.Contract(ticketABI, TICKET_CONTRACT_ADDRESS);
        
        showMessage("Wallet connected successfully!", "success");
        
        // Load user's tickets
        loadUserTickets();
    } catch (error) {
        showMessage("Error connecting wallet: " + error.message, "error");
    }
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
    document.getElementById(`${tabId}Tab`).classList.add('active');
}

async function createEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventDate = document.getElementById('eventDate').value;

    try {
        const accounts = await web3.eth.getAccounts();
        const tx = await eventManagerContract.methods.createEvent(eventName, eventLocation, eventDate)
            .send({ from: accounts[0] });
        
        showMessage("Event created successfully!", "success");
        document.getElementById('createEventForm').reset();
    } catch (error) {
        showMessage("Error creating event: " + error.message, "error");
    }
}

async function loadUserTickets() {
    try {
        const accounts = await web3.eth.getAccounts();
        const balance = await ticketContract.methods.balanceOf(accounts[0]).call();
        
        const ticketsList = document.getElementById('ticketsList');
        ticketsList.innerHTML = '';
        
        for (let i = 0; i < balance; i++) {
            const tokenId = await ticketContract.methods.tokenOfOwnerByIndex(accounts[0], i).call();
            const [uri, used] = await ticketContract.methods.getTicketInfo(tokenId).call();
            
            const ticketCard = document.createElement('div');
            ticketCard.className = 'ticket-card';
            
            ticketCard.innerHTML = `
                <div class="ticket-info">
                    <div>
                        <p>Ticket ID: ${tokenId}</p>
                        <p>Used: ${used ? 'Yes' : 'No'}</p>
                    </div>
                    <div class="ticket-actions">
                        ${used ? '' : '<button onclick="validateTicket(' + tokenId + ')">Validate</button>'}
                    </div>
                </div>
            `;
            
            ticketsList.appendChild(ticketCard);
        }
    } catch (error) {
        console.error('Error loading tickets:', error);
    }
}

async function validateTicket(tokenId) {
    try {
        const accounts = await web3.eth.getAccounts();
        await ticketContract.methods.validateTicket(tokenId).send({ from: accounts[0] });
        showMessage("Ticket validated successfully!", "success");
        loadUserTickets();
    } catch (error) {
        showMessage("Error validating ticket: " + error.message, "error");
    }
}

function showMessage(message, type = 'success') {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.className = `status-message ${type}`;
    statusMessage.textContent = message;
    
    setTimeout(() => {
        statusMessage.className = 'status-message';
    }, 5000);
}

// Event listeners
if (document.getElementById('createEventForm')) {
    document.getElementById('createEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createEvent();
    });
}

if (document.getElementById('validateForm')) {
    document.getElementById('validateForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const ticketId = document.getElementById('ticketId').value;
        await validateTicket(ticketId);
    });
}

// Initialize
if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        if (accounts.length === 0) {
            document.getElementById('walletAddress').textContent = 'Not Connected';
        } else {
            document.getElementById('walletAddress').textContent = accounts[0];
        }
    });
}
