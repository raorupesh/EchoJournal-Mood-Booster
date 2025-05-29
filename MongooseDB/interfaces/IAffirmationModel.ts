import Mongoose = require("mongoose");

interface IAffirmationModel extends Mongoose.Document {
    id: string,
    userId: number,
    content: string,
    sourceJournalEntry: string,
    createdAt: Date,
}

export { IAffirmationModel };