import * as express from 'express';
import * as bodyParser from 'body-parser';
import { JournalEntryModel } from './model/JournalEntryModel';
import { EmotionEntryModel } from './model/EmotionEntryModel';
import { AffirmationModel } from './model/AffirmationModel';
import * as crypto from 'crypto';
import * as passport from 'passport';
import GooglePassportObj from './GooglePassport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';


class App {

  public expressApp: express.Application;
  public JournalEntries: JournalEntryModel;
  public EmotionEntries: EmotionEntryModel;
  public AffirmationEntries: AffirmationModel;
  public googlePassportObj: GooglePassportObj;

  constructor(mongoDBConnection: string) {
    this.googlePassportObj = new GooglePassportObj();
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.JournalEntries = new JournalEntryModel(mongoDBConnection);
    this.EmotionEntries = new EmotionEntryModel(mongoDBConnection);
    this.AffirmationEntries = new AffirmationModel(mongoDBConnection);
  }

  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use((req, res, next) => {
      //res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      res.header("Access-Control-Allow-Origin", "https://echojournal-crgagzdufjfqgwbf.westus-01.azurewebsites.net");
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
        secure: false, // set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }
    }));

    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());

  }

  private validateAuth(req: any, res: any, next: any): void {
    if (req.isAuthenticated()) {
      console.log("user is authenticated");
      console.log("User object:", JSON.stringify(req.user));
      console.log("User ID:", req.user.id);
      return next();
    }
    console.log("Headers:", JSON.stringify(req.headers));
    res.status(401).json({ success: false, message: 'Authentication required' });
  }

  private routes(): void {
    let router = express.Router();

    router.get('/auth/google',
      passport.authenticate('google', { scope: ['profile'] })); router.get('/auth/google/callback',
        passport.authenticate('google',
//          { failureRedirect: 'http://localhost:4200' }
            { failureRedirect: 'https://echojournal-crgagzdufjfqgwbf.westus-01.azurewebsites.net/' }
        ),
        (req, res) => {
          //res.redirect('http://localhost:4200/dashboard');
          res.redirect('https://echojournal-crgagzdufjfqgwbf.westus-01.azurewebsites.net/');
        }
      );

    // Check authentication status
    router.get('/api/auth/status', (req: any, res) => {

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
      } else {
        console.log("User not authenticated in status check");
        res.json({ authenticated: false });
      }
    });

    // Logout route
    router.post('/api/auth/logout', (req: any, res) => {
      req.logout((err: any) => {
        if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ success: false, message: 'Error logging out' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
      });
    });

    // Journal Entry routes
    // Create new journal entry
    router.post('/api/v2/journal', this.validateAuth, async (req: any, res) => {

      // get userid from authenticated user
      console.log("Creating journal entry for user:", req.user.id);
      const userId = req.user.id;

      try {
        const entry = await this.JournalEntries.createJournalEntry({
          userId: userId,
          content: req.body.content,
          feelings: req.body.feelings,
          date: req.body.date ? new Date(req.body.date) : undefined
        });
        // create affirmation based on the journal entry
        const affirmation = await this.AffirmationEntries.createAffirmationWithJournalEntry(entry);

        res.status(201).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error creating journal entry' });
      }

    });

    router.get('/api/v2/journal/recent', this.validateAuth, async (req: any, res) => {

      // get userid from authenticated user
      console.log("Getting recent journal entries for user:", req.user.id);
      const userId = req.user.id;

      try {
        const entries = await this.JournalEntries.getRecentJournalEntries(userId);
        res.status(200).json({ success: true, data: entries });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching recent journal entries' });
      }
    });

    router.get('/api/v2/journal/all', this.validateAuth, async (req: any, res) => {

      // get userid from authenticated user
      console.log("Getting all journal entries for user:", req.user.id);
      const userId = req.user.id;

      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await this.JournalEntries.getAllJournalEntries(userId, page, limit);
        res.status(200).json({ success: true, ...result });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching all journal entries' });
      }
    });

    router.get('/api/v2/journal/:id', this.validateAuth, async (req: any, res) => {

      // get userid from authenticated user
      console.log("Getting journal entry for user:", req.user.id);
      const userId = req.user.id;

      try {
        const entry = await this.JournalEntries.getJournalEntry(req.params.id, userId);
        if (!entry) {
          return res.status(404).json({ success: false, message: 'Journal entry not found' });
        }
        res.status(200).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching journal entry' });
      }
    });

    // Update journal entry
    router.put('/api/v2/journal/:id', this.validateAuth, async (req: any, res) => {
      // get userid from authenticated user
      console.log("Updating journal entry for user:", req.user.id);
      const userId = req.user.id;

      try {
        const updatedEntry = await this.JournalEntries.updateJournalEntry(req.params.id, {
          content: req.body.content,
          feelings: req.body.feelings,
          updatedAT: new Date()
        });

        if (!updatedEntry) {
          return res.status(404).json({ success: false, message: 'Journal entry not found' });
        }

        res.status(200).json({ success: true, message: 'Journal entry updated successfully', data: updatedEntry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error updating journal entry' });
      }
    });

    // Add DELETE endpoint for journal entries
    router.delete('/api/v2/journal/:id', this.validateAuth, async (req: any, res) => {
      // get userid from authenticated user
      console.log("Deleting journal entry for user:", req.user.id);
      const userId = req.user.id;

      try {
        const result = await this.JournalEntries.deleteJournalEntry(req.params.id);
        if (!result) {
          return res.status(404).json({ success: false, message: 'Journal entry not found' });
        }
        res.status(200).json({ success: true, message: 'Journal entry deleted successfully' });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error deleting journal entry' });
      }
    });

    // Emotion Entry routes
    router.post('/api/v2/emotion', this.validateAuth, async (req: any, res) => {
      // get userid from authenticated user
      console.log("Creating emotion entry for user:", req.user.id);
      const userId = req.user.id;

      try {
        const entry = await this.EmotionEntries.createEmotionEntry({
          userId: userId,
          moodScore: req.body.moodScore,
          feelings: req.body.feelings,
          people: req.body.people || [],
          place: req.body.place || [],
          date: req.body.date ? new Date(req.body.date) : undefined
        });
        res.status(201).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error creating emotion entry' });
      }
    });

    router.get('/api/v2/emotion/monthly', this.validateAuth, async (req: any, res) => {

      // get userid from authenticated user
      console.log("Getting monthly emotions for user:", req.user.id);
      const userId = req.user.id;

      try {
        const data = await this.EmotionEntries.getMonthlyEmotions(userId);
        res.status(200).json({ success: true, data });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching monthly emotion data' });
      }
    });

    router.get('/api/v2/emotion/all', this.validateAuth, async (req: any, res) => {

      // get userid from authenticated user
      console.log("Getting all emotions for user:", req.user.id);
      const userId = req.user.id;

      try {
        const data = await this.EmotionEntries.getAllEmotionEntries(userId);
        res.status(200).json({ success: true, data });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching all emotion data' });
      }
    });

    // Get a specific emotion entry by ID
    router.get('/api/v2/emotion/:id', this.validateAuth, async (req: any, res) => {
      console.log("Getting emotion entry for user:", req.user.id);
      const userId = req.user.id; // Get from authenticated user

      try {
        const entry = await this.EmotionEntries.getEmotionEntry(req.params.id, userId);
        if (!entry) {
          return res.status(404).json({ success: false, message: 'Emotion entry not found' });
        }
        res.status(200).json({ success: true, data: entry });
      } catch (e) {
        console.error('Error fetching emotion entry:', e);
        res.status(500).json({ success: false, message: 'Error fetching emotion entry' });
      }
    });

    // Update an emotion entry by ID
    router.put('/api/v2/emotion/:id', this.validateAuth, async (req: any, res) => {
      console.log("Updating emotion entry for user:", req.user.id);
      const userId = req.user.id; // Get from authenticated user
      const entryId = req.params.id;

      try {
        const updated = await this.EmotionEntries.updateEmotionEntry(entryId, {
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
      } catch (e) {
        console.error('Error updating emotion entry:', e);
        res.status(500).json({ success: false, message: 'Error updating emotion entry' });
      }
    });

    // Delete an emotion entry by ID
    router.delete('/api/v2/emotion/:id', this.validateAuth, async (req: any, res) => {
      console.log("Deleting emotion entry for user:", req.user.id);
      const userId = req.user.id; // Get from authenticated user
      const entryId = req.params.id;

      try {
        const result = await this.EmotionEntries.deleteEmotionEntry(entryId, userId);

        if (!result || result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Emotion entry not found' });
        }

        res.status(200).json({ success: true, message: 'Emotion entry deleted successfully' });
      } catch (e) {
        console.error('Error deleting emotion entry:', e);
        res.status(500).json({ success: false, message: 'Error deleting emotion entry' });
      }
    });

    // Get Affirmations

    router.get('/api/v2/affirmations', this.validateAuth, async (req: any, res) => {
      // get userid from authenticated user
      console.log("Getting affirmations for user:", req.user.id);
      const userId = req.user.id;

      try {
        const affirmations = await this.AffirmationEntries.getAffirmations(userId);

        res.status(200).json({ success: true, data: affirmations });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching affirmations' });
      }
    });

    // Daily Summary API endpoints
    router.get('/api/v2/emotion/daily/summary', this.validateAuth, async (req: any, res) => {
      console.log("Getting daily summary for user:", req.user.id);
      const userId = req.user.id;

      try {
        // Get date from query parameter or use today
        const dateParam = req.query.date;
        const targetDate = dateParam ? new Date(dateParam) : new Date();

        // Get daily journal entries
        const journalEntries = await this.JournalEntries.getDailyJournalEntries(userId, targetDate);

        // Get daily emotion entries
        const emotionEntries = await this.EmotionEntries.getDailyEmotionEntries(userId, targetDate);

        // Calculate average mood score
        let averageMoodScore = 0;
        let moodDescription = 'neutral';

        if (emotionEntries.length > 0) {
          const totalMoodScore = emotionEntries.reduce((sum, entry) => sum + entry.moodScore, 0);
          averageMoodScore = Math.round((totalMoodScore / emotionEntries.length) * 100) / 100;

          // Determine mood description based on average score
          if (averageMoodScore >= 7) {
            moodDescription = 'very positive';
          } else if (averageMoodScore >= 5) {
            moodDescription = 'positive';
          } else if (averageMoodScore >= 3) {
            moodDescription = 'neutral';
          } else {
            moodDescription = 'challenging';
          }
        }

        // Get all feelings from today's emotion entries
        const todaysFeelings = [...new Set(emotionEntries.flatMap(entry => entry.feelings))];

        const summary = {
          date: targetDate.toISOString().split('T')[0],
          journalEntriesCount: journalEntries.length,
          emotionEntriesCount: emotionEntries.length,
          averageMoodScore,
          moodDescription,
          todaysFeelings,
          hasEntries: journalEntries.length > 0 || emotionEntries.length > 0
        };

        res.status(200).json({ success: true, data: summary });
      } catch (e) {
        console.error('Error fetching daily summary:', e);
        res.status(500).json({ success: false, message: 'Error fetching daily summary' });
      }
    });

    // V1 unauthenticated routes

    // Journal Entry routes
    // Create new journal entry
    router.post('/api/v1/journal', async (req, res) => {

      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const entry = await this.JournalEntries.createJournalEntry({
          userId: userId,
          content: req.body.content,
          feelings: req.body.feelings,
          date: req.body.date ? new Date(req.body.date) : undefined
        });
        // create affirmation based on the journal entry
        const affirmation = await this.AffirmationEntries.createAffirmationWithJournalEntry(entry);

        res.status(201).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error creating journal entry' });
      }
      
    });

    router.get('/api/v1/journal/recent', async (req, res) => {

      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const entries = await this.JournalEntries.getRecentJournalEntries(userId);
        res.status(200).json({ success: true, data: entries });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching recent journal entries' });
      }
    });
 
    router.get('/api/v1/journal/all', async (req, res) => {

      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await this.JournalEntries.getAllJournalEntries(userId, page, limit);
        res.status(200).json({ success: true, ...result });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching all journal entries' });
      }
    });
 
    router.get('/api/v1/journal/:id', async (req, res) => {

      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const entry = await this.JournalEntries.getJournalEntry(req.params.id, userId);
        if (!entry) {
          return res.status(404).json({ success: false, message: 'Journal entry not found' });
        }
        res.status(200).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching journal entry' });
      }
    });

    // Update journal entry
    router.put('/api/v1/journal/:id', async (req, res) => {
      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const updatedEntry = await this.JournalEntries.updateJournalEntry(req.params.id, {
          content: req.body.content,
          feelings: req.body.feelings,
          updatedAT: new Date()
        });
        
        if (!updatedEntry) {
          return res.status(404).json({ success: false, message: 'Journal entry not found' });
        }
        
        res.status(200).json({ success: true, message: 'Journal entry updated successfully', data: updatedEntry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error updating journal entry' });
      }
    });

    // Add DELETE endpoint for journal entries
    router.delete('/api/v1/journal/:id', async (req, res) => {
      // get userid from auth, for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const result = await this.JournalEntries.deleteJournalEntry(req.params.id);
        if (!result) {
          return res.status(404).json({ success: false, message: 'Journal entry not found' });
        }
        res.status(200).json({ success: true, message: 'Journal entry deleted successfully' });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error deleting journal entry' });
      }
    });
 
    // Emotion Entry routes
    router.post('/api/v1/emotion', async (req, res) => {
      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const entry = await this.EmotionEntries.createEmotionEntry({
          userId: userId,
          moodScore: req.body.moodScore,
          feelings: req.body.feelings,
          people: req.body.people || [],
          place: req.body.place || [],
          date: req.body.date ? new Date(req.body.date) : undefined
        });
        res.status(201).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error creating emotion entry' });
      }
    });

    router.get('/api/v1/emotion/monthly', async (req, res) => {

      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const data = await this.EmotionEntries.getMonthlyEmotions(userId);
        res.status(200).json({ success: true, data });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching monthly emotion data' });
      }
    });
 
    router.get('/api/v1/emotion/all', async (req, res) => {

      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        // Optional: if no userId provided, return all entries
        const data = userId
          ? await this.EmotionEntries.getAllEmotionEntries(userId)
          : await this.EmotionEntries.getAllEmotionEntries();
        res.status(200).json({ success: true, data });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching all emotion data' });
      }
    });

    // Get a specific emotion entry by ID
    router.get('/api/v1/emotion/:id', async (req, res) => {
      const userId = "113352457463047835007"; // Replace with auth later
    
      try {
        const entry = await this.EmotionEntries.getEmotionEntry(req.params.id, userId);
        if (!entry) {
          return res.status(404).json({ success: false, message: 'Emotion entry not found' });
        }
        res.status(200).json({ success: true, data: entry });
      } catch (e) {
        console.error('Error fetching emotion entry:', e);
        res.status(500).json({ success: false, message: 'Error fetching emotion entry' });
      }
    });

    // Update an emotion entry by ID
    router.put('/api/v1/emotion/:id', async (req, res) => {
      const userId = "113352457463047835007"; // Replace with auth later
      const entryId = req.params.id;
    
      try {
        const updated = await this.EmotionEntries.updateEmotionEntry(entryId, {
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
      } catch (e) {
        console.error('Error updating emotion entry:', e);
        res.status(500).json({ success: false, message: 'Error updating emotion entry' });
      }
    });

    // Delete an emotion entry by ID
    router.delete('/api/v1/emotion/:id', async (req, res) => {
      const userId = "113352457463047835007"; // Replace with actual auth later
      const entryId = req.params.id;
    
      try {
        const result = await this.EmotionEntries.deleteEmotionEntry(entryId, userId);
        
        if (!result || result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Emotion entry not found' });
        }
      
        res.status(200).json({ success: true, message: 'Emotion entry deleted successfully' });
      } catch (e) {
        console.error('Error deleting emotion entry:', e);
        res.status(500).json({ success: false, message: 'Error deleting emotion entry' });
      }
    });

    // Get Affirmations

    router.get('/api/v1/affirmations', async (req, res) => {
      // get userid from auth , for now hardcoded 1
      const userId = "113352457463047835007";

      try {
        const affirmations = await this.AffirmationEntries.getAffirmations(userId);
        
        res.status(200).json({ success: true, data: affirmations });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching affirmations' });
      }
    });

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

export { App };