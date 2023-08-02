Feature: Sequence Diagram Flow
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

    Scenario: Create Supervisor account (not all information entered)
        Given I am in the Create Supervisor account page
        When I do not fill in all the fields 
        And click pn the Create Supervisor Account button
        Then an error message appears, reminding me to fill up all the fields 

    Scenario: Go to Create Staff account
        Given I am logged in as an Admin and at the Admin Portal landing page
        When I click on "Create Staff Account"
        Then I should be redirected to the Create Staff Account page 

    Scenario: Create Staff account
        Given I am in the Admin Portal landing page 
        When I fill in all required details
        And click on the Create Staff Account button
        Then a new Staff account is created and the credentials are recorded in the supabase table 

    Scenario: Create Staff account (not all information entered)
        Given I am in the Create Staff account page
        When I do not fill in all the fields 
        And click on the Create Staff Account button
        Then an error message appears, reminding me to fill up all the fields 

    Scenario: Go to Manage Accounts 
        Given I am logged in as an admin and at the admin landing page
        When I click on Manage Accounts 
        Then I am redirected to the Manage Accounts page 
        And I see the cards with all the registered buildings 
  
    Scenario: View Account information 
        Given I am in the Manage Accounts page
        When I click on a card 
        Then I am redirected to the Manage Account page for a particular building

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

    Scenario: Assign Staff 
        Given that I am in the View Ticket (Pending) page
        And PARC status is Pending
        And Status is Awaiting Review 
        When I choose a staff
        And click on the assign button
        Then ticket assignment to staff recorded in Supabase
        And ticket assigned alert appears 
        And page reloads 
        And ticket status changes to ticket assigned 

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
        Then I receieve a ticket rejected alert 
        And page reloads 
        And Ticket status changes to Ticket Rejected 

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
        Given that the Staff is in the Ticket details page 
        When the Start Works button is clicked
        Then a update successful alert notification is displayed
        And page reloads
        And ticket status updated to Works Started 
        And email sent to Tenant 

    Scenario: End Works
        Given that the Staff is in the Ticket details page 
        When the End Works button is clicked
        Then a update successful alert notification is displayed
        And page reloads
        And ticket status updated to Works Ended 
        And email is sent to Tenant 
    
    Scenario: Give Feedback 
        Given that ticket status is Works Ended 
        And Tenant is in the ticket details page 
        When Tenant clicks on the Give Feedback button
        And Tenant fills up feedback form 
        And Tenant fills up the number of stars
        And Tenant clicks on submit feedback
        Then feedback is recorded in supabase 
        And feedback submitted notification is displayed
        And page reloads with feedback and stars given 
        And email sent to Landlord 


    
