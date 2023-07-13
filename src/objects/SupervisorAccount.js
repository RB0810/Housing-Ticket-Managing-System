import AccountManager from "../managers/accountmanager";
import Account from "./Account";

class SupervisorAccount extends Account {
  constructor() {
    super();
    this.buildingName = "";
    this.buildingAddress = "";
    this.postalCode = "";
  }

  validateFields() {
    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.rePassword ||
      !this.buildingName ||
      !this.buildingAddress ||
      !this.phone ||
      !this.postalCode
    ) {
      return "Please fill out all fields";
    }

    if (this.password !== this.rePassword) {
      return "Passwords do not match";
    }

    return null;
  }

  async createAccount() {
    const validationError = this.validateFields();
    if (validationError) {
      throw new Error(validationError);
    }

    const accountManager = new AccountManager();

    const building = {
      BuildingName: this.buildingName,
      Address: this.buildingAddress,
      PostalCode: this.postalCode,
    };

    const supervisor = {
      SupervisorUsername: this.username,
      SupervisorEmail: this.email,
      SupervisorPassword: this.password,
      SupervisorPhone: this.phone,
      BuildingID: null,
    };

    try {
      await accountManager.createSupervisorAcc(building, supervisor);
      return "Supervisor Account Created!";
    } catch (error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }
}

export default SupervisorAccount;
