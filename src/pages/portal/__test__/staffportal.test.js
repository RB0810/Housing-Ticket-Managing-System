//import necessary ,odules
import React from'react';
import { shallow, render } from 'enzyme';
import { TicketManager } from '../src/TicketManager';
import { TicketManager as TicketManagerClass } from '../src/TicketManager';

describe('StaffPortal_function', () => {

    // Tests that the table is rendered with the correct headers
    it('renders_table_with_correct_headers', () => {
        // Test code
    });


    // Tests that the loading message is displayed when isLoading is true
    it('test_displays_loading_message', () => {
        const wrapper = shallow(<StaffPortal />);
        wrapper.setState({ isLoading: true });
        expect(wrapper.find('.text-center').text()).toEqual('Loading...');
    });


    // Tests that an error message is displayed when fetchError is not null
    it('test_displays_error_message', () => {
        const wrapper = shallow(<StaffPortal />);
        wrapper.setState({ fetchError: 'Error!' });
        expect(wrapper.find('.text-center').text()).toEqual('Error!');
    });


    // Tests that the 'StaffPortal' function displays an empty message when the 'filteredTickets' array is empty
    it('test_displays_empty_message_when_filteredTickets_is_empty', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID');
        ticketManagerMock.mockResolvedValue([]);

        const wrapper = shallow(<StaffPortal />);
        expect(wrapper.find('.text-center').text()).toEqual('Empty!');

        ticketManagerMock.mockRestore();
    });


    // Tests that the StaffPortal function displays filtered tickets when data is available
    it('test_displays_filtered_tickets', () => {
        // Mock the TicketManager class
        const mockTicketManager = jest.fn();
        mockTicketManager.getTicketsByPARCStatusForStaffID = jest.fn().mockResolvedValue([{ ServiceRequestID: 1, Name: 'Ticket 1', Category: 'Plumbing', Property: 'Unit 101', Status: 'Awaiting Review', tenantDetails: { TenantName: 'John Doe' }, SubmittedDateTime: '2022-01-01T00:00:00.000Z' }]);

        // Render the StaffPortal component with the mocked TicketManager
        const { getByText } = render(<StaffPortal />, { wrapper: ({ children }) => <TicketManagerContext.Provider value={mockTicketManager}>{children}</TicketManagerContext.Provider> });

        // Assert that the filtered ticket is displayed
        expect(getByText('Ticket 1')).toBeInTheDocument();
    });


    // Tests that tickets are filtered correctly by category
    it('test_filters_tickets_by_category', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID');
        ticketManagerMock.mockResolvedValue([
            {
                ServiceRequestID: 1,
                Category: 'Plumbing'
            },
            {
                ServiceRequestID: 2,
                Category: 'Electric'
            },
            {
                ServiceRequestID: 3,
                Category: 'Plumbing'
            }
        ]);

        const wrapper = shallow(<StaffPortal />);

        // Set the category filter
        wrapper.find('.filter-dropdown select').simulate('change', { target: { value: 'Plumbing' } });

        // Check if the filtered tickets are correct
        expect(wrapper.find('.table-row')).toHaveLength(2);
        expect(wrapper.find('.table-row').at(0).key()).toEqual('1');
        expect(wrapper.find('.table-row').at(1).key()).toEqual('3');

        ticketManagerMock.mockRestore();
    });


    // Tests that the function filters tickets by status
    it('test_filters_tickets_by_status', () => {
        // Mock the ticketManager
        const ticketManager = new TicketManager();
        ticketManager.getTicketsByPARCStatusForStaffID = jest.fn().mockResolvedValue([
            { ServiceRequestID: 1, Status: 'Ticket Assigned' },
            { ServiceRequestID: 2, Status: 'Quotation Uploaded' },
            { ServiceRequestID: 3, Status: 'Works Started' }
        ]);

        // Render the component
        const { getByText } = render(<StaffPortal />);

        // Assert that the tickets are filtered correctly
        expect(getByText('Ticket Assigned')).toBeInTheDocument();
        expect(getByText('Quotation Uploaded')).toBeInTheDocument();
        expect(getByText('Works Started')).toBeInTheDocument();
    });


    // Tests that the function filters tickets by request
    it('test_filters_tickets_by_request', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID');
        ticketManagerMock.mockResolvedValue([{ ServiceRequestID: 1, Name: 'Request 1' }, { ServiceRequestID: 2, Name: 'Request 2' }]);

        const wrapper = shallow(<StaffPortal />);

        wrapper.find('input').simulate('change', { target: { value: 'Request 1' } });

        expect(wrapper.state('serviceTickets')).toEqual([{ ServiceRequestID: 1, Name: 'Request 1' }]);
        expect(wrapper.state('fetchError')).toBeNull();
        expect(wrapper.state('isLoading')).toBeFalsy();

        ticketManagerMock.mockRestore();
    });


    // Tests that the function filters tickets by unit
    it('test_filters_tickets_by_unit', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID');
        ticketManagerMock.mockResolvedValue([
            {
                ServiceRequestID: 1,
                Name: 'Ticket 1',
                Category: 'Plumbing',
                Property: 'Unit 1',
                Status: 'Awaiting Review',
                tenantDetails: {
                    TenantName: 'John Doe'
                },
                SubmittedDateTime: '2022-01-01T00:00:00.000Z'
            },
            {
                ServiceRequestID: 2,
                Name: 'Ticket 2',
                Category: 'Electric',
                Property: 'Unit 2',
                Status: 'Ticket Assigned',
                tenantDetails: {
                    TenantName: 'Jane Smith'
                },
                SubmittedDateTime: '2022-01-02T00:00:00.000Z'
            }
        ]);

        const wrapper = shallow(<StaffPortal />);
        wrapper.find('input').simulate('change', { target: { value: 'Unit 1' } });

        expect(wrapper.find('tbody tr')).toHaveLength(1);
        expect(wrapper.find('tbody tr td').at(3).text()).toEqual('Unit 1');
    });


    // Tests that the function filters tickets by submitted by
    it('test_filters_tickets_by_submitted_by', () => {
        const { getByPlaceholderText, getByText } = render(<StaffPortal />);
        const input = getByPlaceholderText('Filter by submitted...');
        fireEvent.change(input, { target: { value: 'john' } });
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('Jane Doe')).not.toBeInTheDocument();
    });


    // Tests that the tickets are sorted by newest date
    it('test_sortTicketsByNewestDate', () => {
        const mockTickets = [
          {
            ServiceRequestID: 1,
            SubmittedDateTime: '2022-01-01',
          },
          {
            ServiceRequestID: 2,
            SubmittedDateTime: '2022-01-03',
          },
          {
            ServiceRequestID: 3,
            SubmittedDateTime: '2022-01-02',
          },
        ];

        const mockTicketManager = {
          getTicketsByPARCStatusForStaffID: jest.fn().mockResolvedValue(mockTickets),
        };

        const wrapper = shallow(<StaffPortal ticketManager={mockTicketManager} />);

        expect(wrapper.state('serviceTickets')).toEqual([
          {
            ServiceRequestID: 2,
            SubmittedDateTime: '2022-01-03',
          },
          {
            ServiceRequestID: 3,
            SubmittedDateTime: '2022-01-02',
          },
          {
            ServiceRequestID: 1,
            SubmittedDateTime: '2022-01-01',
          },
        ]);
      });


    // Tests that the tickets are sorted by oldest date
    it('test_sortTicketsByOldestDate', () => {
        const mockTicketManager = new TicketManager();
        const mockTickets = [
            { ServiceRequestID: 1, SubmittedDateTime: '2022-01-01' },
            { ServiceRequestID: 2, SubmittedDateTime: '2022-01-03' },
            { ServiceRequestID: 3, SubmittedDateTime: '2022-01-02' }
        ];
        jest.spyOn(mockTicketManager, 'getTicketsByPARCStatusForStaffID').mockResolvedValue(mockTickets);

        const wrapper = shallow(<StaffPortal />);
        const expectedSortedTickets = [
            { ServiceRequestID: 1, SubmittedDateTime: '2022-01-01' },
            { ServiceRequestID: 3, SubmittedDateTime: '2022-01-02' },
            { ServiceRequestID: 2, SubmittedDateTime: '2022-01-03' }
        ];

        expect(wrapper.state('serviceTickets')).toEqual(expectedSortedTickets);
    });


    // Tests that all filters are removed when removeFilters is called
    it('test_remove_filters', () => {
        const wrapper = shallow(<StaffPortal />);
        const instance = wrapper.instance();

        // Set initial filters
        instance.setCategoryFilter('Plumbing');
        instance.setStatusFilter('Ticket Assigned');
        instance.setRequestFilter('Request 1');
        instance.setUnitFilter('Unit 1');
        instance.setSubmittedByFilter('User 1');
        instance.setDateFilter('newest');

        // Call removeFilters
        instance.removeFilters();

        // Check if filters are cleared
        expect(instance.state.categoryFilter).toEqual('');
        expect(instance.state.statusFilter).toEqual('');
        expect(instance.state.requestFilter).toEqual('');
        expect(instance.state.unitFilter).toEqual('');
        expect(instance.state.submittedByFilter).toEqual('');
        expect(instance.state.dateFilter).toEqual('');
        expect(instance.state.dateSortOrder).toEqual('');
    });


    // Tests that the StaffPortal function handles undefined, null, and false data from the getTickets function
    it('test_handles_undefined_null_false_data', async () => {
        // Mock the ticketManager object
        const ticketManager = new TicketManager();
        ticketManager.getTicketsByPARCStatusForStaffID = jest.fn();

        // Test case 1: data is undefined
        ticketManager.getTicketsByPARCStatusForStaffID.mockResolvedValue(undefined);
        const { getByText } = render(<StaffPortal />);
        expect(getByText('Loading...')).toBeInTheDocument();

        // Test case 2: data is null
        ticketManager.getTicketsByPARCStatusForStaffID.mockResolvedValue(null);
        await waitFor(() => {
            expect(getByText('Error!')).toBeInTheDocument();
        });

        // Test case 3: data is false
        ticketManager.getTicketsByPARCStatusForStaffID.mockResolvedValue(false);
        await waitFor(() => {
            expect(getByText('Empty!')).toBeInTheDocument();
        });
    });


    // Tests that the StaffPortal function handles errors from the getTickets function
    it('test_handles_errors_from_getTickets', () => {
        const mockGetTickets = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID');
        mockGetTickets.mockImplementation(() => {
            throw new Error('Error fetching tickets');
        });

        const wrapper = shallow(<StaffPortal />);

        expect(wrapper.find('.text-center').text()).toEqual('Error!');

        mockGetTickets.mockRestore();
    });


    // Tests that the StaffPortal function handles empty data from getTickets
    it('test_handles_empty_data', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForStaffID');
        ticketManagerMock.mockResolvedValue([]);

        const wrapper = shallow(<StaffPortal />);

        expect(wrapper.find('.text-center').text()).toBe('Empty!');

        ticketManagerMock.mockRestore();
    });


    // Tests that the StaffPortal function handles empty tenantDetails in the ticket object
    it('test_handles_empty_tenant_details', () => {
        // Create a mock ticket object with empty tenantDetails
        const ticket = {
            ServiceRequestID: 1,
            Name: 'Test Ticket',
            Category: 'Plumbing',
            Property: 'Unit 101',
            Status: 'Ticket Assigned',
            SubmittedDateTime: '2022-01-01',
            tenantDetails: null
        };

        // Set up the necessary dependencies
        const ticketManager = new TicketManager();
        ticketManager.getTicketsByPARCStatusForStaffID = jest.fn().mockResolvedValue([ticket]);

        // Render the StaffPortal component
        const { getByText } = render(<StaffPortal />);

        // Assert that the ticket is displayed correctly
        expect(getByText('Test Ticket')).toBeInTheDocument();
    });


    // Tests that the StaffPortal function displays the correct ticket details in each row
    it('test_displays_correct_ticket_details', () => {
        // Test code goes here
    });


    // Tests that the function displays the correct view ticket link for each ticket
    it('test_displays_correct_view_ticket_link', () => {
        // Mock data
        const ticketManager = new TicketManager();
        const serviceTickets = [
          {
            ServiceRequestID: 1,
            Name: 'Ticket 1',
            Category: 'Plumbing',
            Property: 'Unit 101',
            Status: 'Awaiting Review',
            tenantDetails: {
              TenantName: 'John Doe'
            },
            SubmittedDateTime: '2022-01-01T00:00:00.000Z'
          },
          {
            ServiceRequestID: 2,
            Name: 'Ticket 2',
            Category: 'Electric',
            Property: 'Unit 202',
            Status: 'Ticket Assigned',
            tenantDetails: {
              TenantName: 'Jane Smith'
            },
            SubmittedDateTime: '2022-01-02T00:00:00.000Z'
          }
        ];
        
        // Render the component
        const wrapper = shallow(<StaffPortal />);
        wrapper.setState({ serviceTickets });
        
        // Check if the view ticket links are displayed correctly
        expect(wrapper.find('Link')).toHaveLength(2);
        expect(wrapper.find('Link').at(0).prop('to')).toEqual('/staffportal/ticket/1');
        expect(wrapper.find('Link').at(1).prop('to')).toEqual('/staffportal/ticket/2');
    });


    // Tests that filteredTickets is updated correctly when filters are applied
    it('test_updates_filteredTickets', () => {
        // Set up initial state
        const ticketManager = new TicketManager();
        const serviceTickets = [{
            ServiceRequestID: 1,
            Category: 'Plumbing',
            Status: 'Awaiting Review'
        }, {
            ServiceRequestID: 2,
            Category: 'Electric',
            Status: 'Ticket Assigned'
        }, {
            ServiceRequestID: 3,
            Category: 'Pest',
            Status: 'Quotation Uploaded'
        }];
        const [filteredTickets, setFilteredTickets] = useState(serviceTickets);
        const [categoryFilter, setCategoryFilter] = useState('');
        const [statusFilter, setStatusFilter] = useState('');

        // Apply filters
        setCategoryFilter('Plumbing');
        setStatusFilter('Awaiting Review');

        // Check if filteredTickets is updated correctly
        expect(filteredTickets).toEqual([{ ServiceRequestID: 1, Category: 'Plumbing', Status: 'Awaiting Review' }]);
    });


});
