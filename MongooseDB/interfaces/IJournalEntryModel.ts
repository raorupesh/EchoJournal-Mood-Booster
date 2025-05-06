import Mongoose = require("mongoose");

interface IJournalEntryModel extends Mongoose.Document {
  userId: number;
  date: Date;
  content: string;
  feelings: string[];
  createdAt: Date;
  updatedAt: Date;
}

export { IJournalEntryModel };