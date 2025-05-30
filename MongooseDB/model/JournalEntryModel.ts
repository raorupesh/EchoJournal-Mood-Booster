import * as Mongoose from "mongoose";
import * as crypto from "crypto";
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
    
    // Generate a unique ID using crypto
    private generateId(): string {
        return crypto.randomBytes(16).toString('hex');
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                id: { type: String, required: true, default: () => this.generateId(), unique: true },
                userId: { type: Number, required: true },
                date: { type: Date, required: true },
                content: { type: String, required: true },
                feelings: { type: [String], required: true },
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now }
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
        userId: number;
        content: string;
        feelings: string[];
        date?: Date;
        id?: string;
    }) {
        const entry = new this.model({
            id: data.id || this.generateId(),
            userId: data.userId,
            content: data.content,
            feelings: data.feelings,
            date: data.date || new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await entry.save();
    }

    public async getJournalEntry(entryId: string, userId: number) {
        return await this.model.findOne({ id: entryId, userId }).exec();
    }


    public async getRecentJournalEntries(userId: number, limit: number = 3) {
        return await this.model.find({ userId })
            .sort({ date: -1 })
            .limit(limit)
            .exec();
    }

    public async getAllJournalEntries(userId: number, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const total = await this.model.countDocuments({ userId });
        const entries = await this.model.find({ userId })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        return { total, entries };
    }

    public async updateJournalEntry(entryId: string, update: {
        content?: string;
        feelings?: string[];
        updatedAT?: Date;
    }) {
        
        // Add updatedAt timestamp to the update
        const updatedData = { 
            ...update,
            updatedAt: new Date() 
        };
        
        const updatedEntry = await this.model.findOneAndUpdate(
            { id: entryId },
            updatedData,
            { new: true, runValidators: true }
        );
        return updatedEntry;
    }

    public async deleteJournalEntry(entryId: string) {
        await this.model.findOneAndDelete({ id: entryId });
        return true;
    }
}

export { JournalEntryModel };