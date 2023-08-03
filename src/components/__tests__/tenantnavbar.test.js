import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import TenantNavbar from "../TenantNavbar";
import CreateTicket from "../../pages/tenant/createticket";
import TenantLandingPage from "../../pages/landingpages/tenantlandingpage";
import TenantProfile from "../../pages/tenant/profile";
import TenantPortal from "../../pages/portal/tenantportal";
import Cookies from 'js-cookie';
jest.mock('js-cookie');


const MockNavBar= ()=>{
    return (
        <MemoryRouter initialEntries={["/tenantportal/landingpage/123"]}>
            <Routes>
                <Route path="/tenantportal/*" element={<TenantNavbar />} />
            </Routes>
            <div className="container">
                <Routes>
                    <Route path="/tenantportal/landingpage/:TenantID" element={<TenantLandingPage />} /> 
                    <Route path="/tenantportal/createticket/:TenantID" element={<CreateTicket />} />
                    <Route path="/tenantportal/profile/:TenantID" element={<TenantProfile />} />
                    <Route path="/tenantportal/tickets/:TenantID/:PARCStatus" element={<TenantPortal />} />

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
                return '123';  // The ID must match with TenantID
                case 'type':
                return 'Tenant';  // The user type must be "Tenant"
                default:
                return null;
            }
            });
        });

        test("Test if can route to Tenant Portal",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Pending$/i }))
            fireEvent.click(screen.getByText('Tenant Portal'))
            expect(screen.getByText(/Pending Tickets/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets pending",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Pending$/i }))
            expect(screen.getByText(/Remove Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets closed",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Active$/i }))
            expect(screen.getByText(/Remove Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets active",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Closed$/i }))
            expect(screen.getByText(/Remove Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to profile",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('link', { name: /Profile/i }))
            expect(screen.getByText(/Loading tenant details.../i)).toBeInTheDocument()
        })
    
    })