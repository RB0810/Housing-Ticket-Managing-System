import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import LandingPage from '../../pages/landingpages/landingpage';
import AdminLogin from '../../pages/login/adminlogin';
import LandlordLogin from '../../pages/login/landlordlogin';
import TenantLogin from '../../pages/login/tenantlogin';

const MockNavBar= ()=>{
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/*" element={<Navbar />} />
            </Routes>
            <div className="container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/landlordlogin" element={<LandlordLogin />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    <Route path="/tenantlogin" element={<TenantLogin />} />
                </Routes>
            </div>
        </MemoryRouter>
    )
}

describe("We test if the navigation bar directs users to the selected pages",()=>{
    test("Click on housing portal brings you to the landing page",()=>{
        render(<MockNavBar/>)
        const housing = screen.getByText("Housing Portal")
        fireEvent.click(housing)
        expect(screen.getByText("Tenant Account")).toBeInTheDocument()
    })

    test("Click Landlord Login brings you to Landlord Login Page", ()=>{
        render(<MockNavBar/>)
        const landlord = screen.getByText("Landlord Login")
        fireEvent.click(landlord)
        expect(screen.getByText("Manage Tickets and Tenants!")).toBeInTheDocument()
    })

    test("Click Admin Login brings you to Admin Login Page", ()=>{
        render(<MockNavBar/>)
        const admin = screen.getByText("Admin Login")
        fireEvent.click(admin)
        expect(screen.getByText("Manage Landlords and Properties!")).toBeInTheDocument()
    })

    test("Click Tenant Login brings you to Tenant Login Page", ()=>{
        render(<MockNavBar/>)
        const tenant = screen.getByText("Tenant Login")
        fireEvent.click(tenant)
        expect(screen.getByText("Tenant Portal Login")).toBeInTheDocument()
    })

})