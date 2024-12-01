import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:8080'; // Assuming your backend is running on localhost:8080

function App() {
  const [data, setData] = useState({
    airports: [],
    flights: [],
    passengers: [],
    aircrafts: [],
    gates: [],
    airlines: []
  });
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedAirport, setSelectedAirport] = useState(null);

  useEffect(() => {
    fetchData('airports');
    fetchData('flights');
    fetchData('passengers');
    fetchData('aircrafts');
    fetchData('gates');
    fetchData('airlines');
  }, []);

  const fetchData = async (entity) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${entity}`);
      setData(prevData => ({
        ...prevData,
        [entity]: Array.isArray(response.data) ? response.data : []
      }));
    } catch (error) {
      console.error(`Error fetching ${entity}:`, error);
      setData(prevData => ({
        ...prevData,
        [entity]: []
      }));
    }
  };

  const showFlightsAtAirport = (airportId) => {
    const relatedFlights = data.flights.filter(flight => 
      (flight.departureAirport && flight.departureAirport.id === airportId) || 
      (flight.arrivalAirport && flight.arrivalAirport.id === airportId)
    );
    setSelectedAirport({ airportId, relatedFlights });
  };

  const renderDetails = (entity, item) => {
    switch (entity) {
      case 'airports':
        return (
          <div key={item.airportId}>
            <h3>{item.airportName} ({item.cityName})</h3>
            <p>Airport Code: {item.airportCode}</p>
            <p>Number of Gates: {item.numberOfGates}</p>
            <button onClick={() => showFlightsAtAirport(item.airportId)}>Show Flights</button>
          </div>
        );
      case 'flights':
        const aircraft = item.aircraft ? data.aircrafts.find(a => a.aircraftId === item.aircraft.aircraftId) : null;
        const airline = item.airline ? data.airlines.find(a => a.airlineId === item.airline.airlineId) : null;
        return (
          <div key={item.flightId}>
            <h3>{item.flightNumber}</h3>
            <p>Destination: {item.destination}</p>
            <p>Aircraft: {aircraft ? aircraft.aircraftModel : 'N/A'}</p>
            <p>Airline: {airline ? airline.airlineName : 'N/A'}</p>
          </div>
        );
      case 'passengers':
        const flight = data.flights.find(flight => flight.flightId === item.flightId);
        return (
          <div key={item.passengerId}>
            <h3>{item.name}</h3>
            <p>Flight: {flight ? `${flight.flightNumber} - ${flight.destination}` : 'N/A'}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderEntityData = () => {
    if (!selectedEntity) return <p>Select an entity from the menu.</p>;
    return (
      <div>
        {data[selectedEntity].map(item => renderDetails(selectedEntity, item))}
        {selectedEntity === 'airports' && renderFlightsAtAirport()}
      </div>
    );
  };

  const renderFlightsAtAirport = () => {
    if (!selectedAirport) return null;
    return (
      <div>
        <h3>Flights at Airport {selectedAirport.airportId}</h3>
        <ul>
          {selectedAirport.relatedFlights.map(flight => (
            <li key={flight.flightId}>
              {flight.flightNumber} - {flight.destination}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Aviation Dashboard</h1>
      <nav>
        <button onClick={() => setSelectedEntity('airports')}>Airports</button>
        <button onClick={() => setSelectedEntity('flights')}>Flights</button>
        <button onClick={() => setSelectedEntity('passengers')}>Passengers</button>
      </nav>
      <div>{renderEntityData()}</div>
    </div>
  );
}

export default App;