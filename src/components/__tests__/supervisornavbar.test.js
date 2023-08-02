import { render, screen } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import SupervisorNavbar from "../SupervisorNavbar";
import SupervisorLandingPage from "../../pages/landingpages/supervisorlandingpage";
import CreateTenantAcc from "../../pages/supervisor/createtenantacc";
import SupervisorPortal from "../../pages/portal/supervisorportal";
import SupervisorProfile from "../../pages/supervisor/profile";
import Cookies from 'js-cookie';
jest.mock('js-cookie');


const MockNavBar= ()=>{
    return (
        <MemoryRouter initialEntries={["/supervisorportal/landingpage/123"]}>
            <Routes>
                <Route path="/supervisorportal/*" element={<SupervisorNavbar />} />
            </Routes>
            <div className="container">
                <Routes>
                    <Route path="/supervisorportal/landingpage/:SupervisorID" element={<SupervisorLandingPage />} />
                    <Route path="/supervisorportal/createtennantacc/:SupervisorID" element={<CreateTenantAcc />} />
                    <Route path="/supervisorportal/tickets/:SupervisorID/:PARCStatus" element={<SupervisorPortal />} />
                    <Route path="/supervisorportal/profile/:SupervisorID" element={<SupervisorProfile />} />
                </Routes>
            </div>
        </MemoryRouter>
    )
}


describe("Testing if routing works for the staff navbar",()=>{
        beforeEach(() => {
            Cookies.get.mockImplementation((key) => {
            switch (key) {
                case 'userId':
                return '123';  // The ID must match with Supervisor
                case 'type':
                return 'Supervisor';  // The user type must be "Supervisor"
                default:
                return null;
            }
            });
        });

        test("Test if can route to Supervisor Portal",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Pending$/i }))
            fireEvent.click(screen.getByText('Supervisor Portal'))
            expect(screen.getByText(/Pending Tickets/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets pending",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Pending$/i }))
            expect(screen.getByText(/Remove all Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets closed",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Active$/i }))
            expect(screen.getByText(/Remove all Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets active",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Closed$/i }))
            expect(screen.getByText(/Remove all Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to profile",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('link', { name: /Profile/i }))
            expect(screen.getByText(/Loading supervisor details.../i)).toBeInTheDocument()
        })
    
    })