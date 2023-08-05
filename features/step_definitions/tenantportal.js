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
  await driver.get("http://localhost:3000/tenantlogin");
  assert.equal(
    await driver.findElement(By.className("wlcText")).getText(),
    "Tenant Portal\nLogin"
  );
});

When("Tenant enters valid account credentials", async function () {
  await driver.findElement(By.id("tenant-login-email-textfield" )).sendKeys("testtenant@gmail.com");
  await driver.findElement(By.id("tenant-login-password-textfield")).sendKeys("testtenant123");
  await driver.findElement(By.id("tenant-login-login-button")).click();
});

Then("Tenant should be redirected to the Tenant home page", async function () {
  assert.equal(
    await driver.getCurrentUrl(),
    "http://localhost:3000/tenantportal/landingpage/999"
  );
});

Given("Tenant has loaded the Tenant home page", async function () {
  assert.equal(
    await driver.findElement(By.className("site-title")).getText(),
    "Tenant Portal"
  );
});

