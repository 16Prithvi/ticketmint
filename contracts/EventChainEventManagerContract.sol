// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IEventChainContract.sol";
import "./IEventChainEventManagerContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EventChainEventManagerContract
 * @dev This contract manages the creation and organization of events. It allows event organizers
 *      to create events, mint tickets, and transfer event ownership. The contract is owned by an 
 *      owner who can set the address of the associated EventChainContract.
 */
contract EventChainEventManagerContract is Ownable, IEventChainEventManagerContract {

    uint256 private _eventIdCounter; // Counter to keep track of event IDs

    mapping(uint256 => Event) private events; // Mapping from event ID to event details
    address _eventChainContractAddress; // Address of the associated EventChainContract
    }

    uint256 public eventCounter;
    address public ticketContractAddress;

    mapping(uint256 => Event) public events;
    mapping(address => uint256[]) public organizerEvents;

    event EventCreated(uint256 indexed eventId, string name, address indexed organizer);
    event EventUpdated(uint256 indexed eventId, string newName);
    event TicketMinted(uint256 indexed eventId, address indexed to);

    constructor(address _ticketContract) {
        ticketContractAddress = _ticketContract;
    }

    function setTicketContractAddress(address _newAddress) external onlyOwner {
        ticketContractAddress = _newAddress;
    }

    function createEvent(string memory name, string memory location, uint256 date) external {
        uint256 eventId = eventCounter++;
        events[eventId] = Event(name, location, date, msg.sender);
        organizerEvents[msg.sender].push(eventId);
        emit EventCreated(eventId, name, msg.sender);
    }

    function updateEventDetails(uint256 eventId, string memory newName, string memory newLocation, uint256 newDate) external {
        Event storage evt = events[eventId];
        require(evt.organizer == msg.sender, "Not the organizer");
        evt.name = newName;
        evt.location = newLocation;
        evt.date = newDate;
        emit EventUpdated(eventId, newName);
    }

    function mintTicket(uint256 eventId, address to, string memory uri) external {
        require(events[eventId].organizer == msg.sender, "Not event organizer");
        IEventChainContract(ticketContractAddress).safeMint(to, uri);
        emit TicketMinted(eventId, to);
    }

    function getEventDetails(uint256 eventId) external view returns (Event memory) {
        return events[eventId];
    }

    function getOrganizerEvents(address organizer) external view returns (uint256[] memory) {
        return organizerEvents[organizer];
     * @param uri The URI of the ticket metadata.
     */
    function mintTicket(uint256 eventId, address to, string memory uri) public override {
        require(eventId < _eventIdCounter, "Event does not exist");
        require(events[eventId].organizer == msg.sender, "Only the event organizer can mint tickets");
        require(_eventChainContractAddress != address(0), "Event chain contract address is not set");
        require(address(this).balance == 0, "Cannot mint ticket with pending transactions");

        IEventChainContract eventChainContract = IEventChainContract(_eventChainContractAddress);
        eventChainContract.safeMint(to, uri, events[eventId].name, events[eventId].ticketPrice, block.timestamp + 1 weeks); // Ticket expires in 1 week
    }

    /**
     * @dev Transfers the ownership of an event.
     * @param eventId The ID of the event.
     * @param to The address of the new owner.
     */
    function transferEvent(uint256 eventId, address to) external onlyOwner {
        Event storage currentEvent = events[eventId];
        require(currentEvent.organizer == msg.sender, "Only the event organizer can transfer the event");

        currentEvent.organizer = to;
        emit EventTransferred(eventId, msg.sender, to);
    }
}