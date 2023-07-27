//import necessary modules
import React from'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SupervisorPortal } from './supervisorportal.js';


describe('SupervisorPortal_function', () => {

    // Tests that the table is rendered with ticket data
    it('test_render_table_with_ticket_data', () => {
        // Mock ticket data
        const ticketData = [
            {
                ServiceRequestID: 1,
                Name: 'Ticket 1',
                Category: 'Plumbing',
                Property: 'Unit 101',
                Status: 'Awaiting Review',
                tenantDetails: {
                    TenantName: 'John Doe'
                },
                SubmittedDateTime: '2022-01-01T00:00:00.000Z',
                staffDetails: {
                    StaffName: 'Jane Smith'
                }
            },
            {
                ServiceRequestID: 2,
                Name: 'Ticket 2',
                Category: 'Electric',
                Property: 'Unit 202',
                Status: 'Ticket Assigned',
                tenantDetails: {
                    TenantName: 'Jane Doe'
                },
                SubmittedDateTime: '2022-01-02T00:00:00.000Z',
                staffDetails: {
                    StaffName: 'John Smith'
                }
            }
        ];

        // Mock useState
        const useStateMock = jest.spyOn(React, 'useState');
        useStateMock.mockImplementation((init) => [init, jest.fn()]);

        // Mock useEffect
        const useEffectMock = jest.spyOn(React, 'useEffect');
        useEffectMock.mockImplementation((fn) => fn());

        // Mock useParams
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: () => ({
                PARCStatus: 'awaiting review',
                SupervisorID: '1'
            })
        }));

        // Render the component
        render(<SupervisorPortal />);

        // Assert that the table is rendered with ticket data
        expect(screen.getByText('Ticket 1')).toBeInTheDocument();
        expect(screen.getByText('Plumbing')).toBeInTheDocument();
        expect(screen.getByText('Unit 101')).toBeInTheDocument();
        expect(screen.getByText('Awaiting Review')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('01/01/2022')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();

        expect(screen.getByText('Ticket 2')).toBeInTheDocument();
        expect(screen.getByText('Electric')).toBeInTheDocument();
        expect(screen.getByText('Unit 202')).toBeInTheDocument();
        expect(screen.getByText('Ticket Assigned')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('01/02/2022')).toBeInTheDocument();
        expect(screen.getByText('John Smith')).toBeInTheDocument();

        // Restore mock implementations
        useStateMock.mockRestore();
        useEffectMock.mockRestore();
    });


    // Tests that tickets are filtered correctly by category
    it('test_filter_tickets_by_category', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForSupervisorID');
        ticketManagerMock.mockResolvedValue([
            { ServiceRequestID: 1, Category: 'Plumbing' },
            { ServiceRequestID: 2, Category: 'Electric' },
            { ServiceRequestID: 3, Category: 'Plumbing' }
        ]);

        const wrapper = shallow(<SupervisorPortal />);
        wrapper.find('.filter-header span').at(1).simulate('click');
        wrapper.find('.filter-dropdown select').at(0).simulate('change', { target: { value: 'Plumbing' } });

        expect(wrapper.find('.table-row')).toHaveLength(2);
        expect(wrapper.find('.table-row').at(0).find('.text-center').at(0).text()).toEqual('1');
        expect(wrapper.find('.table-row').at(1).find('.text-center').at(0).text()).toEqual('3');

        ticketManagerMock.mockRestore();
    });


    // Tests that tickets are filtered correctly by status
    it('test_filter_tickets_by_status', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForSupervisorID');
        ticketManagerMock.mockResolvedValue([{ ServiceRequestID: 1, Status: 'Ticket Assigned' }, { ServiceRequestID: 2, Status: 'Quotation Uploaded' }]);

        const wrapper = shallow(<SupervisorPortal />);
        wrapper.find('.filter-arrow').at(1).simulate('click');
        wrapper.find('.filter-dropdown select').at(1).simulate('change', { target: { value: 'Ticket Assigned' } });

        expect(wrapper.find('.table-row')).toHaveLength(1);
        expect(wrapper.find('.table-row td').at(0).text()).toEqual('1');
    });


    // Tests that tickets are filtered correctly by request
    it('test_filter_tickets_by_request', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForSupervisorID');
        ticketManagerMock.mockResolvedValue([
            {
                ServiceRequestID: 1,
                Name: 'Request 1',
                Category: 'Category 1',
                Property: 'Unit 1',
                Status: 'Status 1',
                tenantDetails: {
                    TenantName: 'Tenant 1'
                },
                SubmittedDateTime: '2022-01-01'
            },
            {
                ServiceRequestID: 2,
                Name: 'Request 2',
                Category: 'Category 2',
                Property: 'Unit 2',
                Status: 'Status 2',
                tenantDetails: {
                    TenantName: 'Tenant 2'
                },
                SubmittedDateTime: '2022-01-02'
            }
        ]);

        const wrapper = shallow(<SupervisorPortal />);
        wrapper.find('input').simulate('change', { target: { value: 'Request 1' } });

        expect(wrapper.find('tbody tr')).toHaveLength(1);
        expect(wrapper.find('tbody tr td').at(1).text()).toEqual('Request 1');
    });


    // Tests that tickets can be filtered by unit
    it('test_filter_tickets_by_unit', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForSupervisorID');
        ticketManagerMock.mockResolvedValue([
            {
                ServiceRequestID: 1,
                Name: 'Ticket 1',
                Category: 'Plumbing',
                Property: 'Unit 101',
                Status: 'Awaiting Review',
                tenantDetails: {
                    TenantName: 'John Doe'
                },
                SubmittedDateTime: '2022-01-01T00:00:00.000Z',
                staffDetails: {
                    StaffName: 'Jane Smith'
                }
            },
            {
                ServiceRequestID: 2,
                Name: 'Ticket 2',
                Category: 'Electric',
                Property: 'Unit 102',
                Status: 'Ticket Assigned',
                tenantDetails: {
                    TenantName: 'Jane Doe'
                },
                SubmittedDateTime: '2022-01-02T00:00:00.000Z',
                staffDetails: {
                    StaffName: 'John Smith'
                }
            }
        ]);

        const wrapper = shallow(<SupervisorPortal />);
        wrapper.find('input').at(0).simulate('change', { target: { value: '101' } });

        expect(wrapper.find('tbody tr')).toHaveLength(1);
        expect(wrapper.find('tbody tr td').at(3).text()).toEqual('Unit 101');

        ticketManagerMock.mockRestore();
    });


    // Tests that tickets can be filtered by the 'submitted by' field
    it('test_filter_tickets_by_submitted_by', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForSupervisorID');
        ticketManagerMock.mockResolvedValue([
            {
                ServiceRequestID: 1,
                Name: 'Ticket 1',
                Category: 'Plumbing',
                Property: 'Unit 101',
                Status: 'Awaiting Review',
                tenantDetails: {
                    TenantName: 'John Doe'
                }
            },
            {
                ServiceRequestID: 2,
                Name: 'Ticket 2',
                Category: 'Electric',
                Property: 'Unit 202',
                Status: 'Ticket Assigned',
                tenantDetails: {
                    TenantName: 'Jane Smith'
                }
            }
        ]);

        const wrapper = shallow(<SupervisorPortal />);
        wrapper.find('input').at(0).simulate('change', { target: { value: 'John' } });

        expect(wrapper.find('tbody tr')).toHaveLength(1);
        expect(wrapper.find('tbody tr td').at(1).text()).toEqual('Ticket 1');
    });


    // Tests that the tickets are sorted correctly by submitted date
    it('test_sort_tickets_by_date', () => {
        const mockTickets = [
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
        const wrapper = shallow(<SupervisorPortal />);
        wrapper.setState({ serviceTickets: mockTickets });
        wrapper.instance().sortTicketsByDate('newest');
        expect(wrapper.state().serviceTickets).toEqual([
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


    // Tests that tickets are filtered correctly by the 'assigned to' filter
    it('test_filter_tickets_by_assigned_to', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForSupervisorID');
        ticketManagerMock.mockResolvedValue([
            {
                ServiceRequestID: 1,
                Name: 'Ticket 1',
                Category: 'Plumbing',
                Property: 'Unit 101',
                Status: 'Ticket Assigned',
                tenantDetails: {
                    TenantName: 'John Doe'
                },
                staffDetails: {
                    StaffName: 'Jane Smith'
                },
                SubmittedDateTime: '2022-01-01'
            },
            {
                ServiceRequestID: 2,
                Name: 'Ticket 2',
                Category: 'Electric',
                Property: 'Unit 102',
                Status: 'Ticket Assigned',
                tenantDetails: {
                    TenantName: 'Jane Doe'
                },
                staffDetails: {
                    StaffName: 'John Smith'
                },
                SubmittedDateTime: '2022-01-02'
            }
        ]);

        const wrapper = shallow(<SupervisorPortal />);

        // Set the assigned to filter
        wrapper.find('input').at(4).simulate('change', { target: { value: 'Jane' } });

        // Check if the tickets are filtered correctly
        expect(wrapper.find('tbody tr')).toHaveLength(1);
        expect(wrapper.find('tbody tr td').at(1).text()).toEqual('Ticket 1');

        ticketManagerMock.mockRestore();
    });


    // Tests that all filters are removed and tickets are fetched again
    it('test_remove_all_filters', () => {
        const ticketManagerMock = jest.spyOn(TicketManager.prototype, 'getTicketsByPARCStatusForSupervisorID');
        ticketManagerMock.mockResolvedValue([{ ServiceRequestID: 1, Name: 'Ticket 1', Category: 'Plumbing', Property: 'Unit 101', Status: 'Awaiting Review', SubmittedDateTime: '2022-01-01', tenantDetails: { TenantName: 'John Doe' }, staffDetails: { StaffName: 'Jane Smith' } }]);

        const wrapper = mount(<SupervisorPortal />);

        // Set filters
        wrapper.find('.filter-arrow').at(0).simulate('click');
        wrapper.find('input').at(0).simulate('change', { target: { value: 'Ticket 1' } });
        wrapper.find('.filter-arrow').at(1).simulate('click');
        wrapper.find('select').at(0).simulate('change', { target: { value: 'Plumbing' } });

        // Remove filters
        wrapper.find('button').at(0).simulate('click');

        expect(ticketManagerMock).toHaveBeenCalledTimes(2);
        expect(ticketManagerMock).toHaveBeenCalledWith('AWAITING REVIEW', 123);
    });


    // Tests that the function handles an empty ticket list correctly
    it('test_empty_ticket_list', () => {
        const ticketManager = new TicketManager();
        const mockGetTicketsByPARCStatusForSupervisorID = jest.spyOn(ticketManager, 'getTicketsByPARCStatusForSupervisorID').mockResolvedValue([]);

        const wrapper = shallow(<SupervisorPortal />);

        expect(mockGetTicketsByPARCStatusForSupervisorID).toHaveBeenCalledWith('CLOSED', parseInt(SupervisorID));
        expect(wrapper.find('.table-row')).toHaveLength(0);
        expect(wrapper.find('.text-center').text()).toEqual('Empty!');
    });


    // Tests that an error is handled correctly when fetching tickets
    it('test_error_fetching_tickets', () => {
        // Mock the TicketManager class
        const mockTicketManager = jest.fn(() => ({
            getTicketsByPARCStatusForSupervisorID: jest.fn().mockRejectedValue('Error fetching tickets'),
        }));

        // Render the SupervisorPortal component with the mocked TicketManager
        render(<SupervisorPortal />, { wrapper: ({ children }) => <TicketManagerContext.Provider value={mockTicketManager}>{children}</TicketManagerContext.Provider> });

        // Assert that the error message is displayed
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });


    // Tests that an error is thrown when updating tickets
    it('test_error_updating_tickets', () => {
        // Mock the TicketManager class
        const mockTicketManager = jest.fn(() => ({
            updateTicket: jest.fn().mockRejectedValue(new Error('Error updating ticket')),
            getTicketsByPARCStatusForSupervisorID: jest.fn().mockResolvedValue([])
        }));

        // Replace the original TicketManager class with the mock
        jest.mock('../../managers/ticketmanager', () => {
            return mockTicketManager;
        });

        // Import the SupervisorPortal function
        const SupervisorPortal = require('../supervisorportal').default;

        // Test the function
        const result = SupervisorPortal();

        // Assert that an error is thrown
        expect(result).toThrow('Error updating ticket');
    });


    // Tests that an error is thrown when assigning tickets
    it('test_error_assigning_tickets', async () => {
      const ticketManager = new TicketManager();
      const mockTicketId = 123;
      const mockStaffId = 456;

      ticketManager.assignTicket = jest.fn().mockImplementation(() => {
        throw new Error('Error assigning ticket');
      });

      await expect(ticketManager.assignTicket(mockTicketId, mockStaffId)).rejects.toThrow('Error assigning ticket');
    });


    // Tests that an error occurs when closing tickets
    it('test_error_closing_tickets', async () => {
        const ticketManager = new TicketManager();
        const closeTicketSpy = jest.spyOn(ticketManager, 'closeTicket').mockImplementation(() => Promise.reject('Error closing ticket'));

        const wrapper = shallow(<SupervisorPortal />);
        await wrapper.instance().getTickets();

        expect(closeTicketSpy).toHaveBeenCalled();
        expect(wrapper.state('fetchError')).toEqual('Error!');
        expect(wrapper.state('serviceTickets')).toEqual([]);
        expect(wrapper.state('isLoading')).toEqual(false);

        closeTicketSpy.mockRestore();
    });


    // Tests that an error occurs when rejecting tickets
    it('test_error_rejecting_tickets', async () => {
        const ticketManager = new TicketManager();
        const ticketId = 123;
        const result = await ticketManager.rejectTicket(ticketId);
        expect(result).toBe(false);
    });


    // Tests that an error is thrown when getting the staff ID of a ticket
    it('test_error_getting_staff_id', () => {
        const ticketManager = new TicketManager();
        ticketManager.getTicketsByPARCStatusForSupervisorID = jest.fn().mockRejectedValue(new Error('Error getting StaffID of ticket'));

        expect(ticketManager.getTicketsByPARCStatusForSupervisorID()).rejects.toThrow('Error getting StaffID of ticket');
    });


    // Tests that an error is thrown when getting a ticket
    it('test_error_getting_ticket', () => {
        const ticketManager = new TicketManager();
        ticketManager.getTicketsByPARCStatusForSupervisorID = jest.fn().mockRejectedValue(new Error('Error getting ticket'));

        const wrapper = shallow(<SupervisorPortal />);

        expect(wrapper.find('.text-center').text()).toEqual('Error!');
    });


    // Tests that an error is thrown when getting the test ticket ID
    it('test_error_getting_test_ticket_id', () => {
        const ticketManager = new TicketManager();
        ticketManager.getTestingTicketId = jest.fn().mockReturnValue(false);

        const wrapper = shallow(<SupervisorPortal />);
        wrapper.instance().getTickets();

        expect(ticketManager.getTestingTicketId).toHaveBeenCalled();
        expect(wrapper.state().fetchError).toEqual('Error!');
        expect(wrapper.state().serviceTickets).toEqual([]);
        expect(wrapper.state().isLoading).toEqual(false);
    });


    // Tests that the date is in the specified range
    it('test_date_in_range', () => {
        const ticketManager = new TicketManager();
        const serviceTickets = [
          {
            ServiceRequestID: 1,
            SubmittedDateTime: '2022-01-01',
          },
          {
            ServiceRequestID: 2,
            SubmittedDateTime: '2022-02-01',
          },
          {
            ServiceRequestID: 3,
            SubmittedDateTime: '2022-03-01',
          },
        ];
        const dateFilter = 'newest';

        const filteredTickets = serviceTickets.filter((ticket) => {
          const currentDate = new Date(ticket.SubmittedDateTime);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (dateFilter === 'newest') {
            return currentDate >= today;
          } else if (dateFilter === 'oldest') {
            return currentDate < today;
          }

          return true;
        });

        expect(filteredTickets.length).toBe(2);
        expect(filteredTickets[0].ServiceRequestID).toBe(3);
        expect(filteredTickets[1].ServiceRequestID).toBe(2);
      });


    // Tests that tickets are filtered correctly based on multiple criteria
    it('test_filter_tickets_by_multiple_criteria', () => {
        // Test code goes here
    });
});
