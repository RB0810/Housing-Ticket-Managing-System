Feature: Admin Portal Functionality

  Scenario: Logging into Admin Portal
    Given I am on the Admin Portal login page
    When I enter valid admin credentials
    And click on the login button
    Then I should be logged in successfully

  Scenario: Creating a Supervisor account
    Given I am logged in as an admin
    When I navigate to the Supervisor creation page
    And fill in the required details
    And click on the submit button
    Then the Supervisor account should be created successfully
