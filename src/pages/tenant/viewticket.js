import React, { useState, useEffect } from 'react';
import "./../../../src/styles/viewticket.css";
import BasicTabs from '../../components/TicketTabs';

class viewticket extends React.Component{

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
                <div className='Tabs'>
                  <BasicTabs/>
                </div>
            </div>
        )
    }
}

export default viewticket;