Feature: Staff Portal
    Scenario: Log into Staff Portal
        Given I am on the Staff Portal login page
        When I enter valid credentials
        Then I should be redirected to Staff portal landing page (and receive successful login alert)

    Scenario: Click on Pending tickets 
        Given that I am on the Staff Portal Landing page
        When I click on Pending tickets 
        Then I am redirected to the view ticket page

    Scenario: View all Pending tickets 
        Given that I am in the View Tickets (Pending) page
        When there are pending tickets 
        Then the tickets are displayed 
    
    Scenario: View Pending ticket 
        Given that I am in the View Tickets (Pending) page
        When I click on View Ticket
        Then I am redirected to the View ticket page for that ticket 

    Scenario: Click on Active tickets 
        Given that I am on the Staff Portal Landing page
        When I click on Active tickets 
        Then I am redirected to the view ticket page 
    
    Scenario: View all Active tickets 
        Given that I am in the View Tickets (Active) page
        When there are Active tickets 
        Then the tickets are displayed 
    
    Scenario: View Active ticket 
        Given that I am in the View Tickets (Active) page
        When I click on View Ticket
        Then I am redirected to the View ticket page for that ticket 

    Scenario: Click on Closed tickets 
        Given that I am on the Staff Portal Landing page
        When I click on Closed tickets 
        Then I am redirected to the view ticket page 

    Scenario: View all closed tickets 
        Given that I am in the View Tickets (Closed) page
        When there are closed tickets 
        Then the tickets are displayed 
    
    Scenario: View closed ticket 
        Given that I am in the View Tickets (Closed) page
        When I click on View Ticket
        Then I am redirected to the View ticket page for that ticket 

