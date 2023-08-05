Feature: Admin Portal
  Scenario: Log into Admin Portal
    Given I am at the landing page
    When I enter correct credentials for admin
    Then I am redirected to Admin portal landing page
  
  Scenario: Create Supervisor Account
    Given I click on Create Supervisor
    When I enter all Supervisor information
    Then a Supervisor is created

  Scenario: Create Staff Account 
    Given I click on Create Staff
    When I enter all Staff information
    Then a Staff is created
    
  Scenario: Manage Accounts 
    Given I click on Manage Accounts
    When I click on a specific card 
    Then I see Building details 
  


