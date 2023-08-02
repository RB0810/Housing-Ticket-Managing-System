const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

let driver;

Given("Tenant has loaded the login page for Tenant Portal", async function () {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options())
      .build();
    await driver.get("http://localhost:3000/landlordlogin");
    assert.equal(
      await driver.findElement(By.id("landlord-login-email-textfield" )).getText(),
      "Landlord Portal\nLogin"
    );
  });