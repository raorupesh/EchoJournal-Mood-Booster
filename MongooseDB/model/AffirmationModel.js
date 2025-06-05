"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffirmationModel = void 0;
const Mongoose = require("mongoose");
const crypto = require("crypto");
const openai_1 = require("@ai-sdk/openai");
const ai_1 = require("ai");
const dotenv = require("dotenv");
dotenv.config();
const openai = (0, openai_1.createOpenAI)({
    apiKey: process.env.OPENAI_API_KEY,
});
class AffirmationModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    // Generate a unique ID using crypto
    generateId() {
        return crypto.randomBytes(16).toString('hex');
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            id: { type: String, required: true, unique: true },
            userId: { type: String, required: true },
            content: { type: String, required: true },
            sourceJournalEntry: { type: String, default: null },
            createdAt: { type: Date, default: Date.now }
        }, { collection: "affirmations" });
    }
    createModel() {
        try {
            this.model = Mongoose.model("Affirmation", this.schema);
        }
        catch (e) {
            // If model already exists, just retrieve it
            this.model = Mongoose.model("Affirmation");
        }
    }
    createAffirmationWithJournalEntry(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const affirmationContent = yield this.generateAIAffirmation(data);
            const affirmation = new this.model({
                id: this.generateId(),
                userId: data.userId,
                content: affirmationContent,
                createdAt: new Date(),
                sourceJournalEntry: data.id || null
            });
            return yield affirmation.save();
        });
    }
    generateAIAffirmation(journalData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let prompt;
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
                const { text } = yield (0, ai_1.generateText)({
                    model: openai('gpt-4.1-mini'),
                    prompt: prompt,
                });
                // Remove any quotes that might be in the response
                return text.replace(/^["']|["']$/g, '').trim();
            }
            catch (error) {
                console.error("Error generating AI affirmation:", error);
                // Fallback affirmation if AI generation fails
                return "You are growing stronger each day, and your journey matters.";
            }
        });
    }
    getAffirmations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ userId }).sort({ createdAt: -1 }).exec();
        });
    }
    deleteAffirmation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteOne({ id });
        });
    }
}
exports.AffirmationModel = AffirmationModel;
//# sourceMappingURL=AffirmationModel.js.map