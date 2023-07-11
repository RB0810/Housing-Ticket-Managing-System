class Account {
    constructor() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.rePassword = "";
      this.phone = "";
    }
  
    validateFields() {
      throw new Error("Abstract method 'validateFields' must be implemented");
    }
  
    async createAccount() {
      throw new Error("Abstract method 'createAccount' must be implemented");
    }
  }
  
  export default Account;
  