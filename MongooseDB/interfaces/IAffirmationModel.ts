import Mongoose = require("mongoose");

interface IAffirmationModel extends Mongoose.Document {
    id: string,
    userId: string,
    content: string,
    sourceJournalEntry: string,
    createdAt: Date,
}

export { IAffirmationModel };