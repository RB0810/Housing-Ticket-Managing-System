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
const fs = require("fs");
const path = require("path");
const { async } = require("q");

// Setup Supabase for Testing
const supabaseUrl = "https://mnfsjgaziftztwiarlys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8";

const supabase = createClient(supabaseUrl, supabaseKey);
const downloadPath = path.join(__dirname, "testdownloadsdir"); // Set up the test directory

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
        Status: "Quotation Uploaded",
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
        Status: "Quotation Uploaded",
        QuotationRequired: true,
        StaffID: 999,
        SupervisorID: 999,
        Property: "TESTUNITDONTDELETE",
        QuotationAttachmentPath: "999998.pdf",
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

  // Then do cleanup of files
  const files = fs.readdirSync(downloadPath);
  for (const file of files) {
    fs.unlinkSync(path.join(downloadPath, file));
  }

  driver.quit();
});

Given("Tenant has loaded the login page for Tenant Portal", async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options().setUserPreferences(
        {
          "download.default_directory": downloadPath,
        } // Set download path to test directory
      )
    )
    .build();
  await driver.get("http://localhost:3000/tenantlogin");
  await driver.manage().setTimeouts({ implicit: 10000 }); // Set a timeout for implicit waits (e.g., 10 seconds)
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

  await delay(wait_value * 2); // Wait for 1 second (wait_value milliseconds
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
    assert.equal(table_rows.length, 3);

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
      By.css(`a[href="${"/tenantportal/profile/999"}"]`)
    );

    await profileLink.click();
    await delay(wait_value * 2);
  }
);

Then("Tenant's account information should be displayed", async function () {
  await driver.wait(until.elementLocated(By.id("outlined-basic")));
  let tenantUsernameInput = await driver.findElement(By.id("outlined-basic"));
  let tenantUsername = await tenantUsernameInput.getAttribute("value");
  assert.equal(tenantUsername, "TESTTENANTDONTDELETE");
});

Given(
  'Tenant is in the "View Tenant Account Information" page',
  async function () {
    assert.equal(
      await driver.getCurrentUrl(),
      "http://localhost:3000/tenantportal/profile/999"
    );
  }
);

When("Tenant enters a new password", async function () {
  await driver.wait(
    until.elementLocated(By.id("tenant-profile-new-password-textfield"))
  );
  let tenantPasswordInput = await driver.findElement(
    By.id("tenant-profile-new-password-textfield")
  );
  await tenantPasswordInput.sendKeys("newpassword123");
});

When("Tenant re-enters the new password", async function () {
  let tenantConfirmPasswordInput = await driver.findElement(
    By.id("tenant-profile-confirm-password-textfield")
  );
  await tenantConfirmPasswordInput.sendKeys("newpassword123");
});

When('Tenant clicks on "Set New Password"', async function () {
  await driver
    .findElement(By.id("tenant-profile-reset-password-button"))
    .click();
  await delay(wait_value);
});

Then(
  "Tenant should receive a success notification and value is updated in Database",
  async function () {
    let { data, error } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", 999);

    if (error) {
      throw error;
    }
    await driver.findElement(By.className("swal2-confirm")).click();
    assert.equal(data[0].TenantPassword, "newpassword123");

    // Reset password back to original

    let { data2, error2 } = await supabase
      .from("TenantUsers")
      .update({ TenantPassword: "testtenant123" })
      .eq("TenantID", 999)
      .select();

    if (error2) {
      throw error2;
    }
  }
);

Given("Tenant renavigates back to ACTIVE tickets", async function () {
  await driver.get("http://localhost:3000/tenantportal/tickets/999/active");
  await delay(wait_value);
});

When(
  'Tenant clicks on "View Ticket" for a sticket with status "Quotation Uploaded"',
  async function () {
    // let linkElement = await driver.findElement(
    //   By.css('a[href="/tenantportal/ticket/999/999999"]')
    // );
    // await linkElement.click();
    await driver.get("http://localhost:3000/tenantportal/ticket/999/999998");
    await delay(wait_value);
  }
);

Then(
  "Tenant should see the Quotation rendered using ReactPDFViewer",
  async function () {
    await driver.wait(until.elementLocated(By.className("pdf-container")));
    let pdfViewerElement = await driver.findElement(
      By.className("pdf-container")
    );
    let pdfExists = false;
    if (pdfViewerElement) {
      pdfExists = true;
    } else {
      pdfExists = false;
    }
    assert.equal(pdfExists, true);

    // Wait for PDF to load
    await delay(wait_value * 3);
  }
);

Given(
  "Tenant sees the Quotation rendered using ReactPDFViewer",
  async function () {
    await delay(wait_value * 3);
  }
);

When("Tenant clicks on the Download button", async function () {
  await driver.wait(
    until.elementLocated(By.css('[data-testid="get-file__download-button"]')),
    50000
  );

  let buttonElement = await driver.findElement(
    By.css('[data-testid="get-file__download-button"]')
  );

  await buttonElement.click();

  // Give time for file to download
  await delay(wait_value);
});

Then(
  "Tenant should download the Quotation into their local computer",
  async function () {
    // Check if downloaded file does indeed exists
    const newItemCount = fs.readdirSync(downloadPath).length;

    // Check that downloaded file is in the directory
    assert.equal(newItemCount, 1);
  }
);

Given('Tenant clicks on "Accept Quotation"', async function () {
  await driver.wait(
    until.elementLocated(By.id("view-ticket-accept-quotation-button"))
  );
  await driver
    .findElement(By.id("view-ticket-accept-quotation-button"))
    .click();

  // Let it upload to Database
  await delay(wait_value * 2);
});

Then('Ticket status should change to "Quotation Accepted"', async function () {
  let { data, error } = await supabase
    .from("Service Request")
    .select("*")
    .eq("ServiceRequestID", 999998);

  if (error) {
    throw error;
  }
  assert.equal(data[0].Status, "Quotation Accepted");

  // Reset Ticket Status
  let { data2, error2 } = await supabase
    .from("Service Request")
    .update({ Status: "Quotation Uploaded" })
    .eq("ServiceRequestID", 999998);

  if (error2) {
    throw error2;
  }
});

Given('Tenant clicks on "Reject Quotation"', async function () {
  await driver.get("http://localhost:3000/tenantportal/ticket/999/999998");

  await driver.wait(
    until.elementLocated(By.id("view-ticket-reject-quotation-button"))
  );
  await driver
    .findElement(By.id("view-ticket-reject-quotation-button"))
    .click();

  // Update reason
  await driver.wait(
    until.elementLocated(By.id("view-ticket-reject-reason-textfield"))
  );

  await driver
    .findElement(By.id("view-ticket-reject-reason-textfield"))
    .click();

  await driver
    .findElement(By.id("view-ticket-reject-reason-textfield"))
    .sendKeys("TESTREJECTREASON");

  await driver.wait(
    until.elementLocated(By.id("view-ticket-reject-reason-submit-button"))
  );
  await driver
    .findElement(By.id("view-ticket-reject-reason-submit-button"))
    .click();

  // Let it upload to Database
  await delay(wait_value * 3);
});

Then('Ticket status should change to "Quotation Rejected"', async function () {
  await delay(wait_value * 3);
  let { data, error } = await supabase
    .from("Service Request")
    .select("*")
    .eq("ServiceRequestID", 999998);

  if (error) {
    throw error;
  }
  assert.equal(data[0].Status, "Quotation Rejected");
});

Given('Ticket status is "Works Ended"', async function () {
  let { data, error } = await supabase
    .from("Service Request")
    .update({ Status: "Works Ended" })
    .eq("ServiceRequestID", 999998);

  if (error) {
    throw error;
  }

  await delay(wait_value);
});

When("Tenant fills in the feedback survey", async function () {
  // Refresh page
  await driver.get("http://localhost:3000/tenantportal/ticket/999/999998");
  await driver.wait(until.elementLocated(By.id("view-ticket-feedback-button")));
  await driver.findElement(By.id("view-ticket-feedback-button")).click();

  await driver
    .findElement(By.id("view-ticket-feedback-textfield"))
    .sendKeys("TEST");
});

When("Tenant submits the feedback", async function () {
  await driver.findElement(By.id("view-ticket-submit-feedback-button")).click();
  // Some time for database to update
  await delay(wait_value * 3);
});

Then('Ticket Status should change to "Feedback Submitted"', async function () {
  let { data, error } = await supabase
    .from("Service Request")
    .select("*")
    .eq("ServiceRequestID", 999998);

  if (error) {
    throw error;
  }
  assert.equal(data[0].Status, "Feedback Submitted");
});

Given('Tenant clicks on "Reject Work"', async function () {
  // Remodify database and refresh
  let { data, error } = await supabase
    .from("Service Request")
    .update({ Status: "Works Ended" })
    .eq("ServiceRequestID", 999998);

  if (error) {
    throw error;
  }

  await driver.get("http://localhost:3000/tenantportal/ticket/999/999998");
  await driver.wait(until.elementLocated(By.id("view-ticket-reject-button")));
  await driver.findElement(By.id("view-ticket-reject-button")).click();
  await driver
    .findElement(By.id("view-ticket-reject-reason-textfield"))
    .sendKeys("TESTREJECTREASON");
  await driver.wait(
    until.elementLocated(By.id("view-ticket-submit-reject-reason-button"))
  );
  await driver
    .findElement(By.id("view-ticket-submit-reject-reason-button"))
    .click();

  // Some time for Supabase to update
  await delay(wait_value * 3);
});

Then('Ticket status should change to "Work Rejected"', async function () {
  // Some time for Supabase to update
  await delay(wait_value * 3);
  let { data, error } = await supabase
    .from("Service Request")
    .select("*")
    .eq("ServiceRequestID", 999998);

  if (error) {
    throw error;
  }
  assert.equal(data[0].Status, "Works Rejected");
});
