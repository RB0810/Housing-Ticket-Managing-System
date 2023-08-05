const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select, Browser, WebDriverWait,TimeUnit,wait, sleep, Alert} = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { async } = require("q");
const { file } = require("@babel/types");

let driver;

  //Scenario 1:
    Given('Staff is on Landlord Login Page and Landlord Portal Login Page loads', async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin");
      await driver.sleep(1000);
      await assert.equal(
        await driver.findElement(By.className("wlcText")).getText(),
        "Landlord Portal\nLogin"
    );
    });


    When('Staff types in valid login credentials and Staff presses the Login button', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click();
    });

    Then('Staff Landing Page renders',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/landingpage/16"
      );
      driver.quit();
    });

  //Scenario 2:

    Given('Staff is logged into the Landlord Portal', async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/landingpage/16"
      );
    });

    When('Staff clicks on the Profile button on Staff Landing Page',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await driver.findElement(By.id("nav-bar-profile-page")).click();
    });

    Then('Staff Profile Page is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/profile/16"
      );
      driver.quit();
    });


//Scenario 3:

    Given('Staff is on the Profile Page',  async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("nav-bar-profile-page")).click();
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/profile/16");

    });

    When('Staff types in a new password and re-enters the same password into the text box and Staff clicks the reset password button',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await driver.findElement(By.id("staff-portal-new-password-textfield")).sendKeys("smith123");
      await driver.findElement(By.id("staff-portal-confirm-password-textfield")).sendKeys("smith123");
      await driver.findElement(By.id("staff-portal-reset-password-button")).click();
    });

    Then('A password reset alert pop-up is shown', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await driver.wait(until.alertIsPresent());
      let alert = await driver.switchTo().alert();
      let alertText = await alert.getText();
      alert.accept();
      driver.quit();
    });

  //Scenario 4:

    Given('Staff clicks on Active tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-active-tickets")).click();
    });

    Then('Active tickets Page is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/tickets/16/active");
      driver.quit();
    });


//Scenario 5:

    Given('Staff clicks on View Active Ticket button', async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-active-tickets")).click();
      await driver.sleep(1000);
      await driver.findElement(By.id("999" )).click(); //assuming 999 is the ticket ID
    });

    Then('Active Ticket is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/ticket/16/999");
      driver.quit();
    });

//Scenario 6:

    Given('Staff clicks on Pending tickets button', async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-pending-tickets")).click();
    });

    Then('Pending tickets Page is rendered',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/tickets/16/pending");
        driver.quit();
    });

//Scenario 7:

    Given('Staff clicks on view Pending tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-pending-tickets")).click();
      await driver.sleep(1000);
      await driver.findElement(By.id("999" )).click(); //assuming 999 is the ticket ID
    });

    Then('Pending Ticket is rendered', async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/tickets/16/999");
        driver.quit();
    });

//Scenario 8:

    Given('Staff clicks on view Closed tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-closed-tickets")).click();
    });

    Then('Closed tickets Page is rendered',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/tickets/16/closed");
        driver.quit();
    });

//Scenario 9:

    Given('Staff clicks on Closed tickets button',async function () {
      // Write code here that turns the phrase above into concrete actions
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-closed-tickets")).click();
      await driver.sleep(1000);
      await driver.findElement(By.id("999" )).click(); //assuming 999 is the ticket ID
    });

    Then('Closed Ticket is rendered',async function () {
      // Write code here that turns the phrase above into concrete actions
      await driver.sleep(1000);
      await assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/staffportal/tickets/16/999");
        driver.quit();
    });

//Scenario 10:

     Given('Staff is on the view ticket page and Ticket status is Quotation Accepted',async function () {
       // Write code here that turns the phrase above into concrete actions
       driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-active-tickets")).click();
      await driver.sleep(1000);
      await driver.findElement(By.id("999" )).click(); //assuming 999 is the ticket ID
     });

     When('Staff clicks on Works Started button',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       await driver.findElement(By.id("staff-portal-start-works-button")).click();
     });

     Then('Ticket status changes to Works Started and Ticket with Works Started status is rendered',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       await assert.equal(
        await driver.findElement(By.id("basic-ticket-details-status-textfield")).getText(),
        "Works Started"
       )
       driver.quit();
       
     });

//Scenario 11:

     Given('Staff is on the view ticket page and Ticket status is Works Started',async function () {
       // Write code here that turns the phrase above into concrete actions
       driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-active-tickets")).click();
      await driver.sleep(1000);
      await driver.findElement(By.id("999" )).click(); //assuming 999 is the ticket ID
     });

     When('Staff clicks on Works Ended button',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       await driver.findElement(By.id("staff-portal-end-works-button")).click();
     });

     Then('Ticket status changes to Works Ended and Ticket with Works Ended status is rendered',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       await assert.equal(
        await driver.findElement(By.id("basic-ticket-details-status-textfield")).getText(),
        "Works Ended"
       )
       driver.quit();
     });

//Scenario 12:

     Given('Staff is on the view ticket page and Ticket status is Ticket Assigned',async function () {
       // Write code here that turns the phrase above into concrete actions
       driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click();
      await driver.sleep(1000); 
      await driver.findElement(By.id("button-active-tickets")).click();
      await driver.sleep(1000);
      await driver.findElement(By.id("999" )).click(); //assuming 999 is the ticket ID
     });

     When('Staff sets quotation required to yes and Staff clicks on upload button and chooses a file to upload and Staff clicks submit button',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       const select = new Select(await driver.findElement(By.id("staff-portal-quotation-required-select"))).selectByid("Yes");
       await select.selectByVisibleText('Yes');
       const file = "C:\Users\Abel Lee\Desktop\SUTD\Term 5\View My Weekly Schedule.pdf"
       await driver.findElement(By.id("staff-portal-upload-quotation-input")).sendKeys(file);
       await driver.findElement(By.id("staff-portal-submit-quotation-button")).submit();
      });

     Then('Ticket status is changed to Quotation Uploaded and Quotation is rendered in View Ticket Page and Ticket with Quotation Uploaded status is rendered',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       await assert.equal(
        await driver.findElement(By.id("basic-ticket-details-status-textfield")).getText(),
        "Quotation Uploaded"
       )
       driver.quit();
     });


//Scenario 13:

     Given('Staff is on the view ticket page and Ticket status is Works Rejected',async function () {
       // Write code here that turns the phrase above into concrete actions
       driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();
      await driver.get("http://localhost:3000/landlordlogin"); 
      await driver.findElement(By.id("landlord-login-email-textfield")).sendKeys("smith@gmail.com");
      await driver.findElement(By.id("landlord-login-password-textfield" )).sendKeys("smith123");
      await driver.findElement(By.id("landlord-login-login-button" )).click(); 
      await driver.sleep(1000);
      await driver.findElement(By.id("button-active-tickets")).click();
      await driver.sleep(1000);
      await driver.findElement(By.id("999" )).click(); //assuming 999 is the ticket ID
     });

     When('Staff clicks on Restart Works button',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       await driver.findElement(By.id("staff-portal-restart-works-button")).click();
     });

     Then('Ticket status changes to Works Started and Ticket with Works Started status is rendered',async function () {
       // Write code here that turns the phrase above into concrete actions
       await driver.sleep(1000);
       await assert.equal(
        await driver.findElement(By.id("basic-ticket-details-status-textfield")).getText(),
        "Works Started"
       )
       driver.quit();
     });