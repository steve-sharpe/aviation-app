import { render, screen } from '@testing-library/react';
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders Aviation Reports header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Aviation Reports/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders All Airports button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/All Airports/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Airport by ID button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Airport by ID/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Airport by Code button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Airport by Code/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Airport by City button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Airport by City/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders All Flights button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/All Flights/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Flight by ID button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Flight by ID/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders All Passengers button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/All Passengers/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Passenger by ID button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Passenger by ID/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Passengers by Flight Number button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Passengers by Flight Number/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders All Aircraft button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/All Aircraft/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Aircraft by ID button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Aircraft by ID/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders All Airlines button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/All Airlines/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Airline by Code button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Airline by Code/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Gates by Airport ID button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Gates by Airport ID/i);
  expect(buttonElement).toBeInTheDocument();
});

test('clicking All Airports button fetches data', async () => {
  render(<App />);
  const buttonElement = screen.getByText(/All Airports/i);
  fireEvent.click(buttonElement);
  const loadingElement = screen.getByText(/Loading/i);
  expect(loadingElement).toBeInTheDocument();
});

