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
const crypto = require("crypto");
class EmotionEntryModel {
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
            id: { type: String, required: true, default: () => this.generateId(), unique: true },
            userId: { type: Number, required: true },
            date: { type: Date, required: true },
            moodScore: { type: Number, required: true },
            feelings: { type: [String], required: true },
            people: { type: [String], required: true },
            place: { type: [String], required: true },
            createdAt: { type: Date, default: Date.now }
        }, { collection: "emotionentries" });
    }
    createModel() {
        try {
            // Don't create a new connection here - we'll rely on the connection from JournalEntryModel
            this.model = Mongoose.model("EmotionEntry", this.schema);
        }
        catch (e) {
            // If model already exists, just retrieve it
            this.model = Mongoose.model("EmotionEntry");
        }
    }
    // Log a new emotion entry
    createEmotionEntry(data) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const savedEntry = yield entry.save();
                return savedEntry;
            }
            catch (e) {
                console.error("Error creating emotion entry:", e);
                throw e;
            }
        });
    }
    // Get monthly emotion data (with flexible date range for testing)
    getMonthlyEmotions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // for now, we will just get the last 1 month of data
                const endDate = new Date();
                const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1); // Start of the month 1 month ago
                const entries = yield this.model.find({
                    userId: userId,
                    date: { $gte: startDate, $lte: endDate }
                }).sort({ date: 1 }).exec();
                return entries.map((entry) => ({
                    id: entry.id,
                    date: entry.date,
                    moodScore: entry.moodScore,
                    feelings: entry.feelings,
                    people: entry.people,
                    place: entry.place
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
                return entries.map((entry) => ({
                    id: entry.id,
                    date: entry.date,
                    moodScore: entry.moodScore,
                    feelings: entry.feelings,
                    people: entry.people,
                    place: entry.place
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