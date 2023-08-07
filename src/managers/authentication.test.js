import Authentication from "./authentication"
import supabase from "../config/supabaseClient" 
import Cookies from "js-cookie";

import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.window = dom.window;

describe("Authentication all test cases", () => {
  let authentication;

  beforeAll(() => {
    authentication = new Authentication();
  });
  
  test("loginAuth should redirect to correct URL on successful login", async () => {
    const event = {
      Type: "Supervisor",
      ID: "testsupervisor@gmail.com",
      password: "testsupervisor123",
    };

    // Mock window.location.href
    delete window.location;
    window.location = { href: "" };

    await authentication.loginAuth(event);

    // Replace 'expectedUserID' with the expected user ID after successful login
    expect(window.location.href).toBe("/twofactorauth/supervisor/999");
  });

  test("loginAuth should throw an error on invalid credentials", async () => {
    // Mock event data with incorrect password
    const event = {
      Type: "Supervisor",
      ID: "testsupervisor@gmail.com",
      password: "wrong-password",
    };

    await expect(authentication.loginAuth(event)).rejects.toThrow("Invalid credentials");
  });
});