const { Given, When, Then, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { createClient } = require("@supabase/supabase-js");


// supabase client
const supabaseUrl = 'https://mnfsjgaziftztwiarlys.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8'
const supabase = createClient(supabaseUrl, supabaseKey)

let driver;

// TODO: create a new tenant account for testing
// create new tickets for supervisor account
BeforeAll(async function () {
    let { data, error } = await supabase // Create a new ticket
      .from("Service Request")
      .insert([
        {
          ServiceRequestID: 999990,
          Name: "TESTINGTICKETJEST",
          TenantID: 999,
          PARCStatus: "PENDING",
          SubmittedDateTime: "2021-04-01 00:00:00",
          Category: "TESTINGCATEGORYJEST",
        },
      ])
      .select();
    if (error) {
      throw error;
    } else {
      console.log("Created a new PENDING ticket for testing.");
    }
  
    let { data2, error2 } = await supabase // Create a new ticket
      .from("Service Request")
      .insert([
        {
          ServiceRequestID: 999991,
          Name: "TESTINGTICKETJEST",
          TenantID: 999,
          PARCStatus: "ACTIVE",
          SubmittedDateTime: "2021-04-01 00:00:00",
          Category: "TESTINGCATEGORYJEST",
        },
      ])
      .select();
    if (error2) {
      throw error2;
    } else {
      console.log("Created a new ACTIVE ticket for testing.");
    }
  
    let { data3, error3 } = await supabase // Create a new ticket
      .from("Service Request")
      .insert([
        {
          ServiceRequestID: 999992,
          Name: "TESTINGTICKETJEST",
          TenantID: 999,
          PARCStatus: "CLOSED",
          SubmittedDateTime: "2021-04-01 00:00:00",
          Category: "TESTINGCATEGORYJEST",
        },
      ])
      .select();
    if (error3) {
      throw error3;
    } else {
      console.log("Created a new CLOSED ticket for testing.");
    }
  
  });


  AfterAll(async function () {
    let { data, error } = await supabase // Delete Created Tickets
      .from("Service Request")
      .delete()
      .match({ ServiceRequestID: 999990 });
    if (error) {
      throw error;
    } else {
      console.log("Deleted PENDING ticket for testing.");
    }
  
    let { data2, error2 } = await supabase // Delete Created Tickets
      .from("Service Request")
      .delete()
      .match({ ServiceRequestID: 999991 });
    if (error2) {
      throw error2;
    } else {
      console.log("Deleted ACTIVE ticket for testing.");
    }
  
    let { data3, error3 } = await supabase // Delete Created Tickets
      .from("Service Request")
      .delete()
      .match({ ServiceRequestID: 999992 });
    if (error3) {
      throw error3;
    } else {
      console.log("Deleted CLOSED ticket for testing.");
    }

    driver.quit();
    });

Given('I am on the Supervisor Portal login page', async function () {
    driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();

    await driver.get("http://localhost:3000/landlordlogin");
});

When('I enter valid credentials', async function () {
    const emailfield = await driver.findElement(By.id("landlord-login-email-textfield"))
    emailfield.sendKeys("testsupervisor@gmail.com")

    const passwordfield = await driver.findElement(By.id("landlord-login-password-textfield"))
    passwordfield.sendKeys("testsupervisor123")
});

When('click on the login button', async function () {
    let login_button = await driver.findElement(By.id("landlord-login-button"))
    login_button.click();
});

Then('I should be redirected to Supervisor portal landing page \\(and receive successful login alert)', async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/landingpage/999"
    );
});

// Given('I am at the Supervisor Portal landing page', async function () {
//     await driver.get("http://localhost:3000/supervisorportal/landingpage/999");
// });

// When('I click on create tenant account', async function () {
//     let create_tenant_button = await driver.findElement(By.id("create-tenant-button"))
//     create_tenant_button.click();
// });

// Then('I should be redirected to the Create Tenant Account page', async function () {
//     assert.equal(
//         await driver.getCurrentUrl(),
//         "http://localhost:3000/supervisorportal/createtennantacc/999"
//     );
// });

// Given('I am in the Create Tenant account page', async function () {
//     assert.equal(
//         await driver.getCurrentUrl(),
//         "http://localhost:3000/supervisorportal/createtennantacc/999"
//     );
// });

// // When('I fill in all required details', async function () {
// //     const usernamefield = await driver.findElement(By.id("supervisor-portal-create-tenant-username-textfield"));
// //     usernamefield.sendKeys('testtenant998');
// //     const emailfield = await driver.findElement(By.id("supervisor-portal-create-tenant-email-textfield"));
// //     emailfield.sendKeys('testtenant998@gmail.com');
// //     const passwordfield = await driver.findElement(By.id("supervisor-portal-create-tenant-password-textfield"));
// //     passwordfield.sendKeys('password123');
// //     const confirmpasswordfield = await driver.findElement(By.id("supervisor-portal-create-tenant-repassword-textfield"));
// //     confirmpasswordfield.sendKeys('password123');
// //     const phonefield = await driver.findElement(By.id("supervisor-portal-create-tenant-phone-number-textfield"));
// //     phonefield.sendKeys('3757');
// //     const tradetypefield = await driver.findElement(By.id("supervisor-portal-create-tenant-trade-type-textfield"));
// //     tradetypefield.sendKeys('test trade');
// //     const monthlyrentalfield = await driver.findElement(By.id("supervisor-portal-create-monthly-rent-textfield"));
// //     monthlyrentalfield.sendKeys('999');
// //     const commencementdatefield = await driver.findElement(By.id("supervisor-portal-create-tenant-commencement-date-textfield"));
// //     commencementdatefield.sendKeys('2023-08-05');
// //     const terminationdatefield = await driver.findElement(By.id("supervisor-portal-create-tenant-termination-date-textfield"));
// //     terminationdatefield.sendKeys('2023-08-06');
// //     const unitareatextfield = await driver.findElement(By.id("supervisor-portal-create-tenant-unit-area-textfield"));
// //     unitareatextfield.sendKeys('999');
// //     const numberofunitstextfield = await driver.findElement(By.id("supervisor-portal-create-tenant-number-of-units-textfield"));
// //     numberofunitstextfield.sendKeys('1');
// //     const unitnumbertextfield = await driver.findElement(By.id("0"));
// //     unitnumbertextfield.sendKeys("test unit 999");

// // });

// // When('click on the Create Tenant Account button', async function () {
// //     let create_tenant_button = await driver.findElement(By.id("supervisor-portal-create-tenant-submit-button"))
// //     create_tenant_button.click();
// // });

// // Then('a new Tenant account is created and the credentials are recorded in the supabase table', async function () {


// // });

// Given('that I am on the Supevisor Portal Landing page', async function () {
//     await driver.get('http://localhost:3000/supervisorportal/landingpage/999')
// });

// When('I click on Pending tickets', async function () {
//     const view_pending_tickets_button = await driver.findElement(By.id("view-pending"))
//     view_pending_tickets_button.click();
// });

// Then('I am redirected to the view ticket page', async function () {
//     assert.equal(driver.getCurrentUrl(), 'http://localhost:3000/supervisorportal/tickets/999/pending');
// });

// Given('that I am in the View Tickets \\(Pending) page', async function () {
//     await driver.get('http://localhost:3000/supervisorportal/tickets/999/pending');
// });

// When('I click on View Ticket', async function () {
//     // click on view ticket button in first row
// });

// Then('I am redirected to the View ticket page for that ticket', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Given('that I am in the View Ticket \\(Pending) page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Given('PARC status is Pending', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Given('Status is Awaiting Review', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// When('I choose a staff', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// When('click on the assign button', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Then('I assign that particular ticket to a staff', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Given('that I am in the View Ticket \\(Pending) page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Given('PARC status is Pending', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Given('Status is Awaiting Review', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// When('I click on the reject button', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Then('I am redirected to a reason for reject form', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Given('that I have filled in the reason for reject', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// When('I click on Submit button', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('the page refreshes', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('PARC status changed to CLOSED', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('ticket status changed to ticket rejected', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Given('that I am on the Supervisor Portal Landing page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// When('I click on Active tickets', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('I am redirected to the view ticket page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Given('that I am in the View Tickets \\(Active) page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// When('there are Active tickets', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Then('the tickets are displayed', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Given('that I am in the View Tickets \\(Active) page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// When('I click on View Ticket', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('I am redirected to the View ticket page for that ticket', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Given('that I am on the Supevisor Portal Landing page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// When('I click on Closed tickets', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('I am redirected to the view ticket page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });



// Given('that I am in the View Tickets \\(Closed) page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// When('there are closed tickets', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Then('the tickets are displayed', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// Given('that I am in the View Tickets \\(Closed) page', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });


// When('I click on View Ticket', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });

// Then('I am redirected to the View ticket page for that ticket', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
// });
