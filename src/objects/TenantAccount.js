import AccountManager from "../managers/accountmanager";
import Account from "./Account";

class TenantAccount extends Account {
  constructor() {
    super();
    this.supervisor = "";
    this.commenceDate = "";
    this.terminationDate = "";
    this.status = "Active";
    this.AreaInSqMeters = "";
    this.tradetype = "";
    this.monthlyrental = "";
    this.numberofunits = "";
    this.units = [];
  }

  validateFields() {
    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.rePassword ||
      !this.phone ||
      !this.supervisor ||
      !this.commenceDate ||
      !this.terminationDate ||
      !this.AreaInSqMeters ||
      !this.tradetype ||
      !this.monthlyrental ||
      this.units.some((unit) => unit === "")
    ) {
      return "Please fill out all fields";
    }

    if (this.password !== this.rePassword) {
      return "Passwords do not match";
    }

    return null;
  }

  async createAccount() {

    if(this.numberofunits === ""){
      this.numberofunits = 1
    }

    if(this.units === []){
      this.units=["TESTUNIT"]
    }

    const validationError = this.validateFields();
    if (validationError) {
      throw new Error(validationError);
    }

    const accountManager = new AccountManager();

    const tenantData = {
      TenantName: this.username,
      TenantEmail: this.email,
      TenantPassword: this.password,
      TenantPhone: this.phone,
      UnderSupervisor: this.supervisor,
      Lease: null,
    };

    const leaseData = {
      CommenceDate: this.commenceDate,
      TerminationDate: this.terminationDate,
      Status: this.status,
      AreaInSqMeters: this.AreaInSqMeters,
      TradeType: this.tradetype,
      MonthlyRental: this.monthlyrental,
    };

    const units = {
      number: this.numberofunits,
      unit: this.units,
    };

    console.log(tenantData, leaseData, units)

    try {
      await accountManager.createTenantAccount(tenantData, leaseData, units);
      return "Tenant Account Created!";
    } catch (error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }
}

export default TenantAccount;
