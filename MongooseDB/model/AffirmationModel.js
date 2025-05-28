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
            userId: { type: Number, required: true },
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
    createAffirmation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: use AI and create a more meaningful affirmation based on the journal entry
            const entry = new this.model({
                id: data.id || this.generateId(),
                userId: data.userId,
                content: data.content,
                createdAt: new Date(),
                sourceJournalEntry: data.sourceJournalEntry || null
            });
            return yield entry.save();
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