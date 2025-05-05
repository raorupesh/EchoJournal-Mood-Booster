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
exports.EmotionEntryModel = void 0;
const Mongoose = require("mongoose");
class EmotionEntryModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userId: { type: String, required: true },
            date: { type: Date, required: true },
            feelings: { type: [String], required: true },
            moodScore: { type: Number, required: true }
        }, { collection: "emotionentries" });
    }
    createModel() {
        try {
            // Don't create a new connection here - we'll rely on the connection from JournalEntryModel
            this.model = Mongoose.model("EmotionEntry", this.schema);
            console.log("EmotionEntry model created");
        }
        catch (e) {
            // If model already exists, just retrieve it
            this.model = Mongoose.model("EmotionEntry");
            console.log("Retrieved existing EmotionEntry model");
        }
    } // Log a new emotion entry
    createEmotionEntry(data) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const savedEntry = yield entry.save();
                console.log(`Created emotion entry for user ${data.userId} with mood score ${data.moodScore}`);
                return savedEntry;
            }
            catch (e) {
                console.error("Error creating emotion entry:", e);
                throw e;
            }
        });
    } // Get monthly emotion data (with flexible date range for testing)
    getMonthlyEmotions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // for now, we will just get the last 1 month of data
                const endDate = new Date();
                const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1); // Start of the month 1 month ago
                console.log(`Getting emotion entries for ${userId} from ${startDate.toISOString()} to ${endDate.toISOString()}`);
                const entries = yield this.model.find({
                    userId: userId,
                    date: { $gte: startDate, $lte: endDate }
                }).sort({ date: 1 }).exec();
                console.log(`Found ${entries.length} emotion entries for user ${userId}`);
                return entries.map((entry) => ({
                    id: entry._id,
                    date: entry.date,
                    moodScore: entry.moodScore,
                    feelings: entry.feelings
                }));
            }
            catch (e) {
                console.error("Error fetching monthly emotions:", e);
                return [];
            }
        });
    }
    // Get all emotion entries for a user
    getAllEmotionEntries(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entries = yield this.model.find({
                    userId: userId
                }).sort({ date: -1 }).exec();
                console.log("All Emotion Entries for user " + userId + ":", entries.length);
                return entries.map((entry) => ({
                    id: entry._id,
                    date: entry.date,
                    moodScore: entry.moodScore,
                    feelings: entry.feelings
                }));
            }
            catch (e) {
                console.error("Error fetching all emotion entries:", e);
                return [];
            }
        });
    }
}
exports.EmotionEntryModel = EmotionEntryModel;
//# sourceMappingURL=EmotionEntryModel.js.map