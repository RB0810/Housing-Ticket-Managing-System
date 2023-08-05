const {
  Given,
  When,
  Then,
  Before,
  After,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { createClient } = require("@supabase/supabase-js");

// Setup Supabase for Testing
const supabaseUrl = "https://mnfsjgaziftztwiarlys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8";

const supabase = createClient(supabaseUrl, supabaseKey);

let driver;
let wait_value = 1000;

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

BeforeAll(async function () {
  let { data, error } = await supabase // Create a new ticket
    .from("Service Request")
    .insert([
      {
        ServiceRequestID: 999999,
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
        ServiceRequestID: 999998,
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
        ServiceRequestID: 999997,
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
    .match({ ServiceRequestID: 999999 });
  if (error) {
    throw error;
  } else {
    console.log("Deleted PENDING ticket for testing.");
  }

  let { data2, error2 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ ServiceRequestID: 999998 });
  if (error2) {
    throw error2;
  } else {
    console.log("Deleted ACTIVE ticket for testing.");
  }

  let { data3, error3 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ ServiceRequestID: 999997 });
  if (error3) {
    throw error3;
  } else {
    console.log("Deleted CLOSED ticket for testing.");
  }

  let { data4, error4 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ Name: "DELETEME" });
  if (error4) {
    throw error;
  } else {
    console.log("Deleted created ticket for testing.");
  }

  driver.quit();
});

Given("Tenant has loaded the login page for Tenant Portal", async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();
  await driver.get("http://localhost:3000/tenantlogin");
  await driver.manage().setTimeouts({ implicit: 1 }); // Set a timeout for implicit waits (e.g., 10 seconds)
  await driver.wait(until.elementLocated(By.className("wlcText")));
  assert.equal(
    await driver.findElement(By.className("wlcText")).getText(),
    "Tenant Portal\nLogin"
  );

  await delay(wait_value); // Wait for 1 second (wait_value milliseconds
});

When("Tenant enters valid account credentials", async function () {
  const usernameInput = await driver.findElement(
    By.css('input[type="text"].MuiInputBase-input')
  );
  const passwordInput = await driver.findElement(
    By.css('input[type="password"].MuiInputBase-input')
  );

  await usernameInput.sendKeys("testtenant@gmail.com");
  await passwordInput.sendKeys("testtenant123");

  await delay(wait_value); // Wait for 1 second (wait_value milliseconds
});

When('Tenant clicks "login" button', async function () {
  await driver.findElement(By.className("login-portal-button")).click();

  await delay(wait_value); // Wait for 1 second (wait_value milliseconds
});

Then("Tenant should be redirected to the Tenant home page", async function () {
  let portal_name = await driver
    .findElement(By.className("site-title"))
    .getText();
  assert.equal(portal_name, "Tenant Portal");

  await delay(wait_value);
});

Given('Tenant clicks on "Create Ticket"', async function () {
  const linkElement = await driver.findElement(
    By.xpath(`//a[@href='/tenantportal/createticket/999']`)
  );
  await linkElement.click();

  await delay(wait_value);
});

When("Tenant fills in the required information", async function () {
  await driver
    .findElement(By.id("tenant-create-ticket-name-textfield"))
    .sendKeys("DELETEME");

  await driver
    .findElement(By.id("tenant-create-ticket-request-type-select"))
    .click();

  await driver.findElement(By.id("toilet")).click();

  await driver
    .findElement(By.id("tenant-create-ticket-description-textfield"))
    .sendKeys("DELETEME");

  await driver
    .findElement(By.id("tenant-create-ticket-property-type-select"))
    .click();

  await driver.findElement(By.id("TESTUNITDONTDELETE")).click();
});

When('Tenant clicks "Create Service Ticket"', async function () {
  await driver.findElement(By.id("tenant-create-ticket-submit-button")).click();
  await delay(wait_value);
});

Then("Database should be updated with new service ticket", async function () {
  await delay(2000);
  let { data, error } = await supabase
    .from("Service Request")
    .select("*")
    .eq("Name", "DELETEME");

  if (error) {
    throw error;
  }
  console.log(data[0]);
  assert.equal(data[0].Name, "DELETEME");

  await driver.findElement(By.className("swal2-confirm")).click();

  await delay(wait_value);
});

Given('Tenant clicks on "View Pending Tickets"', async function () {
  // Write code here that turns the phrase above into concrete actions
  await driver.get("http://localhost:3000/tenantportal/landingpage/999");
  await driver.findElement(By.id("pending-tickets-button")).click();

  await delay(wait_value);
});

Then(
  "Tenant should see all pending tickets in a table format",
  async function () {
    let table = await driver.findElement(By.className("MuiTable-root"));
    let table_rows = await table.findElements(By.tagName("tr"));
    assert.equal(table_rows.length, 2);

    await delay(wait_value);
  }
);

Given('Tenant clicks on "View Active Tickets"', async function () {
  // Write code here that turns the phrase above into concrete actions
  await driver.get("http://localhost:3000/tenantportal/landingpage/999");
  await driver.findElement(By.id("active-tickets-button")).click();

  await delay(wait_value);
});

Then(
  "Tenant should see all active tickets in a table format",
  async function () {
    let table = await driver.findElement(By.className("MuiTable-root"));
    let table_rows = await table.findElements(By.tagName("tr"));
    assert.equal(table_rows.length, 2);

    await delay(wait_value);
  }
);

Given('Tenant clicks on "View Closed Tickets"', async function () {
  // Write code here that turns the phrase above into concrete actions
  await driver.get("http://localhost:3000/tenantportal/landingpage/999");
  await driver.findElement(By.id("closed-tickets-button")).click();

  await delay(wait_value);
});

Then(
  "Tenant should see all closed tickets in a table format",
  async function () {
    let table = await driver.findElement(By.className("MuiTable-root"));
    let table_rows = await table.findElements(By.tagName("tr"));
    assert.equal(table_rows.length, 2);

    await delay(wait_value);
  }
);

Given(
  'Tenant navigates to the "Profile" section through the Navbar',
  async function () {
    let profileLink = await driver.findElement(
      By.css(`a[href="/tenantportal/landingpage/999"]`)
    );

    await profileLink.click();
    await delay(wait_value);
  }
);

Then("Tenant's account information should be displayed", async function () {
  await driver.wait(until.elementLocated(By.tagName("input")));
  let tenantUsernameInput = await driver.findElement(By.tagName("input"));

  let tenantUsername = await tenantUsernameInput.getAttribute("value");

  assert.equal(tenantUsername, "TESTTENANTDONTDELETE");
});
