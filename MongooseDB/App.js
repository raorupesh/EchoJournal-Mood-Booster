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
const AffirmationModel_1 = require("./model/AffirmationModel");
const passport = require("passport");
const GooglePassport_1 = require("./GooglePassport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
class App {
    constructor(mongoDBConnection) {
        this.googlePassportObj = new GooglePassport_1.default();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.JournalEntries = new JournalEntryModel_1.JournalEntryModel(mongoDBConnection);
        this.EmotionEntries = new EmotionEntryModel_1.EmotionEntryModel(mongoDBConnection);
        this.AffirmationEntries = new AffirmationModel_1.AffirmationModel(mongoDBConnection);
    }
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
        this.expressApp.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            }
        }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
    validateAuth(req, res, next) {
        console.log("=== Authentication Check ===");
        console.log("Session ID:", req.sessionID);
        console.log("Session data:", JSON.stringify(req.session));
        console.log("Is authenticated:", req.isAuthenticated());
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            console.log("User object:", JSON.stringify(req.user));
            console.log("User ID:", req.user.id);
            return next();
        }
        console.log("user is not authenticated");
        console.log("Headers:", JSON.stringify(req.headers));
        res.status(401).json({ success: false, message: 'Authentication required' });
    }
    routes() {
        let router = express.Router();
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:4200' }), (req, res) => {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to Angular app dashboard");
            res.redirect('http://localhost:4200/dashboard');
        }); // Check authentication status
        router.get('/api/auth/status', (req, res) => {
            console.log("=== Auth Status Check ===");
            console.log("Session ID:", req.sessionID);
            console.log("Is authenticated:", req.isAuthenticated());
            console.log("Session data:", JSON.stringify(req.session));
            if (req.isAuthenticated()) {
                console.log("User in session:", JSON.stringify(req.user));
                res.json({
                    authenticated: true,
                    user: {
                        id: req.user.id,
                        displayName: req.user.displayName,
                        email: req.user.emails ? req.user.emails[0].value : null
                    }
                });
            }
            else {
                console.log("User not authenticated in status check");
                res.json({ authenticated: false });
            }
        });
        // Logout route
        router.post('/api/auth/logout', (req, res) => {
            req.logout((err) => {
                if (err) {
                    console.error('Logout error:', err);
                    return res.status(500).json({ success: false, message: 'Error logging out' });
                }
                res.json({ success: true, message: 'Logged out successfully' });
            });
        }); // Journal Entry routes
        // Create new journal entry
        router.post('/api/v1/journal', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Creating journal entry for user:", req.user.id);
            const userId = req.user.id;
            try {
                const entry = yield this.JournalEntries.createJournalEntry({
                    userId: userId,
                    content: req.body.content,
                    feelings: req.body.feelings,
                    date: req.body.date ? new Date(req.body.date) : undefined
                });
                // create affirmation based on the journal entry
                const affirmation = yield this.AffirmationEntries.createAffirmationWithJournalEntry(entry);
                res.status(201).json({ success: true, data: entry });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error creating journal entry' });
            }
        }));
        router.get('/api/v1/journal/recent', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Getting recent journal entries for user:", req.user.id);
            const userId = req.user.id;
            try {
                const entries = yield this.JournalEntries.getRecentJournalEntries(userId);
                res.status(200).json({ success: true, data: entries });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching recent journal entries' });
            }
        }));
        router.get('/api/v1/journal/all', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Getting all journal entries for user:", req.user.id);
            const userId = req.user.id;
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const result = yield this.JournalEntries.getAllJournalEntries(userId, page, limit);
                res.status(200).json(Object.assign({ success: true }, result));
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching all journal entries' });
            }
        }));
        router.get('/api/v1/journal/:id', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Getting journal entry for user:", req.user.id);
            const userId = req.user.id;
            try {
                const entry = yield this.JournalEntries.getJournalEntry(req.params.id, userId);
                if (!entry) {
                    return res.status(404).json({ success: false, message: 'Journal entry not found' });
                }
                res.status(200).json({ success: true, data: entry });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching journal entry' });
            }
        })); // Update journal entry
        router.put('/api/v1/journal/:id', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Updating journal entry for user:", req.user.id);
            const userId = req.user.id;
            try {
                const updatedEntry = yield this.JournalEntries.updateJournalEntry(req.params.id, {
                    content: req.body.content,
                    feelings: req.body.feelings,
                    updatedAT: new Date()
                });
                if (!updatedEntry) {
                    return res.status(404).json({ success: false, message: 'Journal entry not found' });
                }
                res.status(200).json({ success: true, message: 'Journal entry updated successfully', data: updatedEntry });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error updating journal entry' });
            }
        })); // Add DELETE endpoint for journal entries
        router.delete('/api/v1/journal/:id', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Deleting journal entry for user:", req.user.id);
            const userId = req.user.id;
            try {
                const result = yield this.JournalEntries.deleteJournalEntry(req.params.id);
                if (!result) {
                    return res.status(404).json({ success: false, message: 'Journal entry not found' });
                }
                res.status(200).json({ success: true, message: 'Journal entry deleted successfully' });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error deleting journal entry' });
            }
        })); // Emotion Entry routes
        router.post('/api/v1/emotion', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Creating emotion entry for user:", req.user.id);
            const userId = req.user.id;
            try {
                const entry = yield this.EmotionEntries.createEmotionEntry({
                    userId: userId,
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
        router.get('/api/v1/emotion/monthly', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Getting monthly emotions for user:", req.user.id);
            const userId = req.user.id;
            try {
                const data = yield this.EmotionEntries.getMonthlyEmotions(userId);
                res.status(200).json({ success: true, data });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching monthly emotion data' });
            }
        }));
        router.get('/api/v1/emotion/all', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Getting all emotions for user:", req.user.id);
            const userId = req.user.id;
            try {
                const data = yield this.EmotionEntries.getAllEmotionEntries(userId);
                res.status(200).json({ success: true, data });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching all emotion data' });
            }
        })); // Get a specific emotion entry by ID
        router.get('/api/v1/emotion/:id', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Getting emotion entry for user:", req.user.id);
            const userId = req.user.id; // Get from authenticated user
            try {
                const entry = yield this.EmotionEntries.getEmotionEntry(req.params.id, userId);
                if (!entry) {
                    return res.status(404).json({ success: false, message: 'Emotion entry not found' });
                }
                res.status(200).json({ success: true, data: entry });
            }
            catch (e) {
                console.error('Error fetching emotion entry:', e);
                res.status(500).json({ success: false, message: 'Error fetching emotion entry' });
            }
        })); // Update an emotion entry by ID
        router.put('/api/v1/emotion/:id', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Updating emotion entry for user:", req.user.id);
            const userId = req.user.id; // Get from authenticated user
            const entryId = req.params.id;
            try {
                const updated = yield this.EmotionEntries.updateEmotionEntry(entryId, {
                    moodScore: req.body.moodScore,
                    feelings: req.body.feelings,
                    people: req.body.people,
                    place: req.body.place,
                    date: req.body.date ? new Date(req.body.date) : new Date()
                });
                if (!updated) {
                    return res.status(404).json({ success: false, message: 'Emotion entry not found' });
                }
                res.status(200).json({ success: true, message: 'Emotion entry updated successfully' });
            }
            catch (e) {
                console.error('Error updating emotion entry:', e);
                res.status(500).json({ success: false, message: 'Error updating emotion entry' });
            }
        })); // Delete an emotion entry by ID
        router.delete('/api/v1/emotion/:id', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Deleting emotion entry for user:", req.user.id);
            const userId = req.user.id; // Get from authenticated user
            const entryId = req.params.id;
            try {
                const result = yield this.EmotionEntries.deleteEmotionEntry(entryId, userId);
                if (!result || result.deletedCount === 0) {
                    return res.status(404).json({ success: false, message: 'Emotion entry not found' });
                }
                res.status(200).json({ success: true, message: 'Emotion entry deleted successfully' });
            }
            catch (e) {
                console.error('Error deleting emotion entry:', e);
                res.status(500).json({ success: false, message: 'Error deleting emotion entry' });
            }
        })); // Get Affirmations
        router.get('/api/v1/affirmations', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get userid from authenticated user
            console.log("Getting affirmations for user:", req.user.id);
            const userId = req.user.id;
            try {
                const affirmations = yield this.AffirmationEntries.getAffirmations(userId);
                res.status(200).json({ success: true, data: affirmations });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ success: false, message: 'Error fetching affirmations' });
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