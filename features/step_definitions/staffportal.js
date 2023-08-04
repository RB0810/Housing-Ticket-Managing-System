// const { Given, When, Then } = require("@cucumber/cucumber");
// const { Builder, By, Key, until, Select } = require("selenium-webdriver");
// const assert = require("assert");
// const chrome = require("selenium-webdriver/chrome");

// let driver;

//   //Scenario 1:
//     Given('Staff is on Landlord Login Page and Landlord Portal Login Page loads', async function () {
//       // Write code here that turns the phrase above into concrete actions
//       driver = await new Builder()
//         .forBrowser("chrome")
//         .setChromeOptions(new chrome.Options())
//         .build();
//       await driver.get("http://localhost:3000/landlordlogin");
//       assert.equal(
//         await driver.findElement(By.className("wlcText")).getText(),
//         "Landlord Portal\nLogin"
//     );
//     });


//     When("Staff types in valid login credentials and Staff presses the Login button", async function () {
//       // Write code here that turns the phrase above into concrete actions
//       await driver.findElement(By.id("landlord-login-email-textfield" )).sendKeys("smith@gmail.com");
//       await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
//       await driver.findElement(By.id("landlord-login-login-button" )).click();
//     });

//     Then('Staff Landing Page renders', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//   //Scenario 2:

//     Given('Staff is logged into the Landlord Portal', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     When('Staff clicks on the {string} button on Staff Landing Page', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('Staff Profile Page is rendered', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });


// //Scenario 3:

//     Given('Staff is on the Profile Page', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     When('Staff types in a new password and re-enters the same password into the text box and Staff clicks the {string} button', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('A password reset alert pop-up is shown', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//   //Scenario 4:

//     Given('Staff clicks on {string} tickets button', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('Active tickets Page is rendered', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });


// //Scenario 5:

//     Given('Staff clicks on {string} button', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('Ticket is rendered', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

// //Scenario 6:

//     Given('Staff clicks on {string} tickets button', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('Pending tickets Page is rendered', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

// //Scenario 7:

//     Given('Staff clicks on {string} tickets button', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('Ticket is rendered', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

// //Scenario 8:

//     Given('Staff clicks on {string} tickets button', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('Closed tickets Page is rendered', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

// //Scenario 9:

//     Given('Staff clicks on {string} tickets button', function (string) {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

//     Then('Ticket is rendered', function () {
//       // Write code here that turns the phrase above into concrete actions
//       return 'pending';
//     });

// //Scenario 10:

//      Given('Staff is on the view ticket page and Ticket status is {string}', function (string) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      When('Staff clicks on {string} button', function (string) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      Then('Ticket status changes to {string} and Ticket with {string} status is rendered', function (string, string2) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

// //Scenario 11:

//      Given('Staff is on the view ticket page and Ticket status is {string}', function (string) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      When('Staff clicks on {string} button', function (string) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      Then('Ticket status changes to {string} and Ticket with {string} status is rendered', function (string, string2) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

// //Scenario 12:

//      Given('Staff is on the view ticket page and Ticket status is {string}', function (string) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      When('Staff sets {string} to {string} and Staff clicks on {string} button and chooses a file to upload and Staff clicks {string} button', function (string, string2, string3, string4) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      Then('Ticket status is changed to {string} and Quotation is rendered in View Ticket Page and Ticket with {string} status is rendered', function (string, string2) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });


// //Scenario 13:

//      Given('Staff is on the view ticket page and Ticket status is {string}', function (string) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      When('Staff clicks on {string} button', function (string) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });

//      Then('Ticket status changes to {string} and Ticket with {string} status is rendered', function (string, string2) {
//        // Write code here that turns the phrase above into concrete actions
//        return 'pending';
//      });