const { Given, When, Then, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { async } = require("q");

let driver;

Given('I am on the Supervisor Portal login page', async function () {
    driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();
    
    await driver.get("http://localhost:3000/landlordlogin");
    let welctext = await driver.findElement(By.className("wlcText")).getText();
    assert.equal(welctext, "Landlord Portal\nLogin");
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

Given('I am at the Supervisor Portal landing page', async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/landingpage/999"
      );
});

When('I click on create tenant account', async function () {
    let create_tenant_button = await driver.findElement(By.id("create-tenant-button"))
    create_tenant_button.click();
});

Then('I should be redirected to the Create Tenant Account page', async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/createtennantacc/999"
      );
});

Given('I am in the Create Tenant account page', async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/createtennantacc/999"
      );
});

When('I fill in all required details', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('click on the Create Tenant Account button', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('a new Tenant account is created and the credentials are recorded in the supabase table', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('that I am on the Supevisor Portal Landing page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on Pending tickets', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I am redirected to the view ticket page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('that I am in the View Tickets \\(Pending) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('there are pending tickets', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('the tickets are displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('that I am in the View Tickets \\(Pending) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on View Ticket', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I am redirected to the View ticket page for that ticket', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('that I am in the View Ticket \\(Pending) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('PARC status is Pending', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('Status is Awaiting Review', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I choose a staff', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('click on the assign button', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I assign that particular ticket to a staff', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('that I am in the View Ticket \\(Pending) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('PARC status is Pending', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('Status is Awaiting Review', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on the reject button', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I am redirected to a reason for reject form', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I have filled in the reason for reject', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('I click on Submit button', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('the page refreshes', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('PARC status changed to CLOSED', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('ticket status changed to ticket rejected', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I am on the Supervisor Portal Landing page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('I click on Active tickets', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('I am redirected to the view ticket page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I am in the View Tickets \\(Active) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('there are Active tickets', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('the tickets are displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I am in the View Tickets \\(Active) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('I click on View Ticket', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('I am redirected to the View ticket page for that ticket', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I am on the Supevisor Portal Landing page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('I click on Closed tickets', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('I am redirected to the view ticket page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});



Given('that I am in the View Tickets \\(Closed) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('there are closed tickets', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('the tickets are displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I am in the View Tickets \\(Closed) page', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('I click on View Ticket', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I am redirected to the View ticket page for that ticket', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

// After(async function () {
//     await driver.quit();
// });
