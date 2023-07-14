import { useState } from "react";
import TicketManager from "../managers/ticketmanager";
import AccountManager from "../managers/accountmanager";
import QuotationUploader from "./QuotationUploader";

export default function QuotationSection({ ticket }) {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();

  const [quotationRequired, setQuotationRequired] = useState("");
  const [file, setFile] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");

  const handleQuotationRequiredChange = (e) => {
    setQuotationRequired(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContinue = async () => {
    try {
      await ticketManager.updateTicket(
        ticket.ServiceRequestID,
        "QuotationRequired",
        quotationRequired
      );

      // Perform any additional actions or display a success message
      setUpdateStatus("Update successful");
    } catch (error) {
      // Handle errors appropriately
      setUpdateStatus("Update failed");
    }
  };

  return (
    <div>
      <label>
        Quotation Required:
        <select
          value={quotationRequired}
          onChange={handleQuotationRequiredChange}
        >
          <option value="">-- Select Option --</option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </label>

      {quotationRequired === "YES" && (
        <div>
          <QuotationUploader onFileChange={handleFileChange} />
        </div>
      )}

      <button onClick={handleContinue}>Continue</button>

      {updateStatus && <p>{updateStatus}</p>}
    </div>
  );
}
