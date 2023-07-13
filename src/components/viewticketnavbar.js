import React from 'react';
import './../../src/styles/viewticket.css';

class viewticketnavbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            barType: this.props.barType,
        }
      }

    render(){
        return(
            <div>
                <nav className='Top Nav Bar'>
                    <ul className='ticketlabel'>
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