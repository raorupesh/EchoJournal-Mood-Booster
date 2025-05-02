import * as Mongoose from "mongoose";
import { IJournalEntryModel } from "../interfaces/IJournalEntryModel";

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
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            this.model = Mongoose.model<IJournalEntryModel>("EmotionEntry", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    // Log a new emotion entry
    public async createEmotionEntry(data: {
        userId: string;
        moodScore: number;
        feelings: string[];
        date?: Date;
    }) {
        const entry = new this.model({
            userId: data.userId,
            moodScore: data.moodScore,
            feelings: data.feelings,
            date: data.date || new Date()
        });
        return await entry.save();
    }

    // Get monthly emotion data (last 30 days)
    public async getMonthlyEmotions(userId: string) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const entries = await this.model.find({
            userId: userId,
            date: { $gte: thirtyDaysAgo }
        }).sort({ date: 1 }).exec();

        return entries.map((entry: IJournalEntryModel) => ({
            date: entry.date,
            moodScore: entry.moodScore,
            feelings: entry.feelings
        }));
    }
}

export { EmotionEntryModel };