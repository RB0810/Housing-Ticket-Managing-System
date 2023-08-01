Feature: Admin Portal
  Scenario: Log into Admin Portal
    Given I am on the Admin Portal login page
    When I enter valid admin credentials
    And click on the login button
    Then I should be redirected to Admin portal landing page (and receive successful login alert)
 
  Scenario: Go to Create Supervisor account
    Given I am logged in as an admin and at the admin landing page
    When I click on "Create Supervisor (Landlord) Account"
    Then I should be redirected to the Create Supervisor Account page 

  Scenario: Create Supervisor account
    Given I am in the Create Supervisor account page 
    When I fill in all required details
    And click on the Create Supervisor Account button
    Then a new supervisor account is created and the credentials are recorded in the supabase table 

  # Scenario: Create Supervisor account (not all information entered)
  #   Given I am in the Create Supervisor account page
  #   When I do not fill in all the fields 
  #   And click pn the Create Supervisor Account button
  #   Then an error message appears, reminding me to fill up all the fields 

  Scenario: Go to Create Staff account
    Given I am logged in as an Admin and at the Admin Portal landing page
    When I click on "Create Staff Account"
    Then I should be redirected to the Create Staff Account page 

  Scenario: Create Staff account
    Given I am in the Admin Portal landing page 
    When I fill in all required details
    And click on the Create Staff Account button
    Then a new Staff account is created and the credentials are recorded in the supabase table 

  # Scenario: Create Staff account (not all information entered)
  #   Given I am in the Create Staff account page
  #   When I do not fill in all the fields 
  #   And click on the Create Staff Account button
  #   Then an error message appears, reminding me to fill up all the fields 

  Scenario: Go to Manage Accounts 
    Given I am logged in as an admin and at the admin landing page
    When I click on Manage Accounts 
    Then I am redirected to the Manage Accounts page 
    And I see the cards with all the registered buildings 
  
  Scenario: View Account information 
    Given I am in the Manage Accounts page
    When I click on a card 
    Then I am redirected to the Manage Account page for a particular building

Feature: Supervisor Portal 
   Scenario: Log into Supervisor Portal
    Given I am on the Supervisor Portal login page
    When I enter valid credentials
    And click on the login button
    Then I should be redirected to Supervisor portal landing page (and receive successful login alert)

  Scenario: Go to Create Tenant account
    Given I am at the Supervisor Portal landing page
    When I click on "Create Tenant Account"
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
