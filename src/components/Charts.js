import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Charts({ reportData, selectedReport }) {
  if (!reportData || (Array.isArray(reportData) && reportData.length === 0)) {
    return <p>No data available for visualization.</p>;
  }

  // Normalize reportData for single-item arrays
  const isSingleItemArray = Array.isArray(reportData) && reportData.length === 1;
  const normalizedData = isSingleItemArray ? reportData[0] : reportData;

  // Helper to render card visuals for single-item reports
  const renderCard = (title, details) => (
    <div style={styles.card}>
      <h3>{title}</h3>
      {details.map((detail, index) => (
        <p key={index}>
          <strong>{detail.label}:</strong> {detail.value}
        </p>
      ))}
    </div>
  );

  // Single-item visualizations
 if (selectedReport === 'getGatesByAirportId') {
    const airport = reportData[0]?.airport || {}; // Get airport details from the first item
return renderCard(`Gates at ${airport.airportName}`, [
        { label: 'Number of Gates', value: airport.numberOfGates },
    ]);
    }

  if (selectedReport === 'getAirportByCode' || selectedReport === 'getAirportById') {
    return renderCard(normalizedData.airportName, [
      { label: 'City', value: normalizedData.cityName },
      { label: 'Code', value: normalizedData.airportCode },
      { label: 'Number of Gates', value: normalizedData.numberOfGates },
    ]);
  }

if (selectedReport === 'getAirportByCity') {
    return (
        <div style={styles.container}>
            <h3>Airports in {normalizedData.cityName}</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Airport Name</th>
                        <th>Code</th>
                        <th>Number of Gates</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((airport) => (
                        <tr key={airport.airportId}>
                            <td>{airport.airportName || `Airport ${airport.airportId}`}</td>
                            <td>{airport.airportCode || 'No Code'}</td>
                            <td>{airport.numberOfGates || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

if (selectedReport === 'getFlightById') {
    return renderCard(normalizedData.flightNumber, [
        { label: 'Departure Time', value: normalizedData.departureTime },
        { label: 'Arrival Time', value: normalizedData.arrivalTime },
    ]);
}
if (selectedReport === 'getPassengerById') {
    return renderCard(normalizedData.passengerName, [
        { label: 'Email', value: normalizedData.passengerEmail },
    ]);
}
if (selectedReport === 'getPassengersByFlightNumber') {
    return (
        <div style={styles.container}>
            <h3>Passengers on Flight {normalizedData.flightNumber}</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Passenger Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((passenger) => (
                        <tr key={passenger.passengerId}>
                            <td>{passenger.passengerName || `Passenger ${passenger.passengerId}`}</td>
                            <td>{passenger.passengerEmail || 'No Email'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
  if (selectedReport === 'getAircraftById') {
    return renderCard(normalizedData.aircraftModel, [
      { label: 'Capacity', value: normalizedData.capacity },
    ]);
  }

  if (selectedReport === 'getAirlineByCode') {
    return renderCard(normalizedData.airlineName, [
      { label: 'Code', value: normalizedData.airlineCode },
    ]);
  }

  if (selectedReport === 'getAllPassengers') {
    return (
      <div style={styles.container}>
        <h3>Passenger List</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>Email</th>
              <th>Number of Flights</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item) => (
              <tr key={item.passengerId}>
                <td>{item.passengerName || `Passenger ${item.passengerId}`}</td>
                <td>{item.passengerEmail || 'No Email'}</td>
                <td>{item.flight?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Multi-item visualizations (charts)
  let labels = [];
  let values = [];

if (selectedReport === 'getAllAirlines') {
  return (
    <div style={styles.container}>
      <h3>Airline List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Airline Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((airline) => (
            <tr key={airline.airlineId}>
              <td>{airline.airlineName}</td>
              <td>{airline.airlineCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

  if (selectedReport === 'getAllAircraft') {
    labels = reportData.map((item) => item.aircraftModel || `Aircraft ${item.aircraftId}`);
    values = reportData.map((item) => item.capacity || 0);
  } else if (selectedReport === 'getAllFlights') {
    labels = reportData.map((item) => item.flightNumber || `Flight ${item.flightId}`);
    values = reportData.map((item) => item.aircraft?.capacity || 0); // Use aircraft capacity if available
  } else if (selectedReport === 'getAllAirports') {
    labels = reportData.map((item) => item.airportName || `Airport ${item.airportId}`);
    values = reportData.map((item) => item.numberOfGates || 0);
  }

  const barData = {
    labels,
    datasets: [
      {
        label:
          selectedReport === 'getAllAirports'
            ? 'Number of Gates'
            : selectedReport === 'getAllAircraft'
            ? 'Capacity'
            : selectedReport === 'getAllFlights'
            ? 'Aircraft Capacity'
            : 'Count or Value',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };



  return (
    <div style={styles.container}>
      <h3>Data Visualization</h3>
      <div style={styles.chart}>
        <h4>Bar Chart</h4>
        <Bar data={barData} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
     width: '50%',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        backgroundColor: '#f9f9f9',
  },
  card: {
    width: '50%',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  },
  table: {
    width: '50%',
    margin: '20px auto',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
};

export default Charts;
