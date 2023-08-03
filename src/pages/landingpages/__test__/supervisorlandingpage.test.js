import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import { createMemoryRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SupervisorLandingPage from "../supervisorlandingpage";
import SupervisorPortal from "../../portal/supervisorportal";
import CreateTenantAcc from "../../supervisor/createtenantacc";
import Cookies from 'js-cookie';
jest.mock('js-cookie');

function setup(){
    const routes = [
        {
          path:"/supervisorportal/landingpage/:SupervisorID",
          element:<SupervisorLandingPage/>
        },
        {
          path:"/supervisorportal/tickets/:SupervisorID/:PARCStatus",
          element:<SupervisorPortal/>
        },
        {
            path:"/supervisorportal/createtennantacc/:SupervisorID",
            element:<CreateTenantAcc/>
        }
      ];
    
      const router = createMemoryRouter(routes, {
        initialEntries: ["/supervisorportal/landingpage/123"],
      });
    
      render(<RouterProvider router={router}/>);
    
      return { router };
    }

describe("Testing if routing works for supervisor portal",()=>{
    beforeEach(() => {
        Cookies.get.mockImplementation((key) => {
        switch (key) {
            case 'userId':
            return '123';  // The ID must match with StaffID
            case 'type':
            return 'Supervisor';  // The user type must be "Staff"
            default:
            return null;
        }
        });
    });

    test("Test if can route to pending tickets",async ()=>{
        const {router} = setup()
        const buttontoclick = screen.getByRole("button",{name:"Pending Tickets"})
        fireEvent.click(buttontoclick)

        await waitFor(()=>{

            expect(router.state.location.pathname).toEqual("/supervisorportal/tickets/123/pending")

        })
    })

    test("Test if can route to active tickets",async ()=>{
        const {router} = setup()
        const buttontoclick = screen.getByRole("button",{name:"Active Tickets"})
        fireEvent.click(buttontoclick)

        await waitFor(()=>{

            expect(router.state.location.pathname).toEqual("/supervisorportal/tickets/123/active")

        })
    })

    test("Test if can route to closed tickets",async ()=>{
        const {router} = setup()
        const buttontoclick = screen.getByRole("button",{name:"Closed Tickets"})
        fireEvent.click(buttontoclick)

        await waitFor(()=>{

            expect(router.state.location.pathname).toEqual("/supervisorportal/tickets/123/closed")

        })
    })

    test("Test if can route to create tenants", async()=>{
        const {router} = setup()
        const buttontoclick = screen.getByRole("button",{name:"Create Tenant Account"})
        fireEvent.click(buttontoclick)
        console.log("HELLOTHERE")

        await waitFor(()=>{

            expect(router.state.location.pathname).toEqual("/supervisorportal/createtennantacc/123")

        })
    })
})
