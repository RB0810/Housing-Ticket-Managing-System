const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require('chai')

let driver;
Given("I am at the admin landing page", async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();
  await driver.get("http://localhost:3000/adminlogin");
});

When('I click on Create Supervisor Account', async function () {
   const emailField = await driver.findElement(By.id('admin-login-email-textfield'));
   await emailField.sendKeys("testadmin@gmail.com");
    
   const passwordField = await driver.findElement(By.id("admin-login-password-textfield"));
   await passwordField.sendKeys("testadmin123");
     
   const loginButton = await driver.findElement(By.id("admin-login-login-button"));
   await loginButton.click();
});
  

Then('I am redirected to Admin portal landing page', async function () {
   const landingURL = "http://localhost:3000/adminportal/landingpage/999";
   await driver.wait(until.urlIs(landingURL), 5000); // Wait up to 5 seconds
   const currentUrl = await driver.getCurrentUrl();
   expect(currentUrl).to.equal(landingURL);
});




