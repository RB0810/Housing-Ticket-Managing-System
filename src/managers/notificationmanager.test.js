import NotificationManager from "./notificationmanager";
import emailjs from "emailjs-com";

jest.mock("emailjs-com", () => ({
  init: jest.fn(),
  send: jest.fn(),
}));

describe("Sending Notifications", () => {
  let notificationManager;
  let PublicKey;
  let ServiceID;
  let Template;

  beforeAll(() => {
    notificationManager = new NotificationManager();
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clears the mock calls history before each test
  });

  test("should send email successfully", async () => {
    const emailParams = {
      // Replace with your email parameters here
      to_email: "recipient@example.com",
      from_name: "Your Name",
      message: "Test email message",
    };

    // Mock the successful response from emailjs.send
    const successfulResponse = {
      status: 200,
      text: "OK",
    };
    emailjs.send.mockResolvedValue(successfulResponse);

    // Spy on console.log
    const consoleLogSpy = jest.spyOn(console, "log");

    // Call the function and await its response
    await notificationManager.handleSendEmail(emailParams);

    PublicKey = "_MZEl_HwYyb8X78QO";
    ServiceID = "service_7n9ni8h";
    Template = "template_1ywp398";

    // Expect that emailjs.init was called with your API key
    expect(emailjs.init).toHaveBeenCalledWith(PublicKey);

    // Expect that emailjs.send was called with the correct parameters
    expect(emailjs.send).toHaveBeenCalledWith(
      ServiceID,
      Template,
      emailParams
    );

    // Expect that console.log was called with the success message
    expect(consoleLogSpy).toHaveBeenCalledWith("Email sent successfully!", successfulResponse);
  });
});
