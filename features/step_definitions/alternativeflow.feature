Feature: Navigate via NavBar
    Scenario: Tenant clicks on Create Ticket on NavBar
        Given that the Tenant logged in 
        And at the Tenant Portal Landing page
        When the Tenant clicks on Create Ticket on the NavBar
        Then the Tenant is redirected to the create ticket page 

    Scenario: CLick on Pending on View Ticket on the NavBar 
        Given that I am logged in 
        And at the Landing Page 
        When I click on View ticket 
        And click on Pending
        Then I am redirected to the Pending Tickets page 

    Scenario: CLick on Active on View Ticket on the NavBar 
        Given that I am logged in 
        And at the Landing Page 
        When I click on View ticket 
        And click on Active
        Then I am redirected to the Active Tickets page 

    Scenario: CLick on Closed on View Ticket on the NavBar 
        Given I am logged in 
        And at the Landing Page 
        When I click on View ticket 
        And click on Closed
        Then I am redirected to the Closed Tickets page 

    