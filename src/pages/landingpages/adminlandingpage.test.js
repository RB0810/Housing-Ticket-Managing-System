import React from 'react';
import '../../styles/adminlandingpage.css';
import { render, fireEvent } from '@testing-library/react';
import AdminLandingPage from '../../components/adminlandingpage/AdminLandingPage';

describe('AdminLandingPage_function', () => {

    // Tests that clicking on 'Manage Accounts' button navigates to the correct page with the correct AdminID parameter
    it('test_manage_accounts_button_click', () => {
        // Mock the useNavigate hook
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Simulate button click
        fireEvent.click(getByText('Manage Accounts'));

        // Check if navigate was called with the correct path and AdminID parameter
        expect(mockNavigate).toHaveBeenCalledWith('/adminportal/manageacc/123');
    });

    // Tests that clicking on 'Create Landlord Account (Building Supervisor)' button navigates to the correct page with the correct AdminID parameter
    it('test_create_landlord_account_supervisor_button_click', () => {
        // Mock the useNavigate hook
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Simulate button click
        fireEvent.click(getByText('Create Landlord Account (Building Supervisor)'));

        // Check if navigate was called with the correct path and AdminID parameter
        expect(mockNavigate).toHaveBeenCalledWith('/adminportal/createsupervisoracc/123');
    });

    // Tests that clicking on 'Create Landlord Account (Staff/Engineers)' button navigates to the correct page with the correct AdminID parameter
    it('test_create_landlord_account_staff_engineers_button_click', () => {
        // Mock the useNavigate hook
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Simulate button click
        fireEvent.click(getByText('Create Landlord Account (Staff/Engineers)'));

        // Check if navigate was called with the correct path and AdminID parameter
        expect(mockNavigate).toHaveBeenCalledWith('/adminportal/createstaffacc/123');
    });

    // Tests that the function handles the case where the AdminID parameter is missing
    it('test_missing_admin_id_parameter', () => {
        // Mock the useParams hook
        const mockUseParams = jest.fn().mockReturnValue({});
        jest.mock('react-router-dom', () => ({
            useNavigate: () => jest.fn(),
            useParams: mockUseParams
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Check if the buttons are rendered
        expect(getByText('Manage Accounts')).toBeInTheDocument();
        expect(getByText('Create Landlord Account (Building Supervisor)')).toBeInTheDocument();
        expect(getByText('Create Landlord Account (Staff/Engineers)')).toBeInTheDocument();
    });

    // Tests that the function handles the case where the AdminID parameter is not a number
    it('test_non_numeric_admin_id_parameter', () => {
        // Mock the useParams hook
        const mockUseParams = jest.fn().mockReturnValue({ AdminID: 'abc' });
        jest.mock('react-router-dom', () => ({
            useNavigate: () => jest.fn(),
            useParams: mockUseParams
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Check if the buttons are rendered
        expect(getByText('Manage Accounts')).toBeInTheDocument();
        expect(getByText('Create Landlord Account (Building Supervisor)')).toBeInTheDocument();
        expect(getByText('Create Landlord Account (Staff/Engineers)')).toBeInTheDocument();
    });

    // Tests that the function handles the case where the useNavigate hook throws an error
    it('test_use_navigate_hook_error', () => {
        // Mock the useNavigate hook to throw an error
        const mockNavigate = jest.fn().mockImplementation(() => {
            throw new Error('useNavigate error');
        });
        jest.mock('react-router-dom', () => ({
            useNavigate: mockNavigate,
            useParams: jest.fn()
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Check if the buttons are rendered
        expect(getByText('Manage Accounts')).toBeInTheDocument();
        expect(getByText('Create Landlord Account (Building Supervisor)')).toBeInTheDocument();
        expect(getByText('Create Landlord Account (Staff/Engineers)')).toBeInTheDocument();
    });

    // Tests that the 'Manage Accounts' button is disabled when there are no accounts to manage
    it('test_manage_accounts_button_disabled', () => {
        // Mock the navigate function
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Assert that the 'Manage Accounts' button is disabled
        const manageButton = getByText('Manage Accounts');
        expect(manageButton).toBeDisabled();

        // Assert that the navigate function is not called when the button is clicked
        fireEvent.click(manageButton);
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    // Tests that the 'Create Landlord Account (Building Supervisor)' button is disabled when the maximum number of supervisor accounts has been reached
    it('test_create_landlord_account_disabled', () => {
        // Mock the useParams hook
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: jest.fn().mockReturnValue({ AdminID: 'admin123' })
        }));

        // Mock the useNavigate hook
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: jest.fn().mockReturnValue(mockNavigate)
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Assert that the button is disabled
        const createButton = getByText('Create Landlord Account (Building Supervisor)');
        expect(createButton).toBeDisabled();

        // Assert that the button click does not navigate
        fireEvent.click(createButton);
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    // Tests that the 'Create Landlord Account (Staff/Engineers)' button is disabled when the maximum number of staff/engineer accounts has been reached
    it('test_create_landlord_account_disabled', () => {
      // Mock the maximum number of staff/engineer accounts reached
      const maxAccountsReached = true;

      // Render the component
      const { getByText } = render(<AdminLandingPage />);

      // Get the button element
      const createButton = getByText('Create Landlord Account (Staff/Engineers)');

      // Check if the button is disabled
      expect(createButton).toBeDisabled();
    });

    // Tests that the 'Create Landlord Account (Building Supervisor)' button is hidden when the user is not authorized to create supervisor accounts
    it('test_create_landlord_account_hidden', () => {
        // Mock the useParams hook
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: jest.fn().mockReturnValue({ AdminID: 'admin123' })
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Assert that the button is hidden
        expect(getByText('Create Landlord Account (Building Supervisor)')).not.toBeVisible();
    });

    // Tests that the 'Create Landlord Account (Staff/Engineers)' button is hidden when the user is not authorized
    it('test_create_landlord_account_hidden', () => {
        // Mock the useParams hook
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: jest.fn().mockReturnValue({ AdminID: 'admin123' })
        }));

        // Render the component
        const { getByText } = render(<AdminLandingPage />);

        // Assert that the button is hidden
        expect(getByText('Create Landlord Account (Staff/Engineers)')).not.toBeVisible();
    });
});
