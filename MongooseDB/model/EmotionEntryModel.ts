import * as Mongoose from "mongoose";
import * as crypto from "crypto";
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
                moodScore: { type: Number, required: true },
                feelings: { type: [String], required: true },
                people: { type: [String], required: true },
                place: { type: [String], required: true },
                createdAt: { type: Date, default: Date.now }
            },
            { collection: "emotionentries" }
        );
    }

    public createModel() {
        try {
            this.model = Mongoose.model<IEmotionEntryModel>("EmotionEntry", this.schema);
        } catch (e) {
            // If model already exists, just retrieve it
            this.model = Mongoose.model<IEmotionEntryModel>("EmotionEntry");
        }
    }

    // Log a new emotion entry
    public async createEmotionEntry(data: {
        userId: number;
        moodScore: number;
        feelings: string[];
        people: string[];
        place: string[];
        date?: Date;
        id?: string;
    }) {
        try {
            // Validate input
            if (data.userId === undefined || data.userId === null) {
                throw new Error("userId is required");
            }
            
            if (typeof data.moodScore !== 'number' || data.moodScore < 1 || data.moodScore > 10) {
                throw new Error("moodScore must be a number between 1 and 10");
            }
            
            if (!Array.isArray(data.feelings) || data.feelings.length === 0) {
                throw new Error("feelings must be a non-empty array of strings");
            }
            
            if (!Array.isArray(data.people)) {
                throw new Error("people must be an array of strings");
            }
            
            if (!Array.isArray(data.place)) {
                throw new Error("place must be an array of strings");
            }
            
            const entry = new this.model({
                id: data.id || this.generateId(),
                userId: data.userId,
                moodScore: data.moodScore,
                feelings: data.feelings,
                people: data.people || [],
                place: data.place || [],
                date: data.date || new Date(),
                createdAt: new Date()
            });
            
            const savedEntry = await entry.save();
            return savedEntry;
        } catch (e) {
            console.error("Error creating emotion entry:", e);
            throw e;
        }
    }

    // Get a specific emotion entry by ID
    public async getEmotionEntry(id: string, userId: number) {
      try {
        const entry = await this.model.findOne({ id: id, userId: userId }).exec();
        if (!entry) return null;
    
        return {
          id: entry.id,
          date: entry.date,
          moodScore: entry.moodScore,
          feelings: entry.feelings,
          people: entry.people,
          place: entry.place
        };
      } catch (e) {
        console.error("Error fetching emotion entry by ID:", e);
        throw e;
      }
    }

    // Get monthly emotion data (with flexible date range for testing)
    public async getMonthlyEmotions(userId: number) {
        try {
            // for now, we will just get the last 1 month of data
            const endDate = new Date();
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1); // Start of the month 1 month ago

            
            const entries = await this.model.find({
                userId: userId,
                date: { $gte: startDate, $lte: endDate }
            }).sort({ date: 1 }).exec();
            
            return entries.map((entry: IEmotionEntryModel) => ({
                id: entry.id,
                date: entry.date,
                moodScore: entry.moodScore,
                feelings: entry.feelings,
                people: entry.people,
                place: entry.place
            }));
        } catch (e) {
            console.error("Error fetching monthly emotions:", e);
            return [];
        }
    }
    
    // Get all emotion entries for a user
    public async getAllEmotionEntries(userId?: number) {
        try {
            let entries;
            if(userId){
                entries = await this.model.find({
                    userId: userId
                }).sort({ date: -1 }).exec();
            }
            else{
                entries = await this.model.find().sort({ date: -1 }).exec();
            }

            return entries.map((entry: IEmotionEntryModel) => ({
                id: entry.id,
                date: entry.date,
                moodScore: entry.moodScore,
                feelings: entry.feelings,
                people: entry.people,
                place: entry.place
            }));
        } catch (e) {
            console.error("Error fetching all emotion entries:", e);
            return [];
        }
    }

    public async updateEmotionEntry(id: string, data: Partial<IEmotionEntryModel>) {
        try {
            const result = await this.model.updateOne({ id }, { $set: data });
            return result;
        } catch (e) {
            console.error("Error updating emotion entry:", e);
            throw e;
        }
    }

    public async deleteEmotionEntry(id: string, userId: number) {
    try {
        return await this.model.deleteOne({ id, userId });
      } catch (e) {
        console.error("Error deleting emotion entry:", e);
        throw e;
      }
    }
}

export { EmotionEntryModel };