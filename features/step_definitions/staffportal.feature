Feature: Staff Portal
  Scenario: Log into Staff Portal
    Given I am on the Staff Portal login page
    When I enter valid credentials
    And click on the login button
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

  Scenario: Upload Quotation
    Given that I am in Ticket Details and I am logged into Staff portal 
    And Ticket status is ticket assigned 
    And PARC status is pending
    When I click on choose file 
    And choose a file from my local computer 
    And click the submit button
    Then the file is uploaded to supabase storage (quotation attatchment path updated in supabase table)
    And I receive a Quotation successfully uploaded alert message
    And the page reloads with pdf viewer rendered 
    And PARC status changed to Active
    And ticket status changed to Quotation uploaded 

  Scenario: Reject Quotation
    Given that I am in Ticket Details and I am logged into Staff portal 
    And Ticket status is ticket assigned 
    And PARC status is pending
    When I change Quotation required to No
    And I press submit 
    Then I receive a success alert message
    And the page reloads 
    And PARC status is Active
    And Ticket status is Ticket Assigned 

  Scenario: Start Works 
    Given that 

  
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

