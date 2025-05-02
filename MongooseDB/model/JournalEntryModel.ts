import * as Mongoose from "mongoose";
import { IJournalEntryModel } from "../interfaces/IJournalEntryModel";

class JournalEntryModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                userId: { type: String, required: true },
                date: { type: Date, required: true },
                content: { type: String, required: true },
                feelings: { type: [String], required: true },
                moodScore: { type: Number, required: true }
            },
            { collection: "journalentries" }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            this.model = Mongoose.model<IJournalEntryModel>("JournalEntry", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    public async createJournalEntry(data: {
        userId: string;
        content: string;
        moodScore: number;
        feelings: string[];
        date?: Date;
    }) {
        const entry = new this.model({
            userId: data.userId,
            content: data.content,
            moodScore: data.moodScore,
            feelings: data.feelings,
            date: data.date || new Date()
        });
        return await entry.save();
    }

    public async getRecentJournalEntries(userId: string, limit: number = 3) {
        return await this.model.find({ userId })
            .sort({ date: -1 })
            .limit(limit)
            .exec();
    }

    public async getAllJournalEntries(userId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const total = await this.model.countDocuments({ userId });
        const entries = await this.model.find({ userId })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        return { total, entries };
    }

    public async updateJournalEntry(id: string, userId: string, update: {
        content?: string;
        moodScore?: number;
        feelings?: string[];
    }) {
        const entry = await this.model.findOne({ _id: id, userId });
        if (!entry) {
            return null;
        }
        const updatedEntry = await this.model.findByIdAndUpdate(
            id,
            { ...update },
            { new: true, runValidators: true }
        );
        return updatedEntry;
    }

    public async deleteJournalEntry(id: string, userId: string) {
        const entry = await this.model.findOne({ _id: id, userId });
        if (!entry) {
            return null;
        }
        await this.model.findByIdAndDelete(id);
        return true;
    }
}

export { JournalEntryModel };