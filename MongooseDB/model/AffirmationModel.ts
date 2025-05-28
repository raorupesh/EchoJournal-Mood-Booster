import * as Mongoose from "mongoose";
import * as crypto from "crypto";
import { IAffirmationModel } from "../interfaces/IAffirmationModel";

class AffirmationModel {
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
                id: { type: String, required: true, unique: true },
                userId: { type: Number, required: true },
                content: { type: String, required: true },
                sourceJournalEntry: { type: String, default: null },
                createdAt: { type: Date, default: Date.now }
            },
            { collection: "affirmations" }
        );
    }

    public createModel() {
        try {
            this.model = Mongoose.model<IAffirmationModel>("Affirmation", this.schema);
        } catch (e) {
            // If model already exists, just retrieve it
            this.model = Mongoose.model<IAffirmationModel>("Affirmation");
        }
    }

    public async createAffirmation(data: IAffirmationModel): Promise<IAffirmationModel> {

        // TODO: use AI and create a more meaningful affirmation based on the journal entry

        const entry = new this.model({
            id: data.id || this.generateId(),
            userId: data.userId,
            content: data.content,
            createdAt: new Date(),
            sourceJournalEntry: data.sourceJournalEntry || null
        });
        
        return await entry.save();
    }

    public async getAffirmations(userId: number): Promise<IAffirmationModel[]> {
        return await this.model.find({ userId }).sort({ createdAt: -1 }).exec();
    }

    public async deleteAffirmation(id: string): Promise<void> {
        await this.model.deleteOne({ id });
    }

}

export { AffirmationModel };