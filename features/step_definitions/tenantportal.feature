Feature: Tenant Portal Functionality

Scenario: Login to Tenant Account
  Given Tenant has loaded the login page for Tenant Portal
  When Tenant enters valid account credentials
  And Tenant clicks "login" button
  Then Tenant should be redirected to the Tenant home page
  But if login is unsuccessful, an error notification for invalid credentials should appear

Scenario: View all pending tickets
  Given Tenant has logged into their tenant account successfully
  When Tenant navigates to the landing page
  And Tenant clicks on "View Pending Tickets"
  Then Tenant should see all pending tickets in a table format

Scenario: View all active tickets
  Given Tenant has logged into their tenant account successfully
  When Tenant navigates to the landing page
  And Tenant clicks on "View Active Tickets"
  Then Tenant should see all active tickets in a table format

Scenario: View all closed tickets
  Given Tenant has logged into their tenant account successfully
  When Tenant navigates to the landing page
  And Tenant clicks on "View Closed Tickets"
  Then Tenant should see all closed tickets in a table format

Scenario: Create new service ticket
  Given Tenant is logged in
  When Tenant navigates to the landing page
  And Tenant clicks on "Create Ticket"
  And Tenant fills in the required information
  And Tenant clicks "Create Service Ticket"
  Then Tenant should receive a success notification

Scenario: View Tenant Account Information
  Given Tenant is logged in
  When Tenant navigates to the "Profile" section through the Navbar
  Then Tenant's account information should be displayed

Scenario: Set new password
  Given Tenant is logged in and in the profile page
  When Tenant goes to the Profile page via NavBar
  And Tenant enters a new password
  And Tenant re-enters the new password
  And Tenant clicks on "Set New Password"
  Then Tenant should receive a success notification

Scenario: View Quotation
  Given Ticket status is Quotation uploaded
  When Tenant receives a notification of Quotation uploaded
  And Tenant clicks on "View Ticket"
  Then Tenant should see the Quotation rendered using ReactPDFViewer

Scenario: Download Quotation
  Given Ticket status is Quotation uploaded
  When Tenant receives a notification of Quotation uploaded
  And Tenant clicks on "View Ticket"
  And Tenant clicks on the download button in ReactPDFViewer
  Then Tenant should download the Quotation into their local computer

Scenario: Accept Quotation
  Given Ticket status is Quotation uploaded
  When Tenant receives a notification of Quotation uploaded
  And Tenant clicks on "View Ticket"
  And Tenant clicks on "Accept Quotation"
  Then Ticket status should change to Quotation Accepted

Scenario: Reject Quotation
  Given Ticket status is Quotation uploaded
  When Tenant receives a notification of Quotation uploaded
  And Tenant clicks on "View Ticket"
  And Tenant clicks on "Reject Quotation"
  Then Ticket status should change accordingly

Scenario: Submit feedback survey
  Given Ticket status is Works Ended
  When Tenant receives a notification of works completion
  And Tenant fills in the feedback survey
  And Tenant submits the feedback
  Then Feedback should be updated in the system

Scenario: Reject work
  Given Ticket status is Works Ended
  When Tenant receives a notification of works ended
  And Tenant goes to View Ticket
  And Tenant clicks on "Reject Work"
  Then Ticket status should be updated
