import AccountManager from "../managers/accountmanager";
import Account from "./Account";

class StaffAccount extends Account {
  constructor() {
    super();
    this.buildingID = "";
    this.buildingOptions = [];
    this.accountManager = new AccountManager();
  }

  async fetchBuildingOptions() {
    const buildings = await this.accountManager.getBuildings();
    if (Array.isArray(buildings)) {
      const options = buildings.map((building) => ({
        id: building.BuildingID,
        name: building.BuildingName,
        address: building.Address,
      }));
      this.buildingOptions = options;
    }
  }

  validateFields() {
    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.rePassword ||
      !this.phone ||
      !this.buildingID
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

    const staff = {
      StaffUsername: this.username,
      StaffEmail: this.email,
      StaffPassword: this.password,
      StaffPhone: this.phone,
      BuildingID: this.buildingID,
    };

    try {
      await this.accountManager.createStaffAccount(staff);
      return "Staff Account Created!";
    } catch (error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }
}

export default StaffAccount;
