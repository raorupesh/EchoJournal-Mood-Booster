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
exports.JournalEntryModel = void 0;
const Mongoose = require("mongoose");
class JournalEntryModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userId: { type: Number, required: true },
            date: { type: Date, required: true },
            content: { type: String, required: true },
            feelings: { type: [String], required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now }
        }, { collection: "journalentries" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                this.model = Mongoose.model("JournalEntry", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    createJournalEntry(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = new this.model({
                userId: data.userId,
                content: data.content,
                feelings: data.feelings,
                date: data.date || new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return yield entry.save();
        });
    }
    getJournalEntry(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ _id: id, userId }).exec();
        });
    }
    getRecentJournalEntries(userId, limit = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ userId })
                .sort({ date: -1 })
                .limit(limit)
                .exec();
        });
    }
    getAllJournalEntries(userId, page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const total = yield this.model.countDocuments({ userId });
            const entries = yield this.model.find({ userId })
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit)
                .exec();
            return { total, entries };
        });
    }
    updateJournalEntry(id, userId, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield this.model.findOne({ _id: id, userId });
            if (!entry) {
                return null;
            }
            // Add updatedAt timestamp to the update
            const updatedData = Object.assign(Object.assign({}, update), { updatedAt: new Date() });
            const updatedEntry = yield this.model.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
            return updatedEntry;
        });
    }
    deleteJournalEntry(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield this.model.findOne({ _id: id, userId });
            if (!entry) {
                return null;
            }
            yield this.model.findByIdAndDelete(id);
            return true;
        });
    }
}
exports.JournalEntryModel = JournalEntryModel;
//# sourceMappingURL=JournalEntryModel.js.map