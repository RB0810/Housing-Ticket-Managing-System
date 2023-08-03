Feature: Supervisor Portal 
   Scenario: Log into Supervisor Portal
    Given I am on the Supervisor Portal login page
    When I enter valid credentials
    And click on the login button
    Then I should be redirected to Supervisor portal landing page (and receive successful login alert)

  Scenario: Go to Create Tenant account
    Given I am at the Supervisor Portal landing page
    When I click on Create Tenant Account
    Then I should be redirected to the Create Tenant Account page 

  Scenario: Create Tenant account
    Given I am in the Create Tenant account page 
    When I fill in all required details
    And click on the Create Tenant Account button
    Then a new Tenant account is created and the credentials are recorded in the supabase table 

  Scenario: Click on Pending tickets 
    Given that I am on the Supevisor Portal Landing page
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

  Scenario: Assign Staff 
    Given that I am in the View Ticket (Pending) page
    And PARC status is Pending
    And Status is Awaiting Review 
    When I choose a staff
    And click on the assign button
    Then I assign that particular ticket to a staff 

  Scenario: Reject Ticket 
    Given that I am in the View Ticket (Pending) page
    And PARC status is Pending
    And Status is Awaiting Review 
    When I click on the reject button
    Then I am redirected to a reason for reject form 

  Scenario: Submit Reject Ticket 
    Given that I have filled in the reason for reject
    When I click on Submit button
    Then the page refreshes 
    And PARC status changed to CLOSED 
    And ticket status changed to ticket rejected
    Then 
  
  Scenario: Click on Active tickets 
    Given that I am on the Supervisor Portal Landing page
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
    Given that I am on the Supevisor Portal Landing page
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

