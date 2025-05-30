import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { JournalEntryModel } from './model/JournalEntryModel';
import { EmotionEntryModel } from './model/EmotionEntryModel';
import { AffirmationModel } from './model/AffirmationModel';

class App {

  public expressApp: express.Application;
  public JournalEntries: JournalEntryModel;
  public EmotionEntries: EmotionEntryModel;
  public AffirmationEntries: AffirmationModel;

  constructor(mongoDBConnection: string) {
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
    this.expressApp.use(cors());
  }
  /**
   * Initializes and sets up all application routes for journal and emotion entries.
   *
   * Routes:
   * - // Create new journal entry
   *   POST /api/v1/journal
   *   Creates a new journal entry for a user.
   *
   * - // Get recent journal entries
   *   GET /api/v1/journal/recent
   *   Retrieves the most recent journal entries for a user.
   *
   * - // Get all journal entries (paginated)
   *   GET /api/v1/journal/all
   *   Retrieves all journal entries for a user with pagination support.
   *
   * - // Get a specific journal entry by ID
   *   GET /api/v1/journal/:id
   *   Retrieves a specific journal entry by its ID for a user.
   *
   * - // Create new emotion entry
   *   POST /api/v1/emotion
   *   Creates a new emotion entry for a user.
   *
   * - // Get monthly emotion data
   *   GET /api/v1/emotion/monthly
   *   Retrieves aggregated monthly emotion data for a user.
   *
   * - // Get all emotion entries
   *   GET /api/v1/emotion/all
   *   Retrieves all emotion entries, optionally filtered by user.
   *
   * - // Serve index.html at root
   *   GET /
   *   Serves the main index.html file.
   *
   * - // Serve static JSON files
   *   Serves static files from /app/json at /app/json/
   *
   * - // Serve static images
   *   Serves static files from /img at /images
   *
   * - // Serve static pages
   *   Serves static files from /pages at root
   */
  private routes(): void {
    let router = express.Router();

    // Journal Entry routes
    // Create new journal entry
    router.post('/api/v1/journal', async (req, res) => {

      // get userid from auth , for now hardcoded 1
      const userId = 1;

      try {
        const entry = await this.JournalEntries.createJournalEntry({
          userId: userId || 1,
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
      const userId = 1;

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
      const userId = 1;

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
      const userId = 1;

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
      const userId = 1;

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
      const userId = 1;

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
      const userId = 1;

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
      const userId = 1;

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
      const userId = 1;

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
      const userId = 1; // Replace with auth later
    
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
      const userId = 1; // Replace with auth later
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
      const userId = 1; // Replace with actual auth later
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
      const userId = 1;

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