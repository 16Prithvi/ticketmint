// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EventTicket is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Event {
        string name;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 ticketPrice;
        uint256 maxTickets;
        uint256 availableTickets;
        string location;
        string imageURI;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => uint256) public ticketToEvent;
    mapping(uint256 => mapping(address => uint256)) public attendeeTickets;

    event EventCreated(uint256 indexed eventId, string name, uint256 startTime);
    event TicketMinted(uint256 indexed eventId, uint256 tokenId, address owner);
    event TicketTransferred(uint256 indexed tokenId, address from, address to);

    constructor() ERC721("EventTicket", "ET") {}

    function createEvent(
        string memory _name,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _ticketPrice,
        uint256 _maxTickets,
        string memory _location,
        string memory _imageURI
    ) external onlyOwner {
        require(_startTime < _endTime, "Start time must be before end time");
        require(_maxTickets > 0, "Must have at least one ticket");
        require(_ticketPrice > 0, "Ticket price must be greater than 0");

        uint256 eventId = _tokenIdCounter.current();
        events[eventId] = Event(
            _name,
            _description,
            _startTime,
            _endTime,
            _ticketPrice,
            _maxTickets,
            _maxTickets,
            _location,
            _imageURI
        );

        _tokenIdCounter.increment();
        emit EventCreated(eventId, _name, _startTime);
    }

    function mintTicket(uint256 _eventId) external payable {
        require(_eventId < _tokenIdCounter.current(), "Event does not exist");
        require(events[_eventId].availableTickets > 0, "No tickets available");
        require(msg.value >= events[_eventId].ticketPrice, "Insufficient payment");

        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        ticketToEvent[tokenId] = _eventId;
        events[_eventId].availableTickets--;
        attendeeTickets[_eventId][msg.sender]++;

        _tokenIdCounter.increment();
        emit TicketMinted(_eventId, tokenId, msg.sender);
    }

    function transferTicket(uint256 _tokenId, address _to) external {
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Not owner or approved");
        _transfer(msg.sender, _to, _tokenId);
        emit TicketTransferred(_tokenId, msg.sender, _to);
    }

    function getEventDetails(uint256 _eventId) external view returns (Event memory) {
        return events[_eventId];
    }

    function getTicketEvent(uint256 _tokenId) external view returns (uint256) {
        return ticketToEvent[_tokenId];
    }

    function getAttendeeTickets(uint256 _eventId, address _attendee) external view returns (uint256) {
        return attendeeTickets[_eventId][_attendee];
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getEventCount() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
