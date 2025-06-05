import * as Mongoose from "mongoose";
import * as crypto from "crypto";
import { IAffirmationModel } from "../interfaces/IAffirmationModel";
import { IJournalEntryModel } from "../interfaces/IJournalEntryModel";
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import * as dotenv from 'dotenv';
dotenv.config();


const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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
                userId: { type: String, required: true },
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

    public async createAffirmationWithJournalEntry(data: IJournalEntryModel): Promise<IAffirmationModel> {
        const affirmationContent = await this.generateAIAffirmation(data);

        const affirmation = new this.model({
            id: this.generateId(),
            userId: data.userId,
            content: affirmationContent,
            createdAt: new Date(),
            sourceJournalEntry: data.id || null
        });

        return await affirmation.save();
    }

    private async generateAIAffirmation(journalData: IJournalEntryModel): Promise<string> {
        try {
            let prompt: string;

            const formattedDate = journalData.date.toLocaleDateString();
            const feelingsText = journalData.feelings && journalData.feelings.length > 0
                ? `The writer expressed these feelings: ${journalData.feelings.join(', ')}.`
                : '';

            prompt = `Create a personalized, uplifting affirmation based on this journal entry from ${formattedDate}.
                
                Journal content: "${journalData.content}"
                
                ${feelingsText}
                
                The affirmation should:
                1. Be one concise, impactful sentence
                2. Feel deeply personal to address the writer's specific situation and emotions
                3. Offer encouragement that resonates with their expressed feelings
                4. Foster self-compassion and positive growth
                5. Avoid complex language or jargon, making it accessible and relatable
                6. Be written in first-person ("I" statements)`;

            const { text } = await generateText({
                model: openai('gpt-4.1-mini'),
                prompt: prompt,
            });

            // Remove any quotes that might be in the response
            return text.replace(/^["']|["']$/g, '').trim();
        } catch (error) {
            console.error("Error generating AI affirmation:", error);
            // Fallback affirmation if AI generation fails
            return "You are growing stronger each day, and your journey matters.";
        }
    }

    public async getAffirmations(userId: string): Promise<IAffirmationModel[]> {
        return await this.model.find({ userId }).sort({ createdAt: -1 }).exec();
    }

    public async deleteAffirmation(id: string): Promise<void> {
        await this.model.deleteOne({ id });
    }

}

export { AffirmationModel };