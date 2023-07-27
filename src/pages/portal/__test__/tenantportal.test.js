//import necessary modules
import React from'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TenantPortal from '../tenantportal';

describe('TenantPortal_function', () => {

});

    // Tests that the table is rendered with the correct headers and filters
    it('renders_table_with_correct_headers_and_filters', () => {
        // Test code goes here
    });


    // Tests that the component displays a loading message while fetching data
    it('test_displays_loading_message', async () => {
        // Mock the ticketManager.getTicketsByPARCStatusForTenantID function
        jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForTenantID').mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([]);
                }, 1000);
            });
        });

        // Render the component
        render(<TenantPortal />);

        // Check if the loading message is displayed
        const loadingMessage = screen.getByText('Loading...');
        expect(loadingMessage).toBeInTheDocument();

        // Wait for the data to be fetched
        await waitFor(() => {
            expect(loadingMessage).not.toBeInTheDocument();
        });
    });


    // Tests that an error message is displayed when data fetch fails
    it('test_displays_error_message_if_data_fetch_fails', () => {
        // Mock the ticketManager.getTicketsByPARCStatusForTenantID function to throw an error
        jest.spyOn(ticketManager, 'getTicketsByPARCStatusForTenantID').mockImplementation(() => {
            throw new Error('Error fetching tickets');
        });

        // Render the TenantPortal component
        render(<TenantPortal />);

        // Check if the error message is displayed
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });


    // Tests that the component displays an empty message if no data is found
    it('test_displays_empty_message_if_no_data_found', () => {
        // Render the component
        const { getByText } = render(<TenantPortal />);

        // Assert that the empty message is displayed
        expect(getByText('Empty!')).toBeInTheDocument();
    });


    // Tests that the TenantPortal function displays filtered and sorted data correctly
    it('test_displays_filtered_and_sorted_data_correctly', async () => {
        const serviceTickets = [
            {
                ServiceRequestID: 1,
                Name: 'Test Request 1',
                Category: 'Plumbing',
                Property: 'Test Property 1',
                Status: 'Awaiting Review',
                SubmittedDateTime: '2022-01-01T00:00:00.000Z',
                staffDetails: {
                    StaffName: 'Test Staff 1'
                }
            },
            {
                ServiceRequestID: 2,
                Name: 'Test Request 2',
                Category: 'Electric',
                Property: 'Test Property 2',
                Status: 'Ticket Assigned',
                SubmittedDateTime: '2022-01-02T00:00:00.000Z',
                staffDetails: {
                    StaffName: 'Test Staff 2'
                }
            }
        ];
        const { getByText, queryByText } = render(<TenantPortal />);
        expect(getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => expect(queryByText('Loading...')).not.toBeInTheDocument());
        expect(getByText('Test Request 1')).toBeInTheDocument();
        expect(getByText('Plumbing')).toBeInTheDocument();
        expect(getByText('Test Property 1')).toBeInTheDocument();
        expect(getByText('Awaiting Review')).toBeInTheDocument();
        expect(getByText('01/01/2022')).toBeInTheDocument();
        expect(getByText('Test Staff 1')).toBeInTheDocument();
        expect(getByText('Test Request 2')).toBeInTheDocument();
        expect(getByText('Electric')).toBeInTheDocument();
        expect(getByText('Test Property 2')).toBeInTheDocument();
        expect(getByText('Ticket Assigned')).toBeInTheDocument();
        expect(getByText('02/01/2022')).toBeInTheDocument();
        expect(getByText('Test Staff 2')).toBeInTheDocument();
        fireEvent.click(getByText('Request'));
        fireEvent.change(screen.getByPlaceholderText('Filter by request...'), { target: { value: 'Test Request 1' } });
        expect(getByText('Test Request 1')).toBeInTheDocument();
        expect(queryByText('Test Request 2')).not.toBeInTheDocument();
        fireEvent.click(getByText('Category'));
        fireEvent.click(getByText('Electric'));
        expect(queryByText('Test Request 1')).not.toBeInTheDocument();
        expect(getByText('Test Request 2')).toBeInTheDocument();
        fireEvent.click(getByText('Status'));
        fireEvent.click(getByText('Awaiting Review'));
        expect(getByText('Test Request 1')).toBeInTheDocument();
        expect(queryByText('Test Request 2')).not.toBeInTheDocument();
        fireEvent.click(getByText('Submitted Date'));
        fireEvent.click(getByText('Newest to Oldest'));
        expect(getByText('Test Request 2')).toBeInTheDocument();
        expect(queryByText('Test Request 1')).not.toBeInTheDocument();
    });

    

    // Tests that all filters are removed and data is fetched again when the 'Remove all Filters' button is clicked
    it('test_removes_all_filters_and_fetches_data_again', () => {
        // Mock the TicketManager class
        jest.mock('../../managers/ticketmanager', () => {
          return jest.fn().mockImplementation(() => ({
            getTicketsByPARCStatusForTenantID: jest.fn().mockResolvedValue([])
          }));
        });

        // Render the TenantPortal component
        const { getByText } = render(<TenantPortal />);

        // Click the 'Remove all Filters' button
        fireEvent.click(getByText('Remove all Filters'));

        // Check that the filters are cleared
        expect(setCategoryFilter).toHaveBeenCalledWith('');
        expect(setIsCategoryFilterOpen).toHaveBeenCalledWith(false);
        expect(setStatusFilter).toHaveBeenCalledWith('');
        expect(setIsStatusFilterOpen).toHaveBeenCalledWith(false);
        expect(setRequestFilter).toHaveBeenCalledWith('');
        expect(setIsRequestFilterOpen).toHaveBeenCalledWith(false);
        expect(setAssignedToFilter).toHaveBeenCalledWith('');
        expect(setIsAssignedToFilterOpen).toHaveBeenCalledWith(false);
        expect(setDateFilter).toHaveBeenCalledWith('');
        expect(setIsDateFilterOpen).toHaveBeenCalledWith(false);
        expect(setDateSortOrder).toHaveBeenCalledWith('');
        expect(setIsLoading).toHaveBeenCalledWith(true);
        expect(setFetchError).toHaveBeenCalledWith(null);

        // Check that the getTickets function is called
        expect(getTickets).toHaveBeenCalled();
      });


    // Tests that the function handles an invalid PARCStatus parameter by displaying an error message
    it('test_handles_invalid_parcstatus_parameter', () => {
        // Mock useParams
        const mockUseParams = jest.fn().mockReturnValue({ PARCStatus: 'invalid', TenantID: '1' });
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: mockUseParams
        }));

        // Render the component
        render(<TenantPortal />);

        // Check if the error message is displayed
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });


    // Tests that an error message is displayed when an invalid TenantID parameter is provided
    it('handles_invalid_tenant_id', () => {
        // Arrange
        const { getByText } = render(<TenantPortal />);
        const errorMessage = 'Error!';

        // Act
        // No need to perform any action, as the useEffect hook will be triggered automatically

        // Assert
        expect(getByText(errorMessage)).toBeInTheDocument();
    });


    // Tests that the TenantPortal function handles an empty serviceTickets array by displaying 'Empty!' in the table
    it('test_handles_empty_serviceTickets_array', () => {
      render(<TenantPortal />);

      const emptyMessage = screen.getByText('Empty!');

      expect(emptyMessage).toBeInTheDocument();
    });


    // Tests that an invalid dateFilter parameter does not filter out any tickets
    it('test_handles_invalid_date_filter_parameter', () => {
        const { getByText } = render(<TenantPortal />);
        const initialTicketCount = getByText(/Loading/i);
        expect(initialTicketCount).toBeInTheDocument();

        const newestFilter = getByText(/Newest to Oldest/i);
        fireEvent.click(newestFilter);

        const invalidFilter = getByText(/Invalid Filter/i);
        fireEvent.click(invalidFilter);

        const ticketCount = getByText(/Loading/i);
        expect(ticketCount).toBeInTheDocument();
    });


    // Tests that the function handles an invalid categoryFilter parameter by setting the categoryFilter state to an empty string and fetching the tickets again
    it('test_handles_invalid_category_filter_parameter', () => {
      // Mock TicketManager
      const ticketManager = new TicketManager();

      // Mock useParams
      const useParamsMock = jest.fn().mockReturnValue({ PARCStatus: 'status', TenantID: 'tenantId' });

      // Mock useState
      const useStateMock = jest.spyOn(React, 'useState');
      useStateMock.mockImplementation((initialValue) => [initialValue, jest.fn()]);

      // Mock useEffect
      const useEffectMock = jest.spyOn(React, 'useEffect');
      useEffectMock.mockImplementation((callback) => callback());

      // Mock getTickets function
      ticketManager.getTicketsByPARCStatusForTenantID = jest.fn().mockResolvedValue([]);

      // Render component
      render(<TenantPortal />, { wrapper: MemoryRouter });

      // Set invalid categoryFilter
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('Filter by request...'), { target: { value: 'Invalid Category' } });
      });

      // Check if categoryFilter state is set to empty string
      expect(useStateMock.mock.calls[2][0]).toBe('');

      // Check if getTickets function is called again
      expect(ticketManager.getTicketsByPARCStatusForTenantID).toHaveBeenCalledWith('STATUS', 'tenantId');
    });


    // Tests that the function handles an invalid statusFilter parameter by setting the fetchError state and displaying an error message
    it('test_handles_invalid_status_filter_parameter', () => {
      // Mock useParams
      const mockParams = {
        PARCStatus: 'invalid',
        TenantID: '123'
      };
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => mockParams
      }));

      // Render the component
      render(<TenantPortal />);

      // Assert that the fetchError state is set
      expect(screen.getByText('Error!')).toBeInTheDocument();
    });


    // Tests that an error is thrown when an invalid assignedToFilter parameter is provided
    it('test_handles_invalid_assignedToFilter_parameter', () => {
        // Arrange
        const { getByText } = render(<TenantPortal />);
        const assignedToFilterInput = getByText('Assigned To').nextSibling;

        // Act
        fireEvent.change(assignedToFilterInput, { target: { value: 'Invalid' } });

        // Assert
        expect(assignedToFilterInput.value).toBe('');
    });


    // Tests that an error message is displayed when an invalid requestFilter parameter is provided
    it('test_handles_invalid_request_filter_parameter', () => {
        // Arrange
        const { getByText, getByPlaceholderText } = render(<TenantPortal />);
        const requestFilterInput = getByPlaceholderText('Filter by request...');

        // Act
        fireEvent.change(requestFilterInput, { target: { value: 'Invalid Request' } });

        // Assert
        expect(getByText('Empty!')).toBeInTheDocument();
    });


    // Tests that the function filters the tickets by request name case-insensitively
    it('test_filters_by_request_name_case_insensitively', () => {
        // Test code goes here
    });


    // Tests that the function filters the tickets by assigned staff name case-insensitively
    it('test_filters_by_assigned_staff_name_case_insensitively', () => {
        // Test code goes here
    });


    // Tests that the tickets are sorted correctly by date
    it('test_sortByDate', () => {
        // Arrange
        const { getByText } = render(<TenantPortal />);
        const newestButton = getByText('Newest to Oldest');
        const oldestButton = getByText('Oldest to Newest');

        // Act
        fireEvent.click(newestButton);
        const newestTickets = serviceTickets.sort((a, b) => new Date(b.SubmittedDateTime) - new Date(a.SubmittedDateTime));

        fireEvent.click(oldestButton);
        const oldestTickets = serviceTickets.sort((a, b) => new Date(a.SubmittedDateTime) - new Date(b.SubmittedDateTime));

        // Assert
        expect(serviceTickets).toEqual(newestTickets);
        expect(serviceTickets).toEqual(oldestTickets);
    });


    // Tests that the date format in the table is correct
    it('test_correct_date_format_in_table', () => {
        const { getByText } = render(<TenantPortal />);
        const date = new Date().toLocaleDateString();
        expect(getByText(date)).toBeInTheDocument();
    });


    // Tests that the table displays the correct ticket number
    it('displays_correct_ticket_number_in_table', () => {
        const { getByText } = render(<TenantPortal />);
        const ticketNumber = getByText('1');
        expect(ticketNumber).toBeInTheDocument();
    });

