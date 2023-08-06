const { Given, When, Then, Before, After, BeforeAll, AfterAll, } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select, Browser, WebDriverWait,TimeUnit,wait, sleep} = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { async } = require("q");
const { file } = require("@babel/types");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Setup Supabase for Testing
const supabaseUrl = "https://mnfsjgaziftztwiarlys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8";

const supabase = createClient(supabaseUrl, supabaseKey);
// const downloadPath = path.join(__dirname, "testdownloadsdir"); // Set up the test directory

BeforeAll(async function () {
  let { data, error } = await supabase // Create a new ticket
    .from("Service Request")
    .insert([
      {
        ServiceRequestID: 696969,
        Name: "STAFFPORTALTESTING-PENDING",
        TenantID: 999,
        StaffID: 999,
        SupervisorID: 999,
        QuotationRequired: null,
        Status: "Ticket Assigned",
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
        ServiceRequestID: 696968,
        Name: "STAFFPORTALTESTING-ACTIVE-1",
        TenantID: 999,
        PARCStatus: "ACTIVE",
        Status: "Quotation Uploaded",
        QuotationRequired: true,
        StaffID: 999,
        SupervisorID: 999,
        Property: "TESTUNITDONTDELETE",
        QuotationAttachmentPath: "696968.pdf",
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
        ServiceRequestID: 696967,
        Name: "STAFFPORTALTESTING-CLOSED",
        TenantID: 999,
        StaffID: 999,
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

  let { data4, error4 } = await supabase // Create a new ticket
    .from("Service Request")
    .insert([
      {
        ServiceRequestID: 696966,
        Name: "STAFFPORTALTESTING-ACTIVE-2",
        TenantID: 999,
        PARCStatus: "ACTIVE",
        Status: "Quotation Accepted",
        QuotationRequired: true,
        StaffID: 999,
        SupervisorID: 999,
        Property: "TESTUNITDONTDELETE",
        QuotationAttachmentPath: "696968.pdf",
        SubmittedDateTime: "2021-04-01 00:00:00",
        Category: "TESTINGCATEGORYJEST",
      },
    ])
    .select();
  if (error4) {
    throw error;
  } else {
    console.log("Created a new PENDING ticket for testing.");
  }

  let { data5, error5 } = await supabase // Create a new ticket
    .from("Service Request")
    .insert([
      {
        ServiceRequestID: 696965,
        Name: "STAFFPORTALTESTING-ACTIVE-3",
        TenantID: 999,
        PARCStatus: "ACTIVE",
        Status: "Works Rejected",
        QuotationRequired: true,
        StaffID: 999,
        SupervisorID: 999,
        Property: "TESTUNITDONTDELETE",
        QuotationAttachmentPath: "696968.pdf",
        SubmittedDateTime: "2021-04-01 00:00:00",
        Category: "TESTINGCATEGORYJEST",
      },
    ])
    .select();
  if (error5) {
    throw error;
  } else {
    console.log("Created a new PENDING ticket for testing.");
  }
});

AfterAll(async function () {
  let { data, error } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ ServiceRequestID: 696969 });
  if (error) {
    throw error;
  } else {
    console.log("Deleted PENDING ticket for testing.");
  }

  let { data2, error2 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ ServiceRequestID: 696968 });
  if (error2) {
    throw error2;
  } else {
    console.log("Deleted ACTIVE ticket for testing.");
  }

  let { data3, error3 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ ServiceRequestID: 696967 });
  if (error3) {
    throw error3;
  } else {
    console.log("Deleted CLOSED ticket for testing.");
  }

  let { data4, error4 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ ServiceRequestID: 696966 });
  if (error4) {
    throw error;
  } else {
    console.log("Deleted ACTIVE ticket for testing.");
  }

  let { data5, error5 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ Name: "DELETEME" });
  if (error5) {
    throw error;
  } else {
    console.log("Deleted created ticket for testing.");
  }

  let { data6, error6 } = await supabase // Delete Created Tickets
    .from("Service Request")
    .delete()
    .match({ ServiceRequestID: 696965 });
  if (error6) {
    throw error;
  } else {
    console.log("Deleted ACTIVE ticket for testing.");
  }

  // // Then do cleanup of files
  // const files = fs.readdirSync(downloadPath);
  // for (const file of files) {
  //   fs.unlinkSync(path.join(downloadPath, file));
  // }

  driver.quit();
});

  //Scenario 1:
    Given('Staff is on Landlord Login Page and Landlord Portal Login Page loads', async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin");
      await driver.wait(until.urlIs("http://localhost:3000/landlordlogin"),10000);
    });


    When('Staff types in valid login credentials and Staff presses the Login button', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("teststaff@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("teststaff123");
      await driver.findElement(By.id("landlord-login-login-button")).click();
    });

    Then('Staff Landing Page renders',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/landingpage/999"),10000);
    });

  //Scenario 2:

    Given('Staff is logged into the Landlord Portal', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/landingpage/999"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/landingpage/999"),10000);
    });

    When('Staff clicks on the Profile button on Staff Landing Page',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.findElement(By.id("nav-bar-profile-page")).click();
    });

    Then('Staff Profile Page is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/profile/999"),10000);
    });


//Scenario 3:

    Given('Staff is on the Profile Page',  async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/profile/999"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/profile/999"),10000);

    });

    When('Staff types in a new password and re-enters the same password into the text box and Staff clicks the reset password button',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await driver.findElement(By.id("staff-portal-new-password-textfield")).sendKeys("teststaff123");
      await driver.findElement(By.id("staff-portal-confirm-password-textfield")).sendKeys("teststaff123");
      await driver.findElement(By.id("staff-portal-reset-password-button")).click();
    });

    Then('A password reset alert pop-up is shown', async function () {
      // Write code here that turns the phrase above into concrete actions
      const sweetAlert = await driver.wait(until.elementLocated(By.className("staff-profile-password-changed-swal")), 10000);
      const okButton = await sweetAlert.findElement(By.css('.swal2-confirm'));
      await okButton.click();
    });

  //Scenario 4:

    Given('Staff clicks on Active tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/landingpage/999"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/landingpage/999"),10000);
      await driver.findElement(By.id("button-active-tickets")).click();
    });

    Then('Active tickets Page is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/tickets/999/active"),10000);
    });


//Scenario 5:


    Given('Staff clicks on View Active Ticket button', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/tickets/999/active"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/tickets/999/active"),10000);
      await driver.sleep(1000);
      await driver.findElement(By.id("STAFFPORTALTESTING-ACTIVE-1")).click(); //assuming 696969 is the ticket ID
    });

    Then('Active Ticket is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/ticket/999/696968"),10000);

    });

//Scenario 6:
    Given('Staff clicks on Pending tickets button', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/landingpage/999"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/landingpage/999"),10000);
      await driver.findElement(By.id("button-pending-tickets")).click();
    });

    Then('Pending tickets Page is rendered',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/tickets/999/pending"),10000);
    });

//Scenario 7:

    Given('Staff clicks on view Pending tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/tickets/999/pending"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/tickets/999/pending"),10000);
      await driver.sleep(1000);
      await driver.findElement(By.id("STAFFPORTALTESTING-PENDING")).click(); 
    });

    Then('Pending Ticket is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/ticket/999/696969"),10000);
    });

//Scenario 8:

    Given('Staff clicks on view Closed tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/landingpage/999"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/landingpage/999"),10000);
      await driver.findElement(By.id("button-closed-tickets")).click();
    });

    Then('Closed tickets Page is rendered',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/tickets/999/closed"),10000);
    });

//Scenario 9:

    Given('Staff clicks on Closed tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/tickets/999/closed"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/tickets/999/closed"),10000);
      await driver.sleep(1000);
      await driver.findElement(By.id("STAFFPORTALTESTING-CLOSED")).click(); //assuming 999 is the ticket ID
    });

    Then('Closed Ticket is rendered',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/ticket/999/696967"),10000);
    });

//Scenario 10:

     Given('Staff is on the view ticket page and Ticket status is Quotation Accepted',async function () {
       // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/ticket/999/696966"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/ticket/999/696966"),10000);
      await driver.sleep(1000);
     });

     When('Staff clicks on Works Started button',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.findElement(By.id("staff-portal-start-works-button")).click();
     });

     Then('Ticket status changes to Works Started and Ticket with Works Started status is rendered',async function () {
       // Write code here that turns the phrase above into concrete actions
      const sweetAlert = await driver.wait(until.elementLocated(By.className("view-ticket-works-started-swal")), 10000);
      const okButton = await sweetAlert.findElement(By.css('.swal2-confirm'));
      await okButton.click();
      await driver.sleep(1000);
      await assert.equal(
        await driver.findElement(By.id("basic-ticket-details-status-textfield")).getAttribute("value"),
        "Works Started"
      )
     });

//Scenario 11:

     Given('Staff is on the view ticket page and Ticket status is Works Started',async function () {
       // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/ticket/999/696966"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/ticket/999/696966"),10000);
      await driver.sleep(1000);
     });

     When('Staff clicks on Works Ended button',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.findElement(By.id("staff-portal-end-works-button")).click();
     });

     Then('Ticket status changes to Works Ended and Ticket with Works Ended status is rendered',async function () {
       // Write code here that turns the phrase above into concrete actions
      const sweetAlert = await driver.wait(until.elementLocated(By.className("view-ticket-works-ended-swal")), 10000);
      const okButton = await sweetAlert.findElement(By.css('.swal2-confirm'));
      await okButton.click();
      await driver.sleep(1000);
      await assert.equal(
        await driver.findElement(By.id("basic-ticket-details-status-textfield")).getAttribute("value"),
        "Works Ended"
      )
     });

//Scenario 12:

     Given('Staff is on the view ticket page and Ticket status is Ticket Assigned',async function () {
       // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/ticket/999/696969"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/ticket/999/696969"),10000);
     });

     When('Staff sets quotation required to yes and Staff clicks on upload button and chooses a file to upload and Staff clicks submit button',async function () {
       // Write code here that turns the phrase above into concrete actions
      //  const file = "C:\\Users\\Abel Lee\\Desktop\\SUTD\\Term 5\\View My Weekly Sch
      //  await driver.findElement(By.id("staff-portal-upload-quotation-input")).sendKeys(file);
      await driver.sleep(1000);
       let fileInput = await driver.findElement(By.id("staff-portal-upload-quotation-input")); // Provide the local path of the file to be uploaded. 
       const filePath = '../uploadedfile/testfile.pdf'; // Set the file path in the file input field. 
       await fileInput.sendKeys(filePath);
       await driver.findElement(By.id("staff-portal-submit-quotation-button")).click();
      });

     Then('Ticket status is changed to Quotation Uploaded and Quotation is rendered in View Ticket Page and Ticket with Quotation Uploaded status is rendered',async function () {
       // Write code here that turns the phrase above into concrete actions
       await assert.equal(
        await driver.findElement(By.id("basic-ticket-details-status-textfield")).getAttribute("value"),
        "Quotation Uploaded"
       )
     });


//Scenario 13:
     Given('Staff is on the view ticket page and Ticket status is Works Rejected',async function () {
       // Write code here that turns the phrase above into concrete actions
      await driver.get("http://localhost:3000/staffportal/ticket/999/696965"); 
      await driver.wait(until.urlIs("http://localhost:3000/staffportal/ticket/999/696965"),10000);
      await driver.sleep(1000);
     });

     When('Staff clicks on Restart Works button',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.findElement(By.id("staff-portal-restart-works-button")).click();
     });