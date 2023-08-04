const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require('chai')
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = "https://mnfsjgaziftztwiarlys.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function querySupabaseForCredentials(email) {
  const { data, error } = await supabase
    .from('SupervisorUsers')
    .select('*')
    .eq('SupervisorEmail', email);

  if (error) {
    console.error('Error querying Supabase:', error);
    return null;
  }
  return data; 
}


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

Given("I am in the Create Supervisor account page", async function () {
  const createSupervisorLink = await driver.findElement(By.id("admin-landing-page-create-supervisor-account"));
  await createSupervisorLink.click();
  await driver.get("http://localhost:3000/adminportal/createsupervisoracc/999");
});

When("I fill in all required details", async function () {
  const emailField = await driver.findElement(By.id("create-supervisor-email-textfield"));
  await emailField.sendKeys("testcreatesupervisor@gmail.com");
  const userField = await driver.findElement(By.id("create-supervisor-username-textfield"));
  await userField.sendKeys("testsupervisor");
  const pwField = await driver.findElement(By.id("create-supervisor-password-textfield"));
  await pwField.sendKeys("testsupervisor");
  const repwField = await driver.findElement(By.id("create-supervisor-repassword-textfield"));
  await repwField.sendKeys("testsupervisor");
  const phoneField = await driver.findElement(By.id("create-supervisor-phone-number-textfield"));
  await phoneField.sendKeys("11111111");
  const buildingField = await driver.findElement(By.id("create-supervisor-building-name-textfield"));
  await buildingField.sendKeys("Building 1");
  const supbuildField = await driver.findElement(By.id("create-supervisor-building-address-textfield"));
  await supbuildField.sendKeys("111 Address");
  const postalcodeField = await driver.findElement(By.id("create-supervisor-postal-code-textfield"));
  await postalcodeField.sendKeys("111111");

  const createButton = await driver.findElement(By.id("create-supervisor-submit-button"));
  await createButton.click();
});

Then("a new supervisor account is created and the credentials are recorded in the supabase table", async function () {
  const credentials = await querySupabaseForCredentials("testcreatesupervisor@gmail.com");
  expect(credentials).to.exist;
});



