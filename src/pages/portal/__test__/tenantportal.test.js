// import necessary modules
import 'cypress-file-upload';
import 'cypress-wait-until';

describe('TenantPortal_function', () => {

    //test that function renders table with correct headers
    it('renders table with correct headers', () => {
        cy.visit('http://localhost:3000/tenantPortal');
        cy.get('table').should('be.visible');
        cy.get('table').find('thead').find('tr').find('th').should('have.length', 4);
        cy.get('table').find('thead').find('tr').find('th').eq(0).should('have.text', 'Name');
        cy.get('table').find('thead').find('tr').find('th').eq(1).should('have.text', 'Email');
        cy.get('table').find('thead').find('tr').find('th').eq(2).should('have.text', 'Phone');
        cy.get('table').find('thead').find('tr').find('th').eq(3).should('have.text', 'Address');
        });

    //displays loading message whin isLoading is true
    it('displays loading message whin isLoading is true', () => {
        cy.visit('http://localhost:3000/tenantPortal');
        cy.get('table').should('be.visible');
        cy.get('table').find('tbody').find('tr').should('have.length', 1);
        cy.get('table').find('tbody').find('tr').find('td').should('have.text', 'Loading...');
        });
    //displays error message when fetchError is not null
    it('displays error message when fetchError is not null', () => {
        cy.visit('http://localhost:3000/tenantPortal');
        cy.get('table').should('be.visible');
        cy.get('table').find('tbody').find('tr').should('have.length', 1);
        cy.get('table').find('tbody').find('tr').find('td').should('have.text', 'Error!');
        });
    //displays empty message when filteredTickets is empty
    it('displays empty message when filteredTickets is empty', () => {
        cy.visit('http://localhost:3000/tenantPortal');
        cy.get('table').should('be.visible');
        cy.get('table').find('tbody').find('tr').should('have.length', 1);
        cy.get('table').find('tbody').find('tr').find('td').should('have.text', 'No tickets found!');
        });
    //displays tickets when data is available
    it('displays tickets when data is available', () => {
        cy.visit('http://localhost:3000/tenantPortal');
        cy.get('table').should('be.visible');
        cy.get('table').find('tbody').find('tr').should('have.length', 3);
        cy.get('table').find('tbody').find('tr').find('td').should('have.length', 4);
        cy.get('table').find('tbody').find('tr').find('td').eq(0).should('have.text', 'Ticket 1');
        cy.get('table').find('tbody').find('tr').find('td').eq(1).should('have.text', '<EMAIL>');
        cy.get('table').find('tbody').find('tr').find('td').eq(2).should('have.text', '123-456-7890');
        cy.get('table').find('tbody').find('tr').find('td').eq(3).should('have.text', '123 Main St');
        });



    // Tests that an error is handled when fetching tickets
    it('test_handles_error_when_fetching_tickets', async () => {
        const mockTicketManager = {
            getTicketsByPARCStatusForTenantID: jest.fn().mockRejectedValue('Error fetching tickets')
        };
        const useParamsMock = jest.fn().mockReturnValue({ PARCStatus: 'status', TenantID: '123' });
        const wrapper = shallow(<TenantPortal ticketManager={mockTicketManager} useParams={useParamsMock} />);
        await wrapper.instance().getTickets();
        expect(wrapper.state('fetchError')).toEqual('Error!');
    });

    

    // Tests that an error is handled when getting the supervisor ID
    it('test_handles_error_when_getting_supervisor_id', async () => {
      const ticketManager = new TicketManager();
      const mockError = new Error('Error getting SupervisorID from TenantID');
      ticketManager.getTicketsByPARCStatusForTenantID = jest.fn().mockRejectedValue(mockError);

      const consoleErrorSpy = jest.spyOn(console, 'error');

      await ticketManager.getTicketsByPARCStatusForTenantID('PARCStatus', 123);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching tickets:', mockError);
    });


    // Tests that an error is handled when adding a ticket
    it('test_handles_error_when_adding_ticket', async () => {
      const ticketManager = new TicketManager();
      const addTicketSpy = jest.spyOn(ticketManager, 'addTicket').mockImplementation(() => {
        throw new Error('Error adding ticket');
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await act(async () => {
        render(<TenantPortal />);
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching tickets:', new Error('Error adding ticket'));

      addTicketSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });


    // Tests that the TenantPortal function handles an empty filteredTickets array by displaying 'Empty!' in the table
    it('test_handles_empty_filteredTickets_array', () => {
      const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForTenantID');
      ticketManagerMock.mockResolvedValue([]);

      render(<TenantPortal />);

      const emptyMessage = screen.getByText('Empty!');
      expect(emptyMessage).toBeInTheDocument();

      ticketManagerMock.mockRestore();
    });


    // Tests that the TenantPortal function handles empty staffDetails in a ticket
    it('test_handles_empty_staffDetails', () => {
        const ticketManager = new TicketManager();
        const serviceTickets = [
          {
            ServiceRequestID: 1,
            Name: 'Ticket 1',
            Category: 'Plumbing',
            Property: 'Unit 101',
            Status: 'Ticket Assigned',
            SubmittedDateTime: '2022-01-01T10:00:00Z',
            staffDetails: null
          },
          {
            ServiceRequestID: 2,
            Name: 'Ticket 2',
            Category: 'Electric',
            Property: 'Unit 202',
            Status: 'Works Started',
            SubmittedDateTime: '2022-01-02T10:00:00Z',
            staffDetails: {
              StaffName: 'John Doe'
            }
          }
        ];
        const setIsLoading = jest.fn();
        const setFetchError = jest.fn();
        const setServiceTickets = jest.fn();

        jest.spyOn(ticketManager, 'getTicketsByPARCStatusForTenantID').mockResolvedValue(serviceTickets);

        render(<TenantPortal />);

        expect(setIsLoading).toHaveBeenCalledWith(false);
        expect(setFetchError).toHaveBeenCalledWith(null);
        expect(setServiceTickets).toHaveBeenCalledWith(serviceTickets);
    });


    // Tests that tickets are filtered correctly by category
    it('test_filters_tickets_by_category', () => {
        const ticketManager = new TicketManager();
        const { PARCStatus, TenantID } = useParams();
        const [serviceTickets, setServiceTickets] = useState([]);
        const [categoryFilter, setCategoryFilter] = useState('');

        // Set the category filter
        setCategoryFilter('Plumbing');

        // Call the getTickets function
        getTickets();

        // Check that the serviceTickets state is updated correctly
        expect(serviceTickets).toEqual([{ ServiceRequestID: 1, Category: 'Plumbing' }, { ServiceRequestID: 2, Category: 'Plumbing' }]);
    });


    // Tests that the function filters tickets by status
    it('test_filters_tickets_by_status', () => {
        const ticketManager = new TicketManager();
        const { PARCStatus, TenantID } = useParams();
        const [serviceTickets, setServiceTickets] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [fetchError, setFetchError] = useState(null);
        const [categoryFilter, setCategoryFilter] = useState('');
        const [statusFilter, setStatusFilter] = useState('');
        const [requestFilter, setRequestFilter] = useState('');
        const [assignedToFilter, setAssignedToFilter] = useState('');
        const [dateFilter, setDateFilter] = useState('');
        const [dateSortOrder, setDateSortOrder] = useState('');
        const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
        const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
        const [isRequestFilterOpen, setIsRequestFilterOpen] = useState(false);
        const [isAssignedToFilterOpen, setIsAssignedToFilterOpen] = useState(false);
        const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

        // ... rest of the code

        expect(filteredTickets.length).toBeGreaterThan(0);
        expect(filteredTickets.every(ticket => ticket.Status === statusFilter)).toBe(true);
    });


    // Tests that the function filters tickets by request
    it('test_filters_tickets_by_request', () => {
        const ticketManager = new TicketManager();
        const { PARCStatus, TenantID } = useParams();
        const [serviceTickets, setServiceTickets] = useState([]);
        const [requestFilter, setRequestFilter] = useState("");

        // Set up mock data
        const mockTickets = [
            { ServiceRequestID: 1, Name: "Request 1" },
            { ServiceRequestID: 2, Name: "Request 2" },
            { ServiceRequestID: 3, Name: "Request 3" }
        ];

        // Mock the getTickets function
        ticketManager.getTicketsByPARCStatusForTenantID = jest.fn().mockResolvedValue(mockTickets);

        // Render the component
        render(<TenantPortal />);

        // Set the request filter
        act(() => {
            fireEvent.change(screen.getByPlaceholderText("Filter by request..."), { target: { value: "Request 2" } });
        });

        // Check if the tickets are filtered correctly
        expect(screen.getByText("Request 2")).toBeInTheDocument();
        expect(screen.queryByText("Request 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Request 3")).not.toBeInTheDocument();
    });


    // Tests that tickets are filtered correctly by the assigned to filter
    it('test_filters_tickets_by_assigned_to', () => {
        // Set up the initial state
        const ticketManager = new TicketManager();
        const { PARCStatus, TenantID } = useParams();
        const [serviceTickets, setServiceTickets] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [fetchError, setFetchError] = useState(null);
        const [categoryFilter, setCategoryFilter] = useState('');
        const [statusFilter, setStatusFilter] = useState('');
        const [requestFilter, setRequestFilter] = useState('');
        const [assignedToFilter, setAssignedToFilter] = useState('');
        const [dateFilter, setDateFilter] = useState('');
        const [dateSortOrder, setDateSortOrder] = useState('');
        const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
        const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
        const [isRequestFilterOpen, setIsRequestFilterOpen] = useState(false);
        const [isAssignedToFilterOpen, setIsAssignedToFilterOpen] = useState(false);
        const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

        // Mock the ticket data
        const mockTickets = [
          {
            ServiceRequestID: 1,
            Name: 'Ticket 1',
            Category: 'Category 1',
            Property: 'Property 1',
            Status: 'Status 1',
            SubmittedDateTime: '2022-01-01',
            staffDetails: {
              StaffName: 'Staff 1'
            }
          },
          {
            ServiceRequestID: 2,
            Name: 'Ticket 2',
            Category: 'Category 2',
            Property: 'Property 2',
            Status: 'Status 2',
            SubmittedDateTime: '2022-01-02',
            staffDetails: {
              StaffName: 'Staff 2'
            }
          },
          {
            ServiceRequestID: 3,
            Name: 'Ticket 3',
            Category: 'Category 3',
            Property: 'Property 3',
            Status: 'Status 3',
            SubmittedDateTime: '2022-01-03',
            staffDetails: {
              StaffName: 'Staff 3'
            }
          }
        ];

        // Mock the useParams hook
        jest.mock('react-router-dom', () => ({
          useParams: jest.fn().mockReturnValue({ PARCStatus: 'status', TenantID: 'tenant' })
        }));

        // Mock the TicketManager class
        jest.mock('../../managers/ticketmanager', () => {
          return jest.fn().mockImplementation(() => ({
            getTicketsByPARCStatusForTenantID: jest.fn().mockResolvedValue(mockTickets)
          }));
        });

        // Render the TenantPortal component
        const wrapper = shallow(<TenantPortal />);

        // Assert the initial state
        expect(wrapper.find('tr')).toHaveLength(4);

        // Set the assigned to filter
        wrapper.find('input').simulate('change', { target: { value: 'Staff 1' } });

        // Assert the filtered state
        expect(wrapper.find('tr')).toHaveLength(2);
      });


    // Tests that the tickets are sorted by date in the specified order
    it('sorts_tickets_by_date', () => {
        const ticketManager = new TicketManager();
        const { PARCStatus, TenantID } = useParams();
        const [serviceTickets, setServiceTickets] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [fetchError, setFetchError] = useState(null);
        const [categoryFilter, setCategoryFilter] = useState('');
        const [statusFilter, setStatusFilter] = useState('');
        const [requestFilter, setRequestFilter] = useState('');
        const [assignedToFilter, setAssignedToFilter] = useState('');
        const [dateFilter, setDateFilter] = useState('');
        const [dateSortOrder, setDateSortOrder] = useState('');
        const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
        const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
        const [isRequestFilterOpen, setIsRequestFilterOpen] = useState(false);
        const [isAssignedToFilterOpen, setIsAssignedToFilterOpen] = useState(false);
        const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

        // ... rest of the code
        // Call sortTicketsByDate
        sortTicketsByDate('oldest');
        // Expected sorted tickets
        const expectedSortedTickets = [
            {
                TicketID: 1,
                TicketNumber: '123456',
                Category: 'Plumbing',
                Status: 'Ticket Assigned',
                Request: 'Leak',
                AssignedTo: 'John Doe',
                Date: '2020-01-01'
                },
            {
                TicketID: 2,
                TicketNumber: '123457',
                Category: 'Plumbing',
                Status: 'Ticket Assigned',
                Request: 'Leak',
                AssignedTo: 'John Doe',
                Date: '2020-01-02'
                },
            {
                TicketID: 3,
                TicketNumber: '123458',
                Category: 'Plumbing',
                Status: 'Ticket Assigned',
                Request: 'Leak',
                AssignedTo: 'John Doe',
                Date: '2020-01-03'
                },
            {
                TicketID: 4,
                TicketNumber: '123459',
                Category: 'Plumbing',
                Status: 'Ticket Assigned',
                Request: 'Leak',
                AssignedTo: 'John Doe',
                Date: '2020-01-04'
                },
                {
                    TicketID: 5,
                    TicketNumber: '123460',
                    Category: 'Plumbing',
                    Status: 'Ticket Assigned',
                    Request: 'Leak',
                    AssignedTo: 'John Doe',
                    Date: '2020-01-05'  
                    }

                ]

        sortTicketsByDate('newest');

        expect(serviceTickets).toEqual(expectedSortedTickets);
    });


    // Tests that all filters are removed when removeFilters is called
    it('test_remove_filters', () => {
        const wrapper = shallow(<TenantPortal />);

        // Set initial filters
        wrapper.setState({
            categoryFilter: 'Plumbing',
            statusFilter: 'Ticket Assigned',
            requestFilter: 'Leak',
            assignedToFilter: 'John Doe',
            dateFilter: 'newest',
            dateSortOrder: 'newest'
        });

        // Call removeFilters
        wrapper.instance().removeFilters();

        // Check if all filters are cleared
        expect(wrapper.state('categoryFilter')).toEqual('');
        expect(wrapper.state('statusFilter')).toEqual('');
        expect(wrapper.state('requestFilter')).toEqual('');
        expect(wrapper.state('assignedToFilter')).toEqual('');
        expect(wrapper.state('dateFilter')).toEqual('');
        expect(wrapper.state('dateSortOrder')).toEqual('');
    });
});
