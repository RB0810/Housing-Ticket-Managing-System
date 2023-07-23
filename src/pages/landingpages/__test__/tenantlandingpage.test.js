import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import { createMemoryRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import TenantLandingPage from "../tenantlandingpage";
import TenantPortal from "../../portal/tenantportal";
import CreateTicket from "../../tenant/createticket";

function setup(){
    const routes = [
        {
          path:"/tenantportal/landingpage/:TenantID",
          element:<TenantLandingPage/>
        },
        {
          path:"/tenantportal/createticket/:TenantID",
          element:<TenantPortal/>
        },
        {
            path:"/tenantportal/createticket/:TenantID",
            element:<CreateTicket/>
        }
      ];
    
      const router = createMemoryRouter(routes, {
        initialEntries: ["/tenantportal/landingpage/123"],
      });
    
      render(<RouterProvider router={router}/>);
    
      return { router };
    }

describe("Testing if routing works for supervisor portal",()=>{
        test("Test if can route to pending tickets",async ()=>{
            const {router} = setup()
            const buttontoclick = screen.getByRole("button",{name:"Pending Tickets"})
            fireEvent.click(buttontoclick)
    
            await waitFor(()=>{
    
                expect(router.state.location.pathname).toEqual("/tenantportal/tickets/123/pending")
    
            })
        })
    
        test("Test if can route to active tickets",async ()=>{
            const {router} = setup()
            const buttontoclick = screen.getByRole("button",{name:"Active Tickets"})
            fireEvent.click(buttontoclick)
    
            await waitFor(()=>{
    
                expect(router.state.location.pathname).toEqual("/tenantportal/tickets/123/active")
    
            })
        })
    
        test("Test if can route to closed tickets",async ()=>{
            const {router} = setup()
            const buttontoclick = screen.getByRole("button",{name:"Closed Tickets"})
            fireEvent.click(buttontoclick)
    
            await waitFor(()=>{
    
                expect(router.state.location.pathname).toEqual("/tenantportal/tickets/123/closed")
    
            })
        })

        test("Test if can route to create ticket",async ()=>{
            const {router} = setup()
            const buttontoclick = screen.getByRole("button",{name:"Create Ticket"})
            fireEvent.click(buttontoclick)
    
            await waitFor(()=>{
    
                expect(router.state.location.pathname).toEqual("/tenantportal/createticket/123")
    
            })
        })
    
    })