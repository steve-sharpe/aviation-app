import React from 'react';
import { render } from '@testing-library/react';
import Charts from './Charts';

describe('Charts Component', () => {
    it('renders no data message when reportData is empty', () => {
        const { getByText } = render(<Charts reportData={[]} selectedReport="getAirportByCode" />);
        expect(getByText('No data available for visualization.')).toBeInTheDocument();
    });

    it('renders airport details for getAirportByCode', () => {
        const reportData = { airportName: 'JFK', cityName: 'New York', airportCode: 'JFK', numberOfGates: 5 };
        const { getByText } = render(<Charts reportData={reportData} selectedReport="getAirportByCode" />);
        expect(getByText('JFK')).toBeInTheDocument();
        expect(getByText('City:')).toBeInTheDocument();
        expect(getByText('New York')).toBeInTheDocument();
        expect(getByText('Code:')).toBeInTheDocument();
        expect(getByText('JFK')).toBeInTheDocument();
        expect(getByText('Number of Gates:')).toBeInTheDocument();
        expect(getByText('5')).toBeInTheDocument();
    });

    it('renders passengers table for getPassengersByFlightNumber', () => {
        const reportData = [
            { passengerId: 1, passengerName: 'John Doe', passengerEmail: 'john@example.com' },
            { passengerId: 2, passengerName: 'Jane Smith', passengerEmail: 'jane@example.com' },
        ];
        const { getByText } = render(<Charts reportData={reportData} selectedReport="getPassengersByFlightNumber" />);
        expect(getByText('Passengers on Flight')).toBeInTheDocument();
        expect(getByText('Passenger Name')).toBeInTheDocument();
        expect(getByText('Email')).toBeInTheDocument();
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('john@example.com')).toBeInTheDocument();
        expect(getByText('Jane Smith')).toBeInTheDocument();
        expect(getByText('jane@example.com')).toBeInTheDocument();
    });

    it('renders bar chart for getAllAirports', () => {
        const reportData = [
            { airportId: 1, airportName: 'JFK', numberOfGates: 5 },
            { airportId: 2, airportName: 'LAX', numberOfGates: 8 },
        ];
        const { getByText } = render(<Charts reportData={reportData} selectedReport="getAllAirports" />);
        expect(getByText('Data Visualization')).toBeInTheDocument();
        expect(getByText('Bar Chart')).toBeInTheDocument();
    });
});