const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

let driver;
// Scenario: Log into Admin Portal
Given("I am on the Admin Portal login page", async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();
  await driver.get("http://localhost:3000/adminlogin");
});

When("I enter valid admin credentials", async function () {
    const emailField = await driver.findElement(By.id('admin-login-email-textfield'));
    await emailField.sendKeys("testadmin@gmail.com");
    
    const passwordField = await driver.findElement(By.id("admin-login-password-textfield"));
    await passwordField.sendKeys("testadmin123");
    
    const loginButton = await driver.findElement(By.id("admin-login-login-button"));
    await loginButton.click();
  });
  

Then("I should be redirected to Admin portal landing page", async function () {
  assert.equal(
    await driver.getCurrentUrl(),
    "http://localhost:3000/adminportal/landingpage/999"
  );
});

// Scenario: Go to Create Supervisor account
Given("I click on create supervisor account", async function () {
    assert.equal(
        await driver.getCurrentUrl(),
        "http://localhost:3000/adminportal/landingpage/999"
      );
  });
  
  When("Page reloads", async function () {
    await driver.findElement(By.id("createsupervisor")).click();
  });
  
  Then("I should be redirected to the Create Supervisor Account page", async function () {
    assert.equal(
      await driver.getCurrentUrl(),
      "http://localhost:3000/adminportal/createsupervisoracc/999"
    );
  });



