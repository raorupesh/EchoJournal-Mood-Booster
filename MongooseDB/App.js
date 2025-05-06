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
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const JournalEntryModel_1 = require("./model/JournalEntryModel");
const EmotionEntryModel_1 = require("./model/EmotionEntryModel");
class App {
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.JournalEntries = new JournalEntryModel_1.JournalEntryModel(mongoDBConnection);
        this.EmotionEntries = new EmotionEntryModel_1.EmotionEntryModel(mongoDBConnection);
    }
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    routes() {
        let router = express.Router();
        // Journal Entry routes
        router.post('/app/journal/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = yield this.JournalEntries.createJournalEntry({
                    userId: req.body.userId || 1,
                    content: req.body.content,
                    feelings: req.body.feelings,
                    date: req.body.date ? new Date(req.body.date) : undefined
                });
                res.status(201).json({ success: true, data: entry });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error creating journal entry' });
            }
        }));
        router.get('/app/journal/recent/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entries = yield this.JournalEntries.getRecentJournalEntries(parseInt(req.params.userId));
                res.status(200).json({ success: true, data: entries });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching recent journal entries' });
            }
        }));
        router.get('/app/journal/all/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const result = yield this.JournalEntries.getAllJournalEntries(parseInt(req.params.userId), page, limit);
                res.status(200).json(Object.assign({ success: true }, result));
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching all journal entries' });
            }
        }));
        router.get('/app/journal/:id/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = yield this.JournalEntries.getJournalEntry(req.params.id, parseInt(req.params.userId));
                if (!entry) {
                    return res.status(404).json({ success: false, message: 'Journal entry not found' });
                }
                res.status(200).json({ success: true, data: entry });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching journal entry' });
            }
        }));
        // Emotion Entry routes
        router.post('/app/emotion/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = yield this.EmotionEntries.createEmotionEntry({
                    userId: req.body.userId || 1,
                    moodScore: req.body.moodScore,
                    feelings: req.body.feelings,
                    people: req.body.people || [],
                    place: req.body.place || [],
                    date: req.body.date ? new Date(req.body.date) : undefined
                });
                res.status(201).json({ success: true, data: entry });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error creating emotion entry' });
            }
        }));
        router.get('/app/emotion/monthly/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.EmotionEntries.getMonthlyEmotions(parseInt(req.params.userId));
                res.status(200).json({ success: true, data });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching monthly emotion data' });
            }
        }));
        router.get('/app/emotion/all/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.EmotionEntries.getAllEmotionEntries(parseInt(req.params.userId));
                res.status(200).json({ success: true, data });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching all emotion data' });
            }
        }));
        // Add route for root path to serve index.html
        router.get('/', (req, res) => {
            res.sendFile('index.html', { root: __dirname + '/pages' });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map