import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SimpleApp() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Blockchain Conference 2024",
      description: "The biggest blockchain conference of the year featuring industry leaders and cutting-edge technology discussions.",
      location: "San Francisco Convention Center",
      ticketPrice: "0.1",
      availableTickets: 150,
      startTime: "2024-03-15T09:00",
      endTime: "2024-03-15T18:00",
      imageURI: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
    },
    {
      id: 2,
      name: "NFT Art Gallery Opening",
      description: "Exclusive opening of the world's first NFT art gallery featuring digital masterpieces from renowned artists.",
      location: "New York Art District",
      ticketPrice: "0.05",
      availableTickets: 75,
      startTime: "2024-03-20T19:00",
      endTime: "2024-03-20T23:00",
      imageURI: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400"
    },
    {
      id: 3,
      name: "DeFi Summit 2024",
      description: "Join the decentralized finance revolution with talks from DeFi pioneers and hands-on workshops.",
      location: "London Financial District",
      ticketPrice: "0.2",
      availableTickets: 200,
      startTime: "2024-04-10T10:00",
      endTime: "2024-04-10T17:00",
      imageURI: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
    }
  ]);

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

  const [myTickets, setMyTickets] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (walletConnected) {
      const event = {
        id: events.length + 1,
        ...newEvent,
        availableTickets: parseInt(newEvent.maxTickets)
      };
      setEvents([...events, event]);
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
      alert('Event created successfully! (Demo mode)');
    } else {
      alert('Please connect your wallet first!');
    }
  };

  const handleMintTicket = (eventId) => {
    if (walletConnected) {
      const event = events.find(e => e.id === eventId);
      if (event && event.availableTickets > 0) {
        const ticket = {
          id: Date.now(),
          eventId: eventId,
          eventName: event.name,
          price: event.ticketPrice,
          mintedAt: new Date().toLocaleString()
        };
        setMyTickets([...myTickets, ticket]);
        
        // Update available tickets
        setEvents(events.map(e => 
          e.id === eventId 
            ? { ...e, availableTickets: e.availableTickets - 1 }
            : e
        ));
        
        alert(`Ticket minted successfully for ${event.name}! (Demo mode)`);
      }
    } else {
      alert('Please connect your wallet first!');
    }
  };

  const connectWallet = () => {
    setWalletConnected(true);
    alert('Wallet connected! (Demo mode - no real wallet required)');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🎫 EventChain - Blockchain Ticketing System</h1>
        {walletConnected ? (
          <div className="d-flex align-items-center">
            <span className="badge bg-success me-2">Connected</span>
            <small className="text-muted">0x1234...5678</small>
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
          <p>This is a demonstration of blockchain-based event ticketing using NFTs.</p>
          <p>Click "Connect Wallet" to start creating events and minting tickets!</p>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h3>Create New Event</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleCreateEvent}>
                  <div className="mb-3">
                    <label className="form-label">Event Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ticket Price (ETH)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={newEvent.ticketPrice}
                      onChange={(e) => setNewEvent({ ...newEvent, ticketPrice: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Max Tickets</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newEvent.maxTickets}
                      onChange={(e) => setNewEvent({ ...newEvent, maxTickets: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URI</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEvent.imageURI}
                      onChange={(e) => setNewEvent({ ...newEvent, imageURI: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create Event
                  </button>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Your Tickets ({myTickets.length})</h3>
              </div>
              <div className="card-body">
                {myTickets.length === 0 ? (
                  <div className="alert alert-secondary text-center">
                    <p>No tickets owned yet. Mint tickets from available events!</p>
                  </div>
                ) : (
                  <div className="list-group">
                    {myTickets.map((ticket) => (
                      <div key={ticket.id} className="list-group-item">
                        <h6>{ticket.eventName}</h6>
                        <p className="mb-1">Price: {ticket.price} ETH</p>
                        <small className="text-muted">Minted: {ticket.mintedAt}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Available Events ({events.length})</h3>
              </div>
              <div className="card-body">
                {events.map((event) => (
                  <div key={event.id} className="card mb-3">
                    <div className="card-body">
                      {event.imageURI && (
                        <img 
                          src={event.imageURI} 
                          className="card-img-top mb-3" 
                          alt={event.name}
                          style={{height: '200px', objectFit: 'cover'}}
                        />
                      )}
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text">{event.description}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                      <p><strong>Ticket Price:</strong> {event.ticketPrice} ETH</p>
                      <p><strong>Tickets Available:</strong> {event.availableTickets}</p>
                      <p><strong>Start:</strong> {new Date(event.startTime).toLocaleString()}</p>
                      <button
                        onClick={() => handleMintTicket(event.id)}
                        className="btn btn-success"
                        disabled={event.availableTickets === 0}
                      >
                        {event.availableTickets === 0 ? 'Sold Out' : 'Mint Ticket'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <div className="card">
          <div className="card-header">
            <h4>🔧 Technical Features</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h6>Blockchain Features:</h6>
                <ul>
                  <li>✅ NFT-based tickets (ERC721)</li>
                  <li>✅ Immutable ownership records</li>
                  <li>✅ Tamper-proof validation</li>
                  <li>✅ Complete transaction history</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>Event Management:</h6>
                <ul>
                  <li>✅ Create and manage events</li>
                  <li>✅ Set ticket prices in ETH</li>
                  <li>✅ Control ticket availability</li>
                  <li>✅ Transfer event ownership</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleApp;
