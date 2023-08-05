Feature: Staff Portal

    Scenario: Staff Logins in to Staff account via Staff Login Page
        Given Staff is on Landlord Login Page and Landlord Portal Login Page loads
        When Staff types in valid login credentials and Staff presses the Login button
        Then Staff Landing Page renders

    Scenario: View Staff Profile Page
        Given Staff is logged into the Landlord Portal
        When Staff clicks on the Profile button on Staff Landing Page
        Then Staff Profile Page is rendered

    Scenario: Set New Password
        Given Staff is on the Profile Page
        When Staff types in a new password and re-enters the same password into the text box and Staff clicks the reset password button
        Then A password reset alert pop-up is shown

    Scenario: View All Active Tickets
        Given Staff clicks on Active tickets button
        Then Active tickets Page is rendered

    Scenario: View Active Ticket
        Given Staff clicks on View Active Ticket button
        Then Active Ticket is rendered

    Scenario: View All Pending Tickets
        Given Staff clicks on Pending tickets button
        Then Pending tickets Page is rendered

    Scenario: View Pending Ticket
        Given Staff clicks on view Pending tickets button
        Then Pending Ticket is rendered

    Scenario: View All Closed Tickets
        Given Staff clicks on Closed tickets button
        Then Closed tickets Page is rendered

    Scenario: View Closed Ticket
        Given Staff clicks on Closed tickets button
        Then Closed Ticket is rendered

    Scenario: Update Status of ticket to Works Started
        Given Staff is on the view ticket page and Ticket status is Quotation Accepted
        When Staff clicks on Works Started button
        Then Ticket status changes to Works Started and Ticket with Works Started status is rendered

    Scenario: Update Status of ticket to Works Ended
        Given Staff is on the view ticket page and Ticket status is Works Started
        When Staff clicks on Works Ended button
        Then Ticket status changes to Works Ended and Ticket with Works Ended status is rendered

    Scenario: Upload Quotation
        Given Staff is on the view ticket page and Ticket status is Ticket Assigned
        When Staff sets quotation required to yes and Staff clicks on upload button and chooses a file to upload and Staff clicks submit button
        Then Ticket status is changed to Quotation Uploaded and Quotation is rendered in View Ticket Page and Ticket with Quotation Uploaded status is rendered

    Scenario: Restart Works
        Given Staff is on the view ticket page and Ticket status is Works Rejected
        When Staff clicks on Restart Works button
        Then Ticket status changes to Works Started and Ticket with Works Started status is rendered