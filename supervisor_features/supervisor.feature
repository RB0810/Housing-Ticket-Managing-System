Feature: Supervisor Portal navigation
    Scenario: Log into Supervisor Portal
        Given I am on the Supervisor Portal login page
        When I enter valid credentials
        And click on the login button
        Then I should be redirected to Supervisor portal landing page

    Scenario: Go to Create Tenant account
        Given I am at the Supervisor Portal landing page
        When I click on Create Tenant Account
        Then I should be redirected to the Create Tenant Account page

    Scenario: Click on Pending tickets
        Given that I am on the Supevisor Portal Landing page
        When I click on Pending tickets
        Then I am redirected to the view ticket page

    Scenario: Click on Active tickets
        Given that I am on the Supervisor Portal Landing page
        When I click on Active tickets
        Then I am redirected to the view ticket page

    Scenario: Click on Closed tickets
        Given that I am on the Supevisor Portal Landing page
        When I click on Closed tickets
        Then I am redirected to the view ticket page
