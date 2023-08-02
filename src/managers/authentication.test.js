  // test("loginAuth should redirect to correct URL on successful login", async () => {
  //   const event = {
  //     Type: "Supervisor",
  //     ID: "rohan@gmail.com",
  //     password: "rohan123",
  //   };

  //   // Mock window.location.href
  //   delete window.location;
  //   window.location = { href: "" };

  //   await accountManager.loginAuth(event);

  //   // Replace 'expectedUserID' with the expected user ID after successful login
  //   expect(window.location.href).toBe("/supervisorportal/landingpage/10");
  // });

  // test("loginAuth should throw an error on invalid credentials", async () => {
  //   // Mock event data with incorrect password
  //   const event = {
  //     Type: "Supervisor",
  //     ID: "testsupervisor@gmail.com",
  //     password: "wrong-password",
  //   };

  //   await expect(accountManager.loginAuth(event)).rejects.toThrow("Invalid credentials");
  // });