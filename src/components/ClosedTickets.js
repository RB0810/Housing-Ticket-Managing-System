import React from 'react';
import './../styles/viewticket.css';

class ClosedTickets extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
      }
    
    render(){
      return(
        <div>
          <h1>Hello from Closed Tickets</h1>
        </div>
      )
    }
}

export default ClosedTickets;