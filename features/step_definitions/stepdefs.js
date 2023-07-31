const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

let driver;

Given("I am on the Admin Portal login page", async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();
  await driver.get("http://localhost:3000/adminlogin");
  assert.equal(
    await driver.findElement(By.className("wlcText")).getText(),
    "Admin Portal\nLogin"
  );
});

When("I enter valid admin credentials", async function () {
  await driver.findElement(By.name("ID")).sendKeys("admin@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("admin123");
});

When("click on the login button", async function () {
  await driver.findElement(By.className("loginBtn")).click();
});

Then("I should be logged in successfully", async function () {
  await driver.wait(
    until.urlIs("http://localhost:3000/adminportal/landingpage/1")
  );
  assert.equal(
    await driver.findElement(By.className("site-title")).getText(),
    "Admin Portal"
  );
});

Given("I am logged in as an admin", async function () {
  let currentUrl = await driver.getCurrentUrl();
  assert.equal(currentUrl, "http://localhost:3000/adminportal/landingpage/1");
});

When("I navigate to the Supervisor creation page", async function () {
  await driver
    .findElement(By.xpath("//img[contains(@src, 'addlandlord.png')]"))
    .click();
});

When("fill in the required Supervisor details", async function () {
  await driver.findElement(By.id("username")).sendKeys("TESTADMIN");
  await driver.findElement(By.id("email")).sendKeys("TESTADMIN@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("TESTADMIN123");
  await driver.findElement(By.id("rePassword")).sendKeys("TESTADMIN123");
  await driver.findElement(By.id("buildingName")).sendKeys("TESTADMIN123");
  await driver.findElement(By.id("buildingAddress")).sendKeys("TESTADMIN123");
  await driver.findElement(By.id("postalCode")).sendKeys("TESTADMIN123");
});

When("click on the submit button to create Supervisor", async function () {
  await driver
    .findElement(By.className("create-supervisor-acc-input-submit"))
    .click();
});

Then(
  "the Supervisor account should be created successfully",
  async function () {
    // Add assertions or checks here to verify the account creation
  }
);

When("I navigate to the Staff creation page", async function () {
  await driver.get("http://localhost:3000/adminportal/landingpage/1");
  await driver
    .findElement(By.xpath("//img[contains(@src, 'addstaff.png')]"))
    .click();
});

When("fill in the required Staff details", async function () {
  await driver.findElement(By.id("username")).sendKeys("TESTSTAFF");
  await driver.findElement(By.id("email")).sendKeys("TESTSTAFF@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("TESTSTAFF123");
  await driver.findElement(By.id("rePassword")).sendKeys("TESTSTAFF123");

  let dropdownElement = await driver.findElement(By.id("buildingID"));

  // Create a Select object from the dropdown element.
  let select = new Select(dropdownElement);

  // Select the first option in the dropdown.
  await select.selectByIndex(0);
});

When("click on the submit button to create Staff", async function () {
  await driver
    .findElement(By.className("create-staff-acc-input-submit"))
    .click();
});

Then("the Staff account should be created successfully", async function () {
  // Add assertions or checks here to verify the account creation
  await driver.get("http://localhost:3000/adminportal/landingpage/1");
});
