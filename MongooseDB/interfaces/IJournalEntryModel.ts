import Mongoose = require("mongoose");

interface IJournalEntryModel extends Mongoose.Document {
  id: string;
  userId: string;
  date: Date;
  content: string;
  feelings: string[];
  createdAt: Date;
  updatedAt: Date;
}

export { IJournalEntryModel };