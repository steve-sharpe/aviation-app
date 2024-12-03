import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ReportButton from './components/ReportButton';
import Dashboard from './components/Dashboard';

const API_BASE_URL = 'http://localhost:8080'; // Backend base URL

function App() {
  const [selectedReport, setSelectedReport] = useState(''); // Tracks the selected report
  const [reportData, setReportData] = useState(null); // Stores data fetched from the API
  const [loading, setLoading] = useState(false); // Tracks loading state

  // Fetches the data for the selected report
  const fetchReport = async (endpoint) => {
    setLoading(true); // Show spinner
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      setReportData(response.data); // Save fetched data
    } catch (error) {
      console.error('Error fetching report:', error);
      setReportData({ error: 'Failed to fetch data. Please try again.' });
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Handles the selection of a report and determines the correct API endpoint
  const handleReportSelection = (report, parameter = null) => {
    setSelectedReport(report);

    // Mapping report keys to API endpoints
    const endpoints = {
      getAllAirports: '/airports',
      getAirportById: `/airports/${parameter}`,
      getAirportByCode: `/airports/code/${parameter}`,
      getAirportByCity: `/airports/city/${parameter}`,
      getAllFlights: '/flights',
      getFlightById: `/flights/${parameter}`,
      getAllPassengers: '/passengers',
      getPassengerById: `/passengers/${parameter}`,
      getPassengersByFlightNumber: `/passengers/flight/${parameter}`,
      getAllAircraft: '/aircrafts',
      getAircraftById: `/aircrafts/${parameter}`,
      getAllAirlines: '/airlines',
      getAirlineByCode: `/airlines/code/${parameter}`,
      getGatesByAirportId: `/gates/airport/${parameter}`,
    };

    // Call the API
    fetchReport(endpoints[report]);
  };

  return (
    <div className="App">
      {/* Header component */}
      <Header />

      {/* Main Content */}
      <main>
        <h1>Aviation Reports</h1>
        <nav>
          {/* Report Buttons */}
          <ReportButton
            label="All Airports"
            onClick={() => handleReportSelection('getAllAirports')}
            isSelected={selectedReport === 'getAllAirports'}
          />
          <ReportButton
            label="Airport by ID (Example: 1)"
            onClick={() => handleReportSelection('getAirportById', 1)}
            isSelected={selectedReport === 'getAirportById'}
          />
          <ReportButton
            label="Airport by Code (Example: JFK)"
            onClick={() => handleReportSelection('getAirportByCode', 'JFK')}
            isSelected={selectedReport === 'getAirportByCode'}
          />
          <ReportButton
            label="Airport by City (Example: New York)"
            onClick={() => handleReportSelection('getAirportByCity', 'New York')}
            isSelected={selectedReport === 'getAirportByCity'}
          />
          <ReportButton
            label="All Flights"
            onClick={() => handleReportSelection('getAllFlights')}
            isSelected={selectedReport === 'getAllFlights'}
          />
          <ReportButton
            label="Flight by ID (Example: 101)"
            onClick={() => handleReportSelection('getFlightById', 101)}
            isSelected={selectedReport === 'getFlightById'}
          />
          <ReportButton
            label="All Passengers"
            onClick={() => handleReportSelection('getAllPassengers')}
            isSelected={selectedReport === 'getAllPassengers'}
          />
          <ReportButton
            label="Passenger by ID (Example: 1)"
            onClick={() => handleReportSelection('getPassengerById', 1)}
            isSelected={selectedReport === 'getPassengerById'}
          />
          <ReportButton
            label="Passengers by Flight Number (Example: AA123)"
            onClick={() => handleReportSelection('getPassengersByFlightNumber', 'AA123')}
            isSelected={selectedReport === 'getPassengersByFlightNumber'}
          />
          <ReportButton
            label="All Aircraft"
            onClick={() => handleReportSelection('getAllAircraft')}
            isSelected={selectedReport === 'getAllAircraft'}
          />
          <ReportButton
            label="Aircraft by ID (Example: 1)"
            onClick={() => handleReportSelection('getAircraftById', 1)}
            isSelected={selectedReport === 'getAircraftById'}
          />
          <ReportButton
            label="All Airlines"
            onClick={() => handleReportSelection('getAllAirlines')}
            isSelected={selectedReport === 'getAllAirlines'}
          />
          <ReportButton
            label="Airline by Code (Example: AA)"
            onClick={() => handleReportSelection('getAirlineByCode', 'AA')}
            isSelected={selectedReport === 'getAirlineByCode'}
          />
          <ReportButton
            label="Gates by Airport ID (Example: 1)"
            onClick={() => handleReportSelection('getGatesByAirportId', 1)}
            isSelected={selectedReport === 'getGatesByAirportId'}
          />
        </nav>

        {/* Show spinner or Dashboard */}
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <Dashboard selectedReport={selectedReport} reportData={reportData} />
        )}
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
