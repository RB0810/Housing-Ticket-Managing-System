import React from 'react';
import ViewTicketNavbar from '../../components/viewticketnavbar';
import PendingTickets from '../../components/PendingTickets';
import ActiveTickets from '../../components/ActiveTickets';
import ClosedTickets from '../../components/ClosedTickets';
import { Route, Routes } from "react-router-dom";
import "./../../../src/styles/viewticket.css"

class viewticket extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
      }


    render(){
        return(
            <div>
                <ViewTicketNavbar/>
                <section>
                    <Routes>
                        <Route path="/viewticket/pendingtickets" element={<PendingTickets />}/>
                        <Route path="/viewticket/activetickets" element={<ActiveTickets />} />
                        <Route path="/viewticket/closedtickets" element={<ClosedTickets />} />
                    </Routes>
                </section> 
            </div>
        )
    }
}

export default viewticket;