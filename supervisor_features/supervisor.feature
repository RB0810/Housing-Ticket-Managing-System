Feature: Supervisor Portal navigation
    Scenario: Log into Supervisor Portal
        Given I am on the Supervisor Portal login page
        When I enter valid credentials
        And click on the login button
        Then I should be redirected to Supervisor portal landing page

    Scenario: Go to Create Tenant account
        When I click on Create Tenant Account
        Then I should be redirected to the Create Tenant Account page

Scenario: Create Tenant account
        Given I am in the Create Tenant account page
        When I fill in all required Tenant details
        And I click on the Create Tenant Account button
        Then I should receive a Tenant account created successfully alert

    Scenario: Click on Pending tickets
        When I click on Pending tickets
        Then I am redirected to the view pending tickets page

    Scenario: Click on Active tickets
        When I click on Active tickets
        Then I am redirected to the view active tickets page

    Scenario: Click on Closed tickets
        When I click on Closed tickets
        Then I am redirected to the view closed tickets page
