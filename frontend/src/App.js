import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const abi = [
  "function createEvent(string name, string description, uint256 startTime, uint256 endTime, uint256 ticketPrice, uint256 maxTickets, string location, string imageURI)",
  "function mintTicket(uint256 eventId) payable",
  "function getEventDetails(uint256 eventId) view returns (string name, string description, uint256 startTime, uint256 endTime, uint256 ticketPrice, uint256 maxTickets, uint256 availableTickets, string location, string imageURI)",
  "function getEventCount() view returns (uint256)"
];

function App() {
  const [contract, setContract] = useState(null);
  const [events, setEvents] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    ticketPrice: '',
    maxTickets: '',
    location: '',
    imageURI: ''
  });

  useEffect(() => {
    checkWalletConnection();
    // Load demo events for display purposes
    loadDemoEvents();
  }, []);

  function loadDemoEvents() {
    const demoEvents = [
      {
        name: "Blockchain Conference 2024",
        description: "The biggest blockchain conference of the year featuring industry leaders and cutting-edge technology discussions.",
        location: "San Francisco Convention Center",
        ticketPrice: "0.1",
        availableTickets: 150,
        startTime: "2024-03-15T09:00",
        endTime: "2024-03-15T18:00"
      },
      {
        name: "NFT Art Gallery Opening",
        description: "Exclusive opening of the world's first NFT art gallery featuring digital masterpieces from renowned artists.",
        location: "New York Art District",
        ticketPrice: "0.05",
        availableTickets: 75,
        startTime: "2024-03-20T19:00",
        endTime: "2024-03-20T23:00"
      },
      {
        name: "DeFi Summit 2024",
        description: "Join the decentralized finance revolution with talks from DeFi pioneers and hands-on workshops.",
        location: "London Financial District",
        ticketPrice: "0.2",
        availableTickets: 200,
        startTime: "2024-04-10T10:00",
        endTime: "2024-04-10T17:00"
      }
    ];
    setEvents(demoEvents);
  }

  async function checkWalletConnection() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (error) {
        console.log('No wallet connected');
      }
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        setContract(contractInstance);
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
        loadEvents();
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Please install MetaMask or connect your wallet to use this application');
      }
    } else {
      alert('Please install MetaMask to use this application');
    }
  }

  async function loadEvents() {
    if (contract) {
      const eventCount = await contract.getEventCount();
      const eventsData = [];
      for (let i = 0; i < eventCount; i++) {
        const event = await contract.getEventDetails(i);
        eventsData.push(event);
      }
      setEvents(eventsData);
    }
  }

  async function createEvent(e) {
    e.preventDefault();
    if (contract) {
      try {
        const tx = await contract.createEvent(
          newEvent.name,
          newEvent.description,
          newEvent.startTime,
          newEvent.endTime,
          ethers.parseEther(newEvent.ticketPrice),
          newEvent.maxTickets,
          newEvent.location,
          newEvent.imageURI
        );
        await tx.wait();
        setNewEvent({
          name: '',
          description: '',
          startTime: '',
          endTime: '',
          ticketPrice: '',
          maxTickets: '',
          location: '',
          imageURI: ''
        });
        loadEvents();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function mintTicket(eventId) {
    if (contract) {
      try {
        const tx = await contract.mintTicket(eventId, { value: ethers.parseEther(events[eventId].ticketPrice) });
        await tx.wait();
        loadEvents();
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🎫 EventChain - Blockchain Ticketing System</h1>
        {walletConnected ? (
          <div className="d-flex align-items-center">
            <span className="badge bg-success me-2">Connected</span>
            <small className="text-muted">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</small>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      
      {!walletConnected ? (
        <div className="alert alert-info text-center">
          <h4>Welcome to EventChain!</h4>
          <p>Please connect your MetaMask wallet to create events and manage tickets on the blockchain.</p>
          <p>This is a demonstration of blockchain-based event ticketing using NFTs.</p>
        </div>
      ) : (
        <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h3>Create New Event</h3>
            </div>
            <div className="card-body">
              <form onSubmit={createEvent}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Start Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>End Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Ticket Price (ETH)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={newEvent.ticketPrice}
                    onChange={(e) => setNewEvent({ ...newEvent, ticketPrice: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Max Tickets</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newEvent.maxTickets}
                    onChange={(e) => setNewEvent({ ...newEvent, maxTickets: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Image URI</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEvent.imageURI}
                    onChange={(e) => setNewEvent({ ...newEvent, imageURI: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!walletConnected}>
                  {walletConnected ? 'Create Event' : 'Connect Wallet to Create Event'}
                </button>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Your Tickets</h3>
            </div>
            <div className="card-body">
              <div className="list-group">
                {events.map((event, index) => (
                  <div key={index} className="list-group-item">
                    <h5>{event.name}</h5>
                    <p>Tickets Owned: {event.availableTickets}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Available Events</h3>
            </div>
            <div className="card-body">
              {events.map((event, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text">{event.description}</p>
                    <p>Location: {event.location}</p>
                    <p>Ticket Price: {typeof event.ticketPrice === 'string' ? event.ticketPrice : ethers.formatEther(event.ticketPrice)} ETH</p>
                    <p>Tickets Available: {event.availableTickets}</p>
                    <button
                      onClick={() => mintTicket(index)}
                      className="btn btn-success"
                      disabled={event.availableTickets === 0 || !walletConnected}
                    >
                      {walletConnected ? 'Mint Ticket' : 'Connect Wallet to Mint'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
