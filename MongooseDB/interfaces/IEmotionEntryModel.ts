import Mongoose = require("mongoose");

interface IEmotionEntryModel extends Mongoose.Document {
  userId: number;
  date: Date;
  moodScore: number;
  feelings: string[];
  people: string[];
  place: string[];
  createdAt: Date;
}

export { IEmotionEntryModel };