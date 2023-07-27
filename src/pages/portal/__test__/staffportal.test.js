//import necessary modules
import React from'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StaffPortal from '../staffportal';

describe('StaffPortal_function', () => {

});

    // Tests that the table is rendered with the correct headers
    it('renders_table_with_correct_headers', () => {
        render(<StaffPortal />);
        const ticketIdHeader = screen.getByText('Ticket ID');
        const requestHeader = screen.getByText('Request');
        const categoryHeader = screen.getByText('Category');
        const unitHeader = screen.getByText('Unit');
        const statusHeader = screen.getByText('Status');
        const submittedByHeader = screen.getByText('Submitted By');
        const submittedDateHeader = screen.getByText('Submitted Date');

        expect(ticketIdHeader).toBeInTheDocument();
        expect(requestHeader).toBeInTheDocument();
        expect(categoryHeader).toBeInTheDocument();
        expect(unitHeader).toBeInTheDocument();
        expect(statusHeader).toBeInTheDocument();
        expect(submittedByHeader).toBeInTheDocument();
        expect(submittedDateHeader).toBeInTheDocument();
    });


    // Tests that the loading message is displayed when isLoading is true
    it('displays_loading_message_when_isLoading_is_true', () => {
        // Arrange
        const { getByText } = render(<StaffPortal />);
        const loadingMessage = getByText('Loading...');

        // Assert
        expect(loadingMessage).toBeInTheDocument();
    });


    // Tests that an error message is displayed when fetchError is not null
    it('test_displays_error_message', () => {
        // Mock the useState hook
        jest.spyOn(React, 'useState').mockImplementation((initialValue) => [initialValue, jest.fn()]);

        // Render the component
        const { getByText } = render(<StaffPortal />);

        // Set the fetchError state to a non-null value
        act(() => {
            useState.mockReturnValueOnce(['Error!', jest.fn()]);
        });

        // Check if the error message is displayed
        expect(getByText('Error!')).toBeInTheDocument();
    });


    // Tests that the 'StaffPortal' function displays an 'Empty!' message when the 'filteredTickets' array is empty.
    it('displays_empty_message_when_filtered_tickets_is_empty', () => {
        const { getByText } = render(<StaffPortal />);
        const emptyMessage = getByText('Empty!');
        expect(emptyMessage).toBeInTheDocument();
    });


    // Tests that the table displays the correct number of rows when filteredTickets is not empty
    it('test_correct_number_of_rows', () => {
        // Arrange
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID').mockResolvedValue([{ ServiceRequestID: 1 }, { ServiceRequestID: 2 }, { ServiceRequestID: 3 }]);
        render(<StaffPortal />);

        // Act
        const rows = screen.getAllByRole('row');

        // Assert
        expect(rows.length).toBe(4); // Including the header row

        // Clean up
        ticketManagerMock.mockRestore();
    });


    // Tests that the function filters the tickets correctly based on the given filters
    it('filters_tickets_correctly', () => {
        const { getByText, getByPlaceholderText } = render(<StaffPortal />);

        // Set filters
        fireEvent.change(getByPlaceholderText('Filter by request...'), { target: { value: 'pest' } });
        fireEvent.change(getByTestId('category-filter'), { target: { value: 'Electric' } });
        fireEvent.change(getByTestId('status-filter'), { target: { value: 'Works Ended' } });
        fireEvent.change(getByPlaceholderText('Filter by unit...'), { target: { value: 'unit 1' } });
        fireEvent.change(getByPlaceholderText('Filter by submitted...'), { target: { value: 'john' } });
        fireEvent.change(getByTestId('date-filter'), { target: { value: 'newest' } });

        // Check that correct tickets are displayed
        expect(getByText('Electric')).toBeInTheDocument();
        expect(getByText('Works Ended')).toBeInTheDocument();
        expect(getByText('pest control')).toBeInTheDocument();
        expect(getByText('unit 1')).toBeInTheDocument();
        expect(getByText('John Doe')).toBeInTheDocument();
    });


    // Tests that the tickets are sorted correctly based on the dateSortOrder
    it('sorts_tickets_based_on_dateSortOrder', () => {
      // Arrange
      const ticketManager = new TicketManager();
      const serviceTickets = [
        {
          ServiceRequestID: 1,
          SubmittedDateTime: '2021-10-01T10:00:00Z'
        },
        {
          ServiceRequestID: 2,
          SubmittedDateTime: '2021-10-02T10:00:00Z'
        },
        {
          ServiceRequestID: 3,
          SubmittedDateTime: '2021-10-03T10:00:00Z'
        }
      ];
      const setServiceTickets = jest.fn();

      // Act
      const component = render(
        <StaffPortal />
      );

      // Assert
      expect(setServiceTickets).toHaveBeenCalledWith([
        {
          ServiceRequestID: 3,
          SubmittedDateTime: '2021-10-03T10:00:00Z'
        },
        {
          ServiceRequestID: 2,
          SubmittedDateTime: '2021-10-02T10:00:00Z'
        },
        {
          ServiceRequestID: 1,
          SubmittedDateTime: '2021-10-01T10:00:00Z'
        }
      ]);
    });


    // Tests that the StaffPortal function handles the case when the data is undefined or null
    it('test_handles_undefined_or_null_data', () => {
        // Mock the ticketManager.getTicketsByPARCStatusForStaffID function to return undefined
        jest.spyOn(ticketManager, 'getTicketsByPARCStatusForStaffID').mockResolvedValue(undefined);

        // Render the StaffPortal component
        render(<StaffPortal />);

        // Assert that the loading message is displayed
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Restore the original implementation of getTicketsByPARCStatusForStaffID
        ticketManager.getTicketsByPARCStatusForStaffID.mockRestore();
    });


    // Tests that the StaffPortal function handles the case when the data is false
    it('test_handles_case_when_data_is_false', () => {
        // Mock the TicketManager class
        jest.mock('../../managers/ticketmanager');
        const TicketManager = require('../../../managers/ticketmanager').default;

        // Mock the getTicketsByPARCStatusForStaffID method to return false
        TicketManager.prototype.getTicketsByPARCStatusForStaffID = jest.fn().mockResolvedValue(false);

        // Render the StaffPortal component
        const { getByText } = render(<StaffPortal />);

        // Assert that the loading message is not displayed
        expect(getByText('Loading...')).not.toBeInTheDocument();

        // Assert that the error message is displayed
        expect(getByText('Error!')).toBeInTheDocument();
    });


    // Tests that an error is handled properly when thrown in getTickets function
    it('handles_error_in_getTickets_function', async () => {
        const mockTicketManager = {
            getTicketsByPARCStatusForStaffID: jest.fn().mockRejectedValue(new Error('Error!'))
        };
        const { getByText } = render(<StaffPortal ticketManager={mockTicketManager} PARCStatus='status' StaffID='1' />);
        await waitFor(() => expect(mockTicketManager.getTicketsByPARCStatusForStaffID).toHaveBeenCalledTimes(1));
        expect(getByText('Error!')).toBeInTheDocument();
    });


    // Tests that the StaffPortal function handles the case when the dateFilter is not one of the expected values
    it('test_handles_case_when_dateFilter_not_expected_values', () => {
        // Test code
    });


    // Tests that the function filters out tickets when categoryFilter is not one of the expected values
    it('test_category_filter_unexpected_value', () => {
        const { getByText } = render(<StaffPortal />);
        const categoryFilterInput = getByText('Category').nextSibling.firstChild;
        fireEvent.change(categoryFilterInput, { target: { value: 'unexpected value' } });
        expect(getByText('Empty!')).toBeInTheDocument();
    });


    // Tests that the function handles unexpected statusFilter values by returning an empty array
    it('test_handles_unexpected_status_filter', () => {
        const { getByText } = render(<StaffPortal />);
        const statusFilter = 'unexpected';
        const expectedText = 'Empty!';
        const statusFilterOption = getByText('Status').nextSibling;
        fireEvent.change(statusFilterOption, { target: { value: statusFilter } });
        expect(getByText(expectedText)).toBeInTheDocument();
    });


    // Tests that the getTickets function is called when the component mounts
    it('calls_getTickets_on_component_mount', () => {
        const getTickets = jest.fn();
        jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID').mockImplementation(() => Promise.resolve([]));
        jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID').mockReturnValueOnce(Promise.resolve([]));
        render(<StaffPortal />, { wrapper: MemoryRouter });
        expect(getTickets).toHaveBeenCalled();
    });


    // Tests that all filters are reset when the removeFilters function is called
    it('test_resets_all_filters', () => {
        // Arrange
        const { getByText, getByPlaceholderText } = render(<StaffPortal />);
        const requestFilterInput = getByPlaceholderText('Filter by request...');
        const categoryFilterSelect = getByText('Category');
        const statusFilterSelect = getByText('Status');
        const unitFilterInput = getByPlaceholderText('Filter by unit...');
        const submittedByFilterInput = getByPlaceholderText('Filter by submitted...');
        const dateFilterSelect = getByText('Sort according to Date Submitted');

        // Act
        fireEvent.change(requestFilterInput, { target: { value: 'Test Request' } });
        fireEvent.change(categoryFilterSelect, { target: { value: 'Plumbing' } });
        fireEvent.change(statusFilterSelect, { target: { value: 'Ticket Assigned' } });
        fireEvent.change(unitFilterInput, { target: { value: 'Test Unit' } });
        fireEvent.change(submittedByFilterInput, { target: { value: 'Test User' } });
        fireEvent.change(dateFilterSelect, { target: { value: 'newest' } });

        fireEvent.click(getByText('Remove all Filters'));

        // Assert
        expect(requestFilterInput.value).toBe('');
        expect(categoryFilterSelect.value).toBe('');
        expect(statusFilterSelect.value).toBe('');
        expect(unitFilterInput.value).toBe('');
        expect(submittedByFilterInput.value).toBe('');
        expect(dateFilterSelect.value).toBe('');
    });


    // Tests that the function displays the correct view ticket route
    it('displays_correct_view_ticket_route', () => {
        // Test code goes here
    });


    // Tests that tickets are filtered based on the date range when the dateFilter is set to 'newest' or 'oldest'
    it('test_filters_tickets_by_date_range', () => {
        // Test code goes here
    });


    // Tests that the correct submitted by name is displayed when tenantDetails is not null
    it('test_correct_submitted_by_name', () => {
        // Mock data
        const ticketManager = new TicketManager();
        const mockTicket = {
          ServiceRequestID: 1,
          Name: 'Test Ticket',
          Category: 'Plumbing',
          Property: 'Unit 101',
          Status: 'Awaiting Review',
          SubmittedDateTime: '2022-01-01T00:00:00.000Z',
          tenantDetails: {
            TenantName: 'John Doe'
          }
        };
        jest.spyOn(ticketManager, 'getTicketsByPARCStatusForStaffID').mockResolvedValue([mockTicket]);

        // Render component
        render(<StaffPortal />);

        // Assert
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });


    // Tests that the date format in the table is correct
    it('test_correct_date_format', () => {
        // Render the StaffPortal component
        const { getByText } = render(<StaffPortal />);

        // Get the table cell containing the date
        const dateCell = getByText('2022-01-01');

        // Assert that the date is displayed in the correct format
        expect(dateCell).toBeInTheDocument();
    });


    // Tests that the table displays the correct ticket ID, request, category, unit, status, and submitted date
    it('displays_correct_ticket_info', () => {
        const { getByText } = render(<StaffPortal />);
        const ticketID = getByText(/Ticket ID/i);
        const request = getByText(/Request/i);
        const category = getByText(/Category/i);
        const unit = getByText(/Unit/i);
        const status = getByText(/Status/i);
        const submittedDate = getByText(/Submitted Date/i);

        expect(ticketID).toBeInTheDocument();
        expect(request).toBeInTheDocument();
        expect(category).toBeInTheDocument();
        expect(unit).toBeInTheDocument();
        expect(status).toBeInTheDocument();
        expect(submittedDate).toBeInTheDocument();
    });

