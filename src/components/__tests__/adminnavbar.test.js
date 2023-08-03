import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import Navbar from "../Navbar";
import LandingPage from "../../pages/landingpages/landingpage";
import AdminNavbar from "../AdminNavbar";
import AdminLandingPage from "../../pages/landingpages/adminlandingpage";
import CreateSupervisor from "../../pages/admin/createsupervisoracc";
import CreateStaffAcc from "../../pages/admin/createstaffacc";
import ManageAccount from "../../pages/admin/manageacc";
import Cookies from 'js-cookie';
import Authentication from "../../managers/authentication";
jest.mock('js-cookie');

const MockNavBar= ()=>{
    return (
        <MemoryRouter initialEntries={["/adminportal/landingpage/123"]}>
            <Routes>
                <Route path="/*" element={<Navbar />} />
                <Route path="/adminportal/*" element={<AdminNavbar />} />
            </Routes>
            <div className="container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/adminportal/landingpage/:AdminID" element={<AdminLandingPage />} />
                    <Route path="/adminportal/createsupervisoracc/:AdminID" element={<CreateSupervisor />} />
                    <Route path="/adminportal/createstaffacc/:AdminID" element={<CreateStaffAcc />} />
                    <Route path="/adminportal/manageacc/:AdminID" element={<ManageAccount />} />
                </Routes>
            </div>
        </MemoryRouter>
    )
}

const MockNavBar2= ()=>{
    return (
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/*" element={<Navbar />} />
                <Route path="/adminportal/*" element={<AdminNavbar />} />
            </Routes>
            <div className="container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/adminportal/landingpage/:AdminID" element={<AdminLandingPage />} />
                    <Route path="/adminportal/createsupervisoracc/:AdminID" element={<CreateSupervisor />} />
                    <Route path="/adminportal/createstaffacc/:AdminID" element={<CreateStaffAcc />} />
                    <Route path="/adminportal/manageacc/:AdminID" element={<ManageAccount />} />
                </Routes>
            </div>
        </MemoryRouter>
    )
}


describe("Testing if routing works for the admin navbar",()=>{
    beforeEach(() => {
        Cookies.get.mockImplementation((key) => {
        switch (key) {
            case 'userId':
            return '123';  // The ID must match with TenantID
            case 'type':
            return 'Admin';  // The user type must be "Tenant"
            default:
            return null;
        }
        });
    });

        test("Test if can route to Admin Portal",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('link', { name: /Manage Accounts/i }))
            const toclick = screen.getByText("Admin Portal")
            fireEvent.click(toclick)
            expect(screen.getByText(/Create Landlord Account\s*\(Staff\/Engineers\)/i)).toBeInTheDocument()
        })

        test("Test if can route to Create Supervisor Page",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /^create landlord account ▾$/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Supervisor$/i }))
            expect(screen.getByRole("heading",{name:"Create Supervisor Account"})).toBeInTheDocument()
        })

        test("Test if can route to Create Staff Page",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /^create landlord account ▾$/i }))
            fireEvent.click(screen.getByRole('link', { name: /^Staff$/i }))
            expect(screen.getByRole("heading",{name:"Create Staff Account"})).toBeInTheDocument()
        })

        test("Test if can route to Manage accounts",async ()=>{
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('link', { name: /Manage Accounts/i }))
            expect(screen.getByRole("heading",{name:"Manage Accounts"})).toBeInTheDocument()
        })

        test("Test if can logout",async ()=>{
            const mockLogout = jest.spyOn(Authentication.prototype, 'logout');
            render(<MockNavBar/>)
            fireEvent.click(screen.getByRole('button', { name: /Logout/i }))
            expect(mockLogout).toHaveBeenCalled()
        })
    
    })

// function setup(){
//     const routes = [
//         {
//           path:"/adminportal/landingpage/:AdminID",
//           element:<AdminLandingPage/>
//         },
//         {
//           path:"/adminportal/createsupervisoracc/:AdminID",
//           element:<CreateSupervisor/>
//         },
//         {
//             path:"/adminportal/createstaffacc/:AdminID",
//             element:<CreateStaffAcc/>
//         },
//         {
//             path:"/adminportal/manageacc/:AdminID",
//             element:<ManageAccount/>
//         },
//         {
//             path:"/adminportal/*",
//             element:<AdminNavbar/>
//         }
//       ];
    
//       const router = createMemoryRouter(routes, {
//         initialEntries: ["/adminportal/landingpage/123"],
//       });
    
//       render(<RouterProvider router={router}/>);
    
//       return { router };
//     }