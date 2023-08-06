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
    driver.wait(until.urlIs("http://localhost:3000/supervisorportal/landingpage/999"), 10000);
});

Then('I should be redirected to Supervisor portal landing page', async function () {
    driver.wait(until.urlIs("http://localhost:3000/supervisorportal/landingpage/999"), 10000);
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/landingpage/999");
});


Given('I am at the Supervisor Portal landing page', async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/landingpage/999");
});

When('I click on Create Tenant Account', function () {
    driver.wait(until.elementLocated(By.id("create-tenant-account-button")), 10000);
    let create_tenant_account_button = driver.findElement(By.id("create-tenant-account-button"))
    create_tenant_account_button.click();
});


Then('I should be redirected to the Create Tenant Account page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I am on the Supevisor Portal Landing page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on Pending tickets', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I am redirected to the view ticket page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Given('that I am on the Supervisor Portal Landing page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on Active tickets', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I am redirected to the view ticket page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('that I am on the Supevisor Portal Landing page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on Closed tickets', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I am redirected to the view ticket page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});