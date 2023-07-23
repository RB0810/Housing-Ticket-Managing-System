import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import StaffLandingPage from "../stafflandingpage";
import StaffPortal from "../../portal/staffportal";
import { createMemoryRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

function setUpMemRoute() {
    const routes = [
      {
        path:"/staffportal/landingpage/:StaffID",
        element:<StaffLandingPage/>
      },
      {
        path:"/staffportal/tickets/:StaffID/:PARCStatus",
        element:<StaffPortal/>
      },
    ];
  
    const router = createMemoryRouter(routes, {
      initialEntries: ["/staffportal/landingpage/123"],
    });
  
    render(<RouterProvider router={router}/>);
  
    return { router };
  }
  

describe("Testing routing functions", ()=>{
    test("Click on pending tickets", async ()=>{

        const {router} = setUpMemRoute()
        const buttontoclick = screen.getByRole("button",{name:"Pending Tickets"})
        fireEvent.click(buttontoclick)

        await waitFor(()=>{

            expect(router.state.location.pathname).toEqual("/staffportal/tickets/123/pending")

        })

    })

    test("Click on active tickets", async ()=>{

        const {router} = setUpMemRoute()
        const buttontoclick = screen.getByRole("button",{name:"Active Tickets"})
        fireEvent.click(buttontoclick)

        await waitFor(()=>{

            expect(router.state.location.pathname).toEqual("/staffportal/tickets/123/active")

        })

    })

    test("Click on closed tickets", async ()=>{

        const {router} = setUpMemRoute()
        const buttontoclick = screen.getByRole("button",{name:"Closed Tickets"})
        fireEvent.click(buttontoclick)

        await waitFor(()=>{

            expect(router.state.location.pathname).toEqual("/staffportal/tickets/123/closed")

        })

    })
})