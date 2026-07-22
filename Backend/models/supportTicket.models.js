const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema({
  summary:      { type: String, required: true },
  conversation: { type: String, default: "" },
  userContact:  { type: String, default: "" },
  status:       { type: String, default: "open", enum: ["open", "in_progress", "resolved", "closed"] },
  createdAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
