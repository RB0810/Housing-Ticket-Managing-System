Feature: Navigate via NavBar
    Scenario: Tenant clicks on Create Ticket on NavBar
        Given that the Tenant logged in 
        And at the Tenant Portal Landing page
        When the Tenant clicks on Create Ticket on the NavBar
        Then the Tenant is redirected to the create ticket page 

    Scenario: CLick on Pending on View Ticket on the NavBar 
        Given that Tenant is logged in 
        And at the Tenant Portal Landing Page 
        When Tenant clicks on View ticket 
        And clicks on Pending
        Then the Tenant is redirected to the Pending Tickets page 

    Scenario: CLick on Active on View Ticket on the NavBar 
        Given that Tenant is logged in 
        And at the Tenant Portal Landing Page 
        When Tenant clicks on View ticket 
        And clicks on Active
        Then the Tenant is redirected to the Active Tickets page 

    Scenario: CLick on Closed on View Ticket on the NavBar 
        Given that Tenant is logged in 
        And at the Tenant Portal Landing Page 
        When Tenant clicks on View ticket 
        And clicks on Closed
        Then the Tenant is redirected to the Closed Tickets page 

    