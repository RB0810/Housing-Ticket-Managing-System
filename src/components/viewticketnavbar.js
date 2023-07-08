import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './../../src/styles/viewticket.css';

function CustomLink({ to, children, imgsrc, ...props }) {
    // useMatch hook - compares the current path to the path
    // useResolvedPath hook - takes a relative path and gives you full path that you are accessing
    
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true }); // Entire path must match
    
    return (
        <li className={isActive ? "active" : ""}>
            {/* <img src = {imgsrc}></img> */}
            <Link to={to} {...props}>
                <h3>{children}</h3>
            </Link>
        </li>
    );
    }


class viewticketnavbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
      }

    render(){
        return(
            <div>
                <div className='viewtixh1'>
                    <h1>View Tickets</h1>
                </div>
                
                <nav className='ticketNav'>
                    <li className='ticket nav li'>
                        <CustomLink to="/viewticket/pendingtickets" /*imgsrc="/housingportallogo.png"*/>Pending</CustomLink>
                        <CustomLink to="/viewticket/activetickets" /*imgsrc="/housingportallogo.png"*/>Active</CustomLink>
                        <CustomLink to="/viewticket/closedtickets" /*imgsrc="/housingportallogo.png"*/>Closed</CustomLink>
                        
                        {/* <Link to="/pendingticket" className="ticketlink">
                            <img src="/housingportallogo.png" className='img'></img>
                            <h3 className='ticket view h3'>Pending</h3>
                        </Link>

                        <Link to="/activetickets" className="ticketlink">
                            <img src="/housingportallogo.png" className='img'></img>
                            <h3 className='ticket view h3'>Active</h3>
                        </Link>

                        <Link to="/closedtickets" className="ticketlink">
                            <img src="/housingportallogo.png" className='img'></img>
                            <h3 className='ticket view h3'>Closed</h3>
                        </Link> */}
                    </li>
                </nav>

                <nav className='Top Nav Bar'>
                    <ul className='ticketlist'>
                        <h3>Ticket ID</h3>
                        <h3>Request</h3>
                        <h3>Date</h3>
                        <h3>Landlord ID</h3>
                        <h3>Property</h3>
                        <h3>Status</h3>
                        <h3></h3>
                    </ul>
                </nav>
            </div>
            
        )
    }
}

export default viewticketnavbar;