import * as Mongoose from "mongoose";
import { IEmotionEntryModel } from "../interfaces/IEmotionEntryModel";

class EmotionEntryModel {
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
                feelings: { type: [String], required: true },
                moodScore: { type: Number, required: true }
            },
            { collection: "emotionentries" }
        );
    }    public createModel() {
        try {
            // Don't create a new connection here - we'll rely on the connection from JournalEntryModel
            this.model = Mongoose.model<IEmotionEntryModel>("EmotionEntry", this.schema);
        } catch (e) {
            // If model already exists, just retrieve it
            this.model = Mongoose.model<IEmotionEntryModel>("EmotionEntry");
        }
    }    // Log a new emotion entry
    public async createEmotionEntry(data: {
        userId: string;
        moodScore: number;
        feelings: string[];
        date?: Date;
    }) {
        try {
            // Validate input
            if (!data.userId) {
                throw new Error("userId is required");
            }
            
            if (typeof data.moodScore !== 'number' || data.moodScore < 1 || data.moodScore > 10) {
                throw new Error("moodScore must be a number between 1 and 10");
            }
            
            if (!Array.isArray(data.feelings) || data.feelings.length === 0) {
                throw new Error("feelings must be a non-empty array of strings");
            }
            
            const entry = new this.model({
                userId: data.userId,
                moodScore: data.moodScore,
                feelings: data.feelings,
                date: data.date || new Date()
            });
            
            const savedEntry = await entry.save();
            return savedEntry;
        } catch (e) {
            console.error("Error creating emotion entry:", e);
            throw e;
        }
    }    // Get monthly emotion data (with flexible date range for testing)
    public async getMonthlyEmotions(userId: string) {
        try {
            // for now, we will just get the last 1 month of data
            const endDate = new Date();
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1); // Start of the month 1 month ago

            
            const entries = await this.model.find({
                userId: userId,
                date: { $gte: startDate, $lte: endDate }
            }).sort({ date: 1 }).exec();
            
            return entries.map((entry: IEmotionEntryModel) => ({
                id: entry._id,
                date: entry.date,
                moodScore: entry.moodScore,
                feelings: entry.feelings
            }));
        } catch (e) {
            console.error("Error fetching monthly emotions:", e);
            return [];
        }
    }

    // Get all emotion entries for a user
    public async getAllEmotionEntries(userId: string) {
        try {
            const entries = await this.model.find({
                userId: userId
            }).sort({ date: -1 }).exec();

            return entries.map((entry: IEmotionEntryModel) => ({
                id: entry._id,
                date: entry.date,
                moodScore: entry.moodScore,
                feelings: entry.feelings
            }));
        } catch (e) {
            console.error("Error fetching all emotion entries:", e);
            return [];
        }
    }
}

export { EmotionEntryModel };