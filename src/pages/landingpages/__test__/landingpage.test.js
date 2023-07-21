import { render, screen } from '@testing-library/react';
import LandingPage from '../landingpage';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import AdminLogin from '../../login/adminlogin';
import LandlordLogin from '../../login/landlordlogin';

const MockGoToLogin = ()=>{
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/landlordlogin" element={<LandlordLogin />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
            </Routes>
        </MemoryRouter>
    )
}
describe("Testing landing page functionality", ()=>{
    test("Click on Admin", ()=>{
        render(<MockGoToLogin/>)
        const adminImage = screen.getByAltText('Admin')
        const adminButton = adminImage.parentElement.querySelector('button')
        fireEvent.click(adminButton)
        expect(screen.getByText("Manage Landlords and Properties!")).toBeInTheDocument()
    })

    test("Click on Landlord", ()=>{
        render(<MockGoToLogin/>)
        const landLordImage = screen.getByAltText('Landlord')
        const landLordButton = landLordImage.parentElement.querySelector('button')
        fireEvent.click(landLordButton)
        expect(screen.getByText("Manage Tickets and Tenants!")).toBeInTheDocument()
    })
})

