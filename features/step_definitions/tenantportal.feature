Feature: Tenant portal 
  Scenario: Log into Tenant Portal
    Given I am on the Tenant Portal login page
    When I enter valid credentials
    And click on the login button
    Then I should be redirected to Tenant portal landing page (and receive successful login alert)

  Scenario: Go to create ticket page
    Given I am in the Tenant portal landing page
    When I click on create ticket 
    Then I am redirected to the create ticket page
  
  Scenario: Create Ticket 
    Given I am in the create ticket page
    When I enter all ticket details
    And click on create service ticket 
    Then a ticket is created and recorded in Supabase (wih success notification)

  Scenario: Click on Pending tickets 
    Given that I am on the Tenant Portal Landing page
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
    Given that I am on the Tenant Portal Landing page
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
    Given that I am on the Tenant Portal Landing page
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

  
  Scenario: Creating a Supervisor account
    Given I am logged in as an admin
    When I navigate to the Supervisor creation page
    And fill in the required Supervisor details
    And click on the submit button to create Supervisor
    Then the Supervisor account should be created successfully

   Scenario: Creating a Staff account
    When I navigate to the Staff creation page
    And fill in the required Staff details
    And click on the submit button to create Staff
    Then the Staff account should be created successfully
