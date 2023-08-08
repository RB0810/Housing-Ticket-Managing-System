import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import StaffNavbar from "../StaffNavbar";
import StaffPortal from "../../pages/portal/staffportal";
import StaffLandingPage from "../../pages/landingpages/stafflandingpage";
import Cookies from 'js-cookie';
jest.mock('js-cookie');


const MockNavBar= ()=>{
    return (
        <MemoryRouter initialEntries={["/staffportal/landingpage/123"]}>
            <Routes>
                <Route path="/staffportal/*" element={<StaffNavbar />} />
            </Routes>
            <div className="container">
                <Routes>
                    <Route path="/staffportal/landingpage/:StaffID" element={<StaffLandingPage />} /> 
                    <Route path="/staffportal/tickets/:StaffID/:PARCStatus" element={<StaffPortal />} />
                </Routes>
            </div>
        </MemoryRouter>
    )
}


describe("Testing if routing works for the staff navbar",()=>{
        // beforeEach(() => {
        //     Cookies.get.mockImplementation((key) => {
        //     switch (key) {
        //         case 'userId':
        //         return '123';  // The ID must match with StaffID
        //         case 'type':
        //         return 'Staff';  // The user type must be "Staff"
        //         default:
        //         return null;
        //     }
        //     });
        // });

        beforeEach(() => {
            const SHA256 = require('crypto-js').SHA256;
            console.log('After test is called');
            Cookies.get.mockImplementation((key) => {
              switch (key) {
                case 'userId':
                  return SHA256('123').toString(); // The ID must match with StaffID
                case 'type':
                  return 'Staff'; // The user type must be "Staff"
                default:
                  return null;
              }
            });
          });

        test("Test if can route to Staff Portal",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Pending$/i }))
            fireEvent.click(screen.getByText('Staff Portal'))
            expect(screen.getByText(/Pending Tickets/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets pending",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Pending$/i }))
            expect(screen.getByText(/Remove Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets pending",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Active$/i }))
            expect(screen.getByText(/Remove Filters/i)).toBeInTheDocument()
        })

        test("Test if can route to View Tickets pending",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /View Tickets ▾/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Closed$/i }))
            expect(screen.getByText(/Remove Filters/i)).toBeInTheDocument()
        })
    
    })