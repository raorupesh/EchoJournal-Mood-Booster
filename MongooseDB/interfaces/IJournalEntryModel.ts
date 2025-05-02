import Mongoose = require("mongoose");

interface IJournalEntryModel extends Mongoose.Document {
  userId: string;
  date: Date;
  content: string;
  feelings: string[];
  moodScore: number;
}

export { IJournalEntryModel };