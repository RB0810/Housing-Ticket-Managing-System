const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, Key, until, Select, Capabilities } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require('chai')
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = "https://mnfsjgaziftztwiarlys.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);


require("chromedriver");
// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

function formatDate(date) {
  var dd = String(date.getDate());
  var mm = String(date.getMonth() + 1); 
  var yyyy = date.getFullYear();

  return mm + '/' + dd + '/' + yyyy; // Now in MM/DD/YYYY format
}

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

Given("I am at the landing page", async function () {
    await driver.get("http://localhost:3000/adminlogin");
});

When('I enter correct credentials for admin', async function () { 
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


Given("I click on Create Supervisor", async function () {
    await driver.get("http://localhost:3000/adminportal/landingpage/999");
    const createSupervisorLink = await driver.findElement(By.id("admin-landing-page-create-supervisor-account"));
    await createSupervisorLink.click();
    await driver.get("http://localhost:3000/adminportal/createsupervisoracc/999");
});

When("I enter all Supervisor information", async function () {
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
  await buildingField.sendKeys("Test Building");
  const supbuildField = await driver.findElement(By.id("create-supervisor-building-address-textfield"));
  await supbuildField.sendKeys("Test Building Address");
  const postalcodeField = await driver.findElement(By.id("create-supervisor-postal-code-textfield"));
  await postalcodeField.sendKeys("111111");

  const createButton = await driver.findElement(By.id("create-supervisor-submit-button"));
  await createButton.click();
});

Then('a Supervisor is created', async function () {
  const credentials = await querySupabaseForCredentials("testcreatesupervisor@gmail.com");
  expect(credentials).to.exist;
  const sweetAlert = await driver.wait(until.elementLocated(By.className('createSupervisorAcc')), 10000);
  const okButton = await sweetAlert.findElement(By.css('.swal2-confirm'));
  await okButton.click();
});

Given("I click on Create Staff", async function () {
    await driver.get("http://localhost:3000/adminportal/landingpage/999");
    const createStaffLink = await driver.findElement(By.id("admin-landing-page-create-staff-account"));
    await createStaffLink.click();
    await driver.get("http://localhost:3000/adminportal/createstaffacc/999");
});

When("I enter all Staff information", async function () {
  const emailFieldStaff = await driver.findElement(By.id("create-staff-email-textfield"));
  await emailFieldStaff.sendKeys("testcreatestaff@gmail.com");
  const userFieldStaff = await driver.findElement(By.id("create-staff-username-textfield"));
  await userFieldStaff.sendKeys("teststaff");
  const pwFieldStaff = await driver.findElement(By.id("create-staff-password-textfield"));
  await pwFieldStaff.sendKeys("teststaff");
  const repwFieldStaff = await driver.findElement(By.id("create-staff-repassword-textfield"));
  await repwFieldStaff.sendKeys("teststaff");
  const phoneFieldStaff = await driver.findElement(By.id("create-staff-phone-number-textfield"));
  await phoneFieldStaff.sendKeys("11111111");

  await driver.findElement(By.id("create-staff-building-id-select")).click();
  await driver.findElement(By.id("999")).click();

  const createButtonStaff = await driver.findElement(By.id("create-staff-submit-button"));
  await createButtonStaff.click();

  const sweetAlert = await driver.wait(until.elementLocated(By.className('createStaffAcc')), 10000);
  const okButton = await sweetAlert.findElement(By.css('.swal2-confirm'));
  await okButton.click();

  
});

Then('a Staff is created', async function () {
  const { data, error } = await supabase
    .from('StaffUsers')
    .select('*')
    .eq('StaffEmail', "testcreatestaff@gmail.com");
  
  if (error) {
    console.error('Error querying Supabase:', error);
    return null;
  }

  expect(data).to.exist;
});

Given("I click on Manage Accounts", async function () {
  await driver.get("http://localhost:3000/adminportal/landingpage/999");
  const createSupervisorLink = await driver.findElement(By.id("admin-landing-page-manage-account"));
  await createSupervisorLink.click();
  await driver.get("http://localhost:3000/adminportal/manageacc/999");
});

When("I click on a specific card", async function () {
  await driver.get("http://localhost:3000/adminportal/manageacc/999/building/999");
});

Then("I see Building details", async function () {
  const buildingID = '999'

  // Fetch info from StaffUsers
  let { data: staffEmailData, error: staffEmailError } = await supabase
    .from('StaffUsers')
    .select('StaffEmail')
    .eq('StaffID', buildingID);
  if (staffEmailError) {
    throw staffEmailError;
  }

  let { data: staffPhoneData, error: staffPhoneError } = await supabase
    .from('StaffUsers')
    .select('StaffPhone')
    .eq('StaffID', buildingID);
  if (staffPhoneError) {
    throw staffPhoneError;
  }


  // Fetch info from TenantUsers
  let { data: tenantEmailData, error: tenantEmailError } = await supabase
    .from('TenantUsers')
    .select('TenantEmail')
    .eq('TenantID', buildingID);
  if (tenantEmailError) {
    throw tenantEmailError;
  }

  let { data: tenantPhoneData, error: tenantPhoneError } = await supabase
    .from('TenantUsers')
    .select('TenantPhone')
    .eq('TenantID', buildingID);
  if (tenantPhoneError) {
    throw tenantPhoneError;
  }

  let { data: leaseCommData, error: leaseCommError } = await supabase
    .from('Lease')
    .select('CommenceDate')
    .eq('LeaseID', buildingID);
  if (leaseCommError) {
    throw leaseCommError;
  }

  let { data: leaseTermData, error: leaseTermError } = await supabase
    .from('Lease')
    .select('TerminationDate')
    .eq('LeaseID', buildingID);
  if (leaseTermError) {
    throw leaseTermError;
  }

  let { data: leaseRentData, error: leaseRentError } = await supabase
    .from('Lease')
    .select('MonthlyRental')
    .eq('LeaseID', buildingID);
  if (leaseRentError) {
    throw leaseRentError;
  }

  let { data: leaseTradeData, error: leaseTradeError } = await supabase
    .from('Lease')
    .select('TradeType')
    .eq('LeaseID', buildingID);
  if (leaseTradeError) {
    throw leaseTradeError;
  }

  let { data: leaseAreaData, error: leaseAreaError } = await supabase
    .from('Lease')
    .select('AreaInSqMeters')
    .eq('LeaseID', buildingID);
  if (leaseAreaError) {
    throw leaseAreaError;
  }

  let { data: unitData, error: unitError } = await supabase
    .from('Unit')
    .select('UnitNumber')
    .eq('UnitID', buildingID);
  if (unitError) {
    throw unitError;
  }

  const staffEmailElement = await driver.wait(until.elementLocated(By.id("999-staffemail")), 10000);
  const staffPhoneElement = await driver.wait(until.elementLocated(By.id("999-staffphone")), 5000);
  const tenantEmailElement = await driver.wait(until.elementLocated(By.id("999-tenantemail")), 5000);
  const tenantPhoneElement = await driver.wait(until.elementLocated(By.id("999-tenantphone")), 5000);
  const commdateElement = await driver.wait(until.elementLocated(By.id("999-commdate")), 5000);
  const termdateElement = await driver.wait(until.elementLocated(By.id("999-termdate")), 5000);
  const rentElement = await driver.wait(until.elementLocated(By.id("999-rent")), 5000);
  const bizElement = await driver.wait(until.elementLocated(By.id("999-biz")), 5000);
  const areaElement = await driver.wait(until.elementLocated(By.id("999-area")), 5000);
  const unitElement = await driver.wait(until.elementLocated(By.id("999-unit")), 5000);  

  const staffEmail = await staffEmailElement.getAttribute("value");
  const staffPhone = await staffPhoneElement.getAttribute('value');
  const tenantEmail = await tenantEmailElement.getAttribute('value');
  const tenantPhone = await tenantPhoneElement.getAttribute("value");
  const commdate = await commdateElement.getAttribute('value');
  const termdate = await termdateElement.getAttribute('value');
  const rent = await rentElement.getAttribute("value");
  const biz = await bizElement.getAttribute('value');
  const area = await areaElement.getAttribute('value');
  const unit = await unitElement.getAttribute('value');

  const formCommDate = formatDate(new Date(leaseCommData[0].CommenceDate))
  const formTermDate = formatDate(new Date(leaseTermData[0].TerminationDate))
  console.log("formcommdate " + formCommDate )
  console.log("commdate " + commdate)

  expect(staffEmail).to.equal(staffEmailData[0].StaffEmail.toString());
  expect(staffPhone).to.equal(staffPhoneData[0].StaffPhone.toString());
  expect(tenantEmail).to.equal(tenantEmailData[0].TenantEmail.toString());
  expect(tenantPhone).to.equal(tenantPhoneData[0].TenantPhone.toString());
  expect(commdate).to.equal(formCommDate);
  expect(termdate).to.equal(formTermDate);
  expect(rent).to.equal(leaseRentData[0].MonthlyRental.toString());
  expect(biz).to.equal(leaseTradeData[0].TradeType.toString());
  expect(area).to.equal(leaseAreaData[0].AreaInSqMeters.toString());
  expect(unit).to.equal(unitData[0].UnitNumber.toString());
  
});

AfterAll(async function(){
  const { error: supervisorError } = await supabase
    .from('SupervisorUsers')
    .delete()
    .eq('SupervisorEmail', "testcreatesupervisor@gmail.com");

  if (supervisorError) {
    console.error('Error deleting supervisor account from Supabase:', supervisorError);
  }

  const { error: staffError } = await supabase
    .from('StaffUsers')
    .delete()
    .eq('StaffEmail', "testcreatestaff@gmail.com");

  if (staffError) {
    console.error('Error deleting staff account from Supabase:', staffError);
  }

  const { error: buildingError } = await supabase
    .from('Buildings')
    .delete()
    .eq('BuildingName', "Test Building");

  if (buildingError) {
    console.error('Error deleting building entry from Supabase:', buildingError);
  }

  await driver.quit();
});