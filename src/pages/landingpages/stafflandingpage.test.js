//import necessary modules
import React from'react';
import { render } from '@testing-library/react';
import StaffLandingPage from './stafflandingpage';

describe('StaffLandingPage_function', () => {

    // Tests that clicking on 'Pending Tickets' button navigates to correct URL with 'pending' status
    it('test_pending_tickets_button_click', () => {
        // Test code
    });

    // Tests that clicking on 'Active Tickets' button navigates to correct URL with 'active' status
    it('test_active_tickets_button_click', () => {
        // Test code
    });

    // Tests that clicking on 'Closed Tickets' button navigates to correct URL with 'closed' status
    it('test_closed_tickets_button_click', () => {
        // Test code
    });

    // Tests that the function handles undefined StaffID parameter
    it('test_undefined_staff_id', () => {
        // Test code
    });

    // Tests that the function handles negative StaffID parameter
    it('test_negative_staff_id', () => {
        // Test code
    });

    // Tests that the rendered component contains three buttons with correct images and text
    it('test_rendered_component', () => {
        // Test code
    });

    // Tests that the function handles undefined StaffID parameter correctly
    it('test_staff_landing_page_undefined_staff_id', () => {
        // Mock the necessary dependencies
        const mockNavigate = jest.fn();
        const mockUseParams = jest.fn().mockReturnValue({});
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate,
            useParams: () => mockUseParams
        }));

        // Render the component
        const { getByText } = render(<StaffLandingPage />);

        // Assert the expected behavior
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(getByText('Pending Tickets')).toBeInTheDocument();
        expect(getByText('Active Tickets')).toBeInTheDocument();
        expect(getByText('Closed Tickets')).toBeInTheDocument();
    });

    // Tests that the function navigates to the correct URL when the StaffID parameter is null
    it('test_staff_landing_page_null_staff_id', () => {
        const navigateMock = jest.fn();
        const useParamsMock = jest.fn().mockReturnValue({ StaffID: null });
        jest.mock('react-router-dom', () => ({
            useNavigate: () => navigateMock,
            useParams: () => useParamsMock
        }));

        const wrapper = shallow(<StaffLandingPage />);

        wrapper.find('.card').at(0).simulate('click');

        expect(navigateMock).toHaveBeenCalledWith('/staffportal/tickets/null/pending');
    });

    // Tests that the function handles a non-number StaffID parameter correctly
    it('test_staffIDNotANumber', () => {
        const mockNavigate = jest.fn();
        const mockUseParams = jest.fn().mockReturnValue({ StaffID: 'abc' });
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate,
            useParams: () => mockUseParams
        }));

        const wrapper = shallow(<StaffLandingPage />);

        wrapper.find('.card').at(0).simulate('click');

        expect(mockNavigate).toHaveBeenCalledWith('/staffportal/tickets/abc/pending');
    });
});
