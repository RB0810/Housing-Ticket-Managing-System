Feature: Admin Portal
  Scenario: Log into Admin Portal
    Given I am on the Admin Portal login page
    When I enter valid admin credentials
    Then I should be redirected to Admin portal landing page 
 
  Scenario: Go to Create Supervisor account
    Given I am logged in as an admin and at the admin landing page
    When I click on "Create Supervisor (Landlord) Account"
    Then I should be redirected to the Create Supervisor Account page 

  Scenario: Create Supervisor account
    Given I am in the Create Supervisor account page 
    When I fill in all required details
    Then a new supervisor account is created and the credentials are recorded in the supabase table 

  Scenario: Create Supervisor account (not all information entered)
    Given I am in the Create Supervisor account page
    When I do not fill in all the fields 
    Then an error message appears, reminding me to fill up all the fields 

  Scenario: Go to Create Staff account
    Given I am logged in as an Admin and at the Admin Portal landing page
    When I click on "Create Staff Account"
    Then I should be redirected to the Create Staff Account page 

  Scenario: Create Staff account
    Given I am in the Admin Portal landing page 
    When I fill in all required details
    Then a new Staff account is created and the credentials are recorded in the supabase table 

  Scenario: Create Staff account (not all information entered)
    Given I am in the Create Staff account page
    When I do not fill in all the fields 
    Then an error message appears, reminding me to fill up all the fields 

  Scenario: Go to Manage Accounts 
    Given I am logged in as an admin and at the admin landing page
    When I click on Manage Accounts 
    Then I am redirected to the Manage Accounts page 
  
  Scenario: View Account information 
    Given I am in the Manage Accounts page
    When I click on a card 
    Then I am redirected to the Manage Account page for a particular building

