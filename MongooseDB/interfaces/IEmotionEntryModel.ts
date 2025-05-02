import Mongoose = require("mongoose");

interface IEmotionEntryModel extends Mongoose.Document {
  userId: string;
  date: Date;
  moodScore: number;
  feelings: string[];
}

export { IEmotionEntryModel };