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
  
Then("I am redirected to Admin portal landing page", async function () {
  const landingURL = "http://localhost:3000/adminportal/landingpage/999";
  await driver.wait(until.urlIs(landingURL), 5000); 
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.equal(landingURL);
});

// Scenario: Go to Create Supervisor account



