import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:8080'; // Backend base URL

function App() {
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
      setReportData({ error: 'Failed to fetch data. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReportSelection = (report, parameter = null) => {
    setSelectedReport(report);
    const endpoints = {
      getAllAirports: '/airports',
      getAirportById: `/airports/${parameter}`, // Replace {id} dynamically
      getAirportByCode: `/airports/code/${parameter}`, // Replace {code} dynamically
      getAirportByCity: `/airports/city/${parameter}`, // Replace {city} dynamically
      getAllFlights: '/flights',
      getFlightById: `/flights/${parameter}`, // Replace {id} dynamically
      // getFlightsByDepartureAirportId: `/flights/departure/airport/${parameter}`,
      // getFlightsByDepartureAirportCode: `/flights/departure/code/${parameter}`,
      // getFlightsByArrivalAirportId: `/flights/arrival/airport/${parameter}`,
      // getFlightsByArrivalAirportCode: `/flights/arrival/code/${parameter}`,
      getAllPassengers: '/passengers',
      getPassengerById: `/passengers/${parameter}`,
      getPassengersByFlightNumber: `/passengers/flight/${parameter}`,
      getAllAircraft: '/aircrafts',
      getAircraftById: `/aircrafts/${parameter}`,
      getAllAirlines: '/airlines',
      getAirlineByCode: `/airlines/code/${parameter}`,
      getGatesByAirportId: `/gates/airport/${parameter}`,
    };

    fetchReport(endpoints[report]);
  };

  const renderReport = () => {
    if (!reportData) return <p>No data to display. Select a report.</p>;
    if (reportData.error) return <p>{reportData.error}</p>;

    return (
      <div>
        <h3>Report: {selectedReport}</h3>
        <pre>{JSON.stringify(reportData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Aviation Reports</h1>
      <nav>
        <button onClick={() => handleReportSelection('getAllAirports')}>All Airports</button>
        <button onClick={() => handleReportSelection('getAirportById', 1)}>Airport by ID (Example: 1)</button>
        <button onClick={() => handleReportSelection('getAirportByCode', 'JFK')}>Airport by Code (Example: JFK)</button>
        <button onClick={() => handleReportSelection('getAirportByCity', 'New York')}>Airport by City (Example: New York)</button>

        <button onClick={() => handleReportSelection('getAllFlights')}>All Flights</button>
        <button onClick={() => handleReportSelection('getFlightById', 1)}>Flight by ID (Example: 101)</button>
        {/* <button onClick={() => handleReportSelection('getFlightsByDepartureAirportId', 1)}>Flights by Departure Airport ID (Example: 1)</button>
        <button onClick={() => handleReportSelection('getFlightsByDepartureAirportCode', 'JFK')}>Flights by Departure Airport Code (Example: JFK)</button>
        <button onClick={() => handleReportSelection('getFlightsByArrivalAirportId', 2)}>Flights by Arrival Airport ID (Example: 2)</button>
        <button onClick={() => handleReportSelection('getFlightsByArrivalAirportCode', 'LAX')}>Flights by Arrival Airport Code (Example: LAX)</button> */}

        <button onClick={() => handleReportSelection('getAllPassengers')}>All Passengers</button>
        <button onClick={() => handleReportSelection('getPassengerById', 1)}>Passenger by ID (Example: 1)</button>
        <button onClick={() => handleReportSelection('getPassengersByFlightNumber', 'AA123')}>Passengers by Flight Number (Example: AA123)</button>

        <button onClick={() => handleReportSelection('getAllAircraft')}>All Aircraft</button>
        <button onClick={() => handleReportSelection('getAircraftById', 1)}>Aircraft by ID (Example: 1)</button>

        <button onClick={() => handleReportSelection('getAllAirlines')}>All Airlines</button>
        <button onClick={() => handleReportSelection('getAirlineByCode', 'AA')}>Airline by Code (Example: AA)</button>

        <button onClick={() => handleReportSelection('getGatesByAirportId', 1)}>Gates by Airport ID (Example: 1)</button>
      </nav>
      {loading ? <p>Loading...</p> : renderReport()}
    </div>
  );
}

export default App;
