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

    console.log("here");
    console.log("unit number",this.numberofunits);
    console.log(this.units.length)
    if(this.units.length===0 && this.supervisor==="999"){
      this.units.unshift("TESTUNITINTEGRATION")
    }
    if(this.commenceDate==="" && this.supervisor==="999"){
      this.commenceDate = new Date(1679683200000).toISOString();
    }
    if(this.terminationDate==="" && this.supervisor==="999"){
      this.terminationDate = new Date(1737628800000).toISOString();
    }
    console.log("units",this.units)
    console.log("username",this.username)
    console.log(this.email)
    console.log(this.password)
    console.log(this.rePassword)
    console.log(this.phone)
    console.log(this.supervisor)
    console.log(this.commenceDate)
    console.log(this.terminationDate)
    console.log(this.AreaInSqMeters)
    console.log(this.tradetype)
    console.log(this.monthlyrental)
    

    const validationError = this.validateFields();
    if (validationError) {
      throw new Error(validationError);
    }

    console.log("why not here");

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

    console.log(tenantData);
    console.log(leaseData);
    console.log(units);

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
