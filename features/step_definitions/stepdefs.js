const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver;

Given("I am on the Admin Portal login page", async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();
  await driver.get("http://localhost:3000/adminlogin");
});

When("I enter valid admin credentials", async function () {
  await driver.findElement(By.name("username")).sendKeys("admin");
  await driver.findElement(By.name("password")).sendKeys("adminpassword");
});

When("click on the login button", async function () {
  await driver.findElement(By.css('button[type="submit"]')).click();
});

Then("I should be logged in successfully", async function () {
  await driver.wait(until.titleIs("Admin Dashboard"), 5000);
  await driver.quit();
});

Given("I am logged in as an admin", async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();
  await driver.get("http://example.com/admin/dashboard");
});

When("I navigate to the Supervisor creation page", async function () {
  await driver.findElement(By.linkText("Create Supervisor")).click();
});

When("fill in the required details", async function () {
  await driver.findElement(By.name("name")).sendKeys("John Doe");
  await driver.findElement(By.name("email")).sendKeys("john.doe@example.com");
});

When("click on the submit button", async function () {
  await driver.findElement(By.css('button[type="submit"]')).click();
});

Then(
  "the Supervisor account should be created successfully",
  async function () {
    // Add assertions or checks here to verify the account creation
    await driver.quit();
  }
);
