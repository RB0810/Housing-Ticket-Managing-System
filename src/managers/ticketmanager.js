import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

class TicketManager {
  constructor() {
    this.supabase = supabase;
  }

  async addTicket(ticket) {
    const { data, error } = await this.supabase
      .from("Service Request")
      .insert(ticket);

    if (error) {
      console.error("Error adding ticket:", error);
    } else {
      console.log("Ticket added successfully:", data);
    }
  }

  async updateTicket(ticket) {}

  async deleteTicket(ticketId) {
    const { data, error } = await this.supabase
      .from("tickets")
      .delete()
      .eq("id", ticketId);

    if (error) {
      console.error("Error deleting ticket:", error);
    } else {
      console.log("Ticket deleted successfully:", data);
    }
  }
}
