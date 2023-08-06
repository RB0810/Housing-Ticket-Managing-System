Feature: Tenant Portal Functionality

    Scenario: Login to Tenant Account
        Given Tenant has loaded the login page for Tenant Portal
        When Tenant enters valid account credentials
        And Tenant clicks "login" button
        Then Tenant should be redirected to the Tenant home page

    Scenario: Create new service ticket
        Given Tenant clicks on "Create Ticket"
        When Tenant fills in the required information
        When Tenant clicks "Create Service Ticket"
        Then Database should be updated with new service ticket

    Scenario: View all pending tickets
        Given Tenant clicks on "View Pending Tickets"
        Then Tenant should see all pending tickets in a table format

    Scenario: View all active tickets
        Given Tenant clicks on "View Active Tickets"
        Then Tenant should see all active tickets in a table format

    Scenario: View all closed tickets
        Given Tenant clicks on "View Closed Tickets"
        Then Tenant should see all closed tickets in a table format

    Scenario: View Tenant Account Information
        Given Tenant navigates to the "Profile" section through the Navbar
        Then Tenant's account information should be displayed

    Scenario: Set new password
        Given Tenant is in the "View Tenant Account Information" page
        When Tenant enters a new password
        When Tenant re-enters the new password
        And Tenant clicks on "Set New Password"
        Then Tenant should receive a success notification and value is updated in Database

    Scenario: View Quotation
        Given Tenant renavigates back to ACTIVE tickets
        When Tenant clicks on "View Ticket" for a sticket with status "Quotation Uploaded"
        Then Tenant should see the Quotation rendered using ReactPDFViewer

    Scenario: Download Quotation
        Given Tenant sees the Quotation rendered using ReactPDFViewer
        When Tenant clicks on the Download button
        Then Tenant should download the Quotation into their local computer

    Scenario: Accept Quotation
        Given Tenant clicks on "Accept Quotation"
        Then Ticket status should change to "Quotation Accepted"

    Scenario: Reject Quotation
        Given Tenant clicks on "Reject Quotation"
        Then Ticket status should change to "Quotation Rejected"

    Scenario: Submit feedback survey
        Given Ticket status is "Works Ended"
        When Tenant fills in the feedback survey
        When Tenant submits the feedback
        Then Ticket Status should change to "Feedback Submitted"

    Scenario: Reject work
        Given Tenant clicks on "Reject Work"
        Then Ticket status should change to "Work Rejected"
