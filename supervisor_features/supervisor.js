const { Given, When, Then, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { createClient } = require("@supabase/supabase-js");

// supabase client
const supabaseUrl = 'https://mnfsjgaziftztwiarlys.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8'
const supabase = createClient(supabaseUrl, supabaseKey, { persistSession: false });

let driver;

// create new tickets for supervisor account
BeforeAll(async function () {
    // supervisor does not need to see tickets created for testing

    // let { data, error } = await supabase // Create a new ticket
    //     .from("Service Request")
    //     .insert([
    //         {
    //             ServiceRequestID: 999990,
    //             Name: "TESTINGTICKETJEST",
    //             TenantID: 999,
    //             PARCStatus: "PENDING",
    //             SubmittedDateTime: "2021-04-01 00:00:00",
    //             Category: "TESTINGCATEGORYJEST",
    //         },
    //     ])
    //     .select();
    // if (error) {
    //     throw error;
    // } else {
    //     console.log("Created a new PENDING ticket for testing.");
    // }

    // let { data2, error2 } = await supabase // Create a new ticket
    //     .from("Service Request")
    //     .insert([
    //         {
    //             ServiceRequestID: 999991,
    //             Name: "TESTINGTICKETJEST",
    //             TenantID: 999,
    //             PARCStatus: "ACTIVE",
    //             SubmittedDateTime: "2021-04-01 00:00:00",
    //             Category: "TESTINGCATEGORYJEST",
    //         },
    //     ])
    //     .select();
    // if (error2) {
    //     throw error2;
    // } else {
    //     console.log("Created a new ACTIVE ticket for testing.");
    // }

    // let { data3, error3 } = await supabase // Create a new ticket
    //     .from("Service Request")
    //     .insert([
    //         {
    //             ServiceRequestID: 999992,
    //             Name: "TESTINGTICKETJEST",
    //             TenantID: 999,
    //             PARCStatus: "CLOSED",
    //             SubmittedDateTime: "2021-04-01 00:00:00",
    //             Category: "TESTINGCATEGORYJEST",
    //         },
    //     ])
    //     .select();
    // if (error3) {
    //     throw error3;
    // } else {
    //     console.log("Created a new CLOSED ticket for testing.");
    // }
});


AfterAll(async function () {
    // supervisor does not need to see the tickets created for testing

    // let { data, error } = await supabase // Delete Created Tickets
    //     .from("Service Request")
    //     .delete()
    //     .match({ ServiceRequestID: 999990 });
    // if (error) {
    //     throw error;
    // } else {
    //     console.log("Deleted PENDING ticket for testing.");
    // }

    // let { data2, error2 } = await supabase // Delete Created Tickets
    //     .from("Service Request")
    //     .delete()
    //     .match({ ServiceRequestID: 999991 });
    // if (error2) {
    //     throw error2;
    // } else {
    //     console.log("Deleted ACTIVE ticket for testing.");
    // }

    // let { data3, error3 } = await supabase // Delete Created Tickets
    //     .from("Service Request")
    //     .delete()
    //     .match({ ServiceRequestID: 999992 });
    // if (error3) {
    //     throw error3;
    // } else {
    //     console.log("Deleted CLOSED ticket for testing.");
    // }

    const { error4 } = await supabase
        .from('TenantUsers')
        .delete()
        .match({'TenantEmail': 'deletemetesttenant@gmail.com'})
    if (error4) {
        throw error4;
    } else {
        console.log("Deleted test tenant.");
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
    console.log(driver.getCurrentUrl())
});

When('click on the login button', async function () {
    let login_button = await driver.findElement(By.id("landlord-login-button"))
    login_button.click();
});

Then('I should be redirected to Supervisor portal landing page', async function () {
    const expected_url = "http://localhost:3000/supervisorportal/landingpage/999"
    await driver.wait(until.urlIs(expected_url), 2000);
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/landingpage/999");
});


Given('I am at the Supervisor Portal landing page', async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/landingpage/999");
});

When('I click on Create Tenant Account', async function () {
    await driver.wait(until.elementLocated(By.id("create-tenant-button")), 1000);
    let create_tenant_account_button = driver.findElement(By.id("create-tenant-button"))
    await create_tenant_account_button.click();
});


Then('I should be redirected to the Create Tenant Account page', async function () {
    await driver.wait(until.urlIs("http://localhost:3000/supervisorportal/createtennantacc/999"), 1000);
    assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/supervisorportal/createtennantacc/999");
});


Given('I am in the Create Tenant account page', async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/supervisorportal/createtennantacc/999"
    );
});

When('I fill in all required Tenant details', async function () {
    const usernamefield = await driver.findElement(By.id("supervisor-portal-create-tenant-username-textfield"));
    usernamefield.sendKeys('deletemetesttenant');
    const emailfield = await driver.findElement(By.id("supervisor-portal-create-tenant-email-textfield"));
    emailfield.sendKeys('deletemetesttenant@gmail.com');
    const passwordfield = await driver.findElement(By.id("supervisor-portal-create-tenant-password-textfield"));
    passwordfield.sendKeys('deletemepassword');
    const confirmpasswordfield = await driver.findElement(By.id("supervisor-portal-create-tenant-repassword-textfield"));
    confirmpasswordfield.sendKeys('deletemepassword');
    const phonefield = await driver.findElement(By.id("supervisor-portal-create-tenant-phone-number-textfield"));
    phonefield.sendKeys('888');
    const tradetypefield = await driver.findElement(By.id("supervisor-portal-create-tenant-trade-type-textfield"));
    tradetypefield.sendKeys('test trade');
    const monthlyrentalfield = await driver.findElement(By.id("supervisor-portal-create-monthly-rent-textfield"));
    monthlyrentalfield.sendKeys('888');
    const commencementdatefield = await driver.findElement(By.id("supervisor-portal-create-tenant-commencement-date-textfield"));
    commencementdatefield.sendKeys('08052023');
    const terminationdatefield = await driver.findElement(By.id("supervisor-portal-create-tenant-termination-date-textfield"));
    terminationdatefield.sendKeys('08082023');
    const unitareatextfield = await driver.findElement(By.id("supervisor-portal-create-tenant-unit-area-textfield"));
    unitareatextfield.sendKeys('999');
    const numberofunitstextfield = await driver.findElement(By.id("supervisor-portal-create-tenant-number-of-units-textfield"));
    numberofunitstextfield.sendKeys('1');
    const unitnumbertextfield = await driver.findElement(By.id("0"));
    unitnumbertextfield.sendKeys("test unit 999");

});

When('I click on the Create Tenant Account button', async function () {
    await driver.wait(until.elementLocated(By.id("supervisor-portal-create-tenant-submit-button")), 1000);
    let create_tenant_button = await driver.findElement(By.id("supervisor-portal-create-tenant-submit-button"))
    create_tenant_button.click();
});

Then('I should receive a Tenant account created successfully alert', async function () {
    await driver.wait(until.elementLocated(By.className("swal2-confirm swal2-styled swal2-default-outline")), 2000);
    let alert_button = await driver.findElement(By.className("swal2-confirm swal2-styled swal2-default-outline"))
    alert_button.click();
});

When('I click on Pending tickets', async function () {
    await driver.get("http://localhost:3000/supervisorportal/landingpage/999");
    await driver.wait(until.elementLocated(By.id("view-pending")), 1000);
    let pending_tickets_button = await driver.findElement(By.id("view-pending"))
    await pending_tickets_button.click();
});

Then('I am redirected to the view pending tickets page', async function () {
    await driver.wait(until.urlIs("http://localhost:3000/supervisorportal/tickets/999/pending"), 1000);
    assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/supervisorportal/tickets/999/pending");
});


When('I click on Active tickets', async function () {
    await driver.get("http://localhost:3000/supervisorportal/landingpage/999");
    assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/supervisorportal/landingpage/999");
    await driver.wait(until.elementLocated(By.id("view-active")), 1000);
    let active_tickets_button = await driver.findElement(By.id("view-active"))
    await active_tickets_button.click();
});

Then('I am redirected to the view active tickets page', async function () {
    await driver.wait(until.urlIs("http://localhost:3000/supervisorportal/tickets/999/active"), 1000);
    assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/supervisorportal/tickets/999/active");
});

When('I click on Closed tickets', async function () {
    await driver.get("http://localhost:3000/supervisorportal/landingpage/999");
    assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/supervisorportal/landingpage/999");
    await driver.wait(until.elementLocated(By.id("view-closed")), 1000);
    let closed_tickets_button = await driver.findElement(By.id("view-closed"))
    await closed_tickets_button.click();
});

Then('I am redirected to the view closed tickets page', async function () {
    await driver.wait(until.urlIs("http://localhost:3000/supervisorportal/tickets/999/closed"), 1000);
    assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/supervisorportal/tickets/999/closed");
});