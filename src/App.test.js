import { render, screen } from '@testing-library/react';
import App from './App';


//test components/NavBar.js
test('renders NavBar', () => {
  render(<NavBar />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
  });

//test components/TicketCard.js
test('renders TicketCard', () => {
  render(<TicketCard />);
  const linkElement = screen.getByText(/ticket/i);
  expect(linkElement).toBeInTheDocument();
  });

//test components in components/login.js
test('renders login', () => {
  render(<Login />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
  });

//test individual components in pages/portal/landlordportal.js
test('renders landlordportal', () => {
  render(<LandlordPortal />);
  const linkElement = screen.getByText(/landlordportal/i);
  expect(linkElement).toBeInTheDocument();
  });

//test individual components in pages/portal/tenantportal.js
test('renders tenantportal', () => {

  render(<TenantPortal />);
  const linkElement = screen.getByText(/tenantportal/i);
  expect(linkElement).toBeInTheDocument();
  });

//test
