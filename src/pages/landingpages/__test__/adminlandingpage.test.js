import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import AdminLandingPage from "../adminlandingpage";
import CreateSupervisor from "../../admin/createsupervisoracc";
import CreateStaffAcc from "../../admin/createstaffacc";
import ManageAccount from "../../admin/manageacc";
import Cookies from 'js-cookie';
jest.mock('js-cookie');


const MockGoToAdmin= ()=>{
    return (
        <MemoryRouter initialEntries={["/adminportal/landingpage/123"]}>
            <Routes>
                <Route path="/adminportal/landingpage/:AdminID" element={<AdminLandingPage />} />
                <Route path="/adminportal/createsupervisoracc/:AdminID" element={<CreateSupervisor />} />
                <Route path="/adminportal/createstaffacc/:AdminID" element={<CreateStaffAcc />} />
                <Route path="/adminportal/manageacc/:AdminID" element={<ManageAccount />} />  
            </Routes>
        </MemoryRouter>
    )
}

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
//     useNavigate: () => jest.fn(),
//     useParams: () => ({
//       AdminID: '123',
//     }),
//   }));

describe("Admin landingpage should send Admin to the right page",()=>{
    beforeEach(() => {
        Cookies.get.mockImplementation((key) => {
        switch (key) {
            case 'userId':
            return '123';  // The ID must match with AdminID
            case 'type':
            return 'Admin';  // The user type must be "Admin"
            default:
            return null;
        }
        });
    });

    test("Go to manageaccount", ()=>{
        render(<MockGoToAdmin/>)
        const manageaccount = screen.getByText("Manage Accounts")
        fireEvent.click(manageaccount)
        const manage = screen.getByRole("heading", {name:"Manage Accounts"})
        expect(manage).toBeInTheDocument()
        // const manage = screen.getByTestId("manage-accounts-page")
        // expect(manage.textContent).toBe("Manage Accounts")

    })

    test("Go to Create Supervisor", ()=>{
        render(<MockGoToAdmin/>)
        const buildlingsupervisor = screen.getByText(/Building Supervisor/i)
        fireEvent.click(buildlingsupervisor)
        const createsuper = screen.getByRole("heading",{name:"Create Supervisor Account"})
        expect(createsuper).toBeInTheDocument()
    })

    test("Go to Create Staff", ()=>{
        render(<MockGoToAdmin/>)
        const staff = screen.getByText(/Staff\/Engineers/i)
        fireEvent.click(staff)
        const createstaff = screen.getByRole("heading",{name:"Create Staff Account"})
        expect(createstaff).toBeInTheDocument()
    })


})