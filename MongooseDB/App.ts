import * as express from 'express';
import * as bodyParser from 'body-parser';
import { JournalEntryModel } from './model/JournalEntryModel';
import { EmotionEntryModel } from './model/EmotionEntryModel';

class App {

  public expressApp: express.Application;
  public JournalEntries: JournalEntryModel;
  public EmotionEntries: EmotionEntryModel;

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.JournalEntries = new JournalEntryModel(mongoDBConnection);
    this.EmotionEntries = new EmotionEntryModel(mongoDBConnection);
  }

  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }
  private routes(): void {
    let router = express.Router();

    // Journal Entry routes
    router.post('/app/journal/', async (req, res) => {
      try {
        const entry = await this.JournalEntries.createJournalEntry({
          userId: req.body.userId || 'user123',
          content: req.body.content,
          moodScore: req.body.moodScore,
          feelings: req.body.feelings,
          date: req.body.date ? new Date(req.body.date) : undefined
        });
        res.status(201).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error creating journal entry' });
      }
    });

    router.get('/app/journal/recent/:userId', async (req, res) => {
      try {
        const entries = await this.JournalEntries.getRecentJournalEntries(req.params.userId);
        res.status(200).json({ success: true, data: entries });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching recent journal entries' });
      }
    });

    router.get('/app/journal/all/:userId', async (req, res) => {
      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await this.JournalEntries.getAllJournalEntries(req.params.userId, page, limit);
        res.status(200).json({ success: true, ...result });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching all journal entries' });
      }
    });

    router.put('/app/journal/:id/:userId', async (req, res) => {
      try {
        const updated = await this.JournalEntries.updateJournalEntry(
          req.params.id,
          req.params.userId,
          {
            content: req.body.content,
            moodScore: req.body.moodScore,
            feelings: req.body.feelings
          }
        );
        if (!updated) {
          return res.status(404).json({ success: false, message: 'Entry not found' });
        }
        res.status(200).json({ success: true, data: updated });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error updating journal entry' });
      }
    });

    router.delete('/app/journal/:id/:userId', async (req, res) => {
      try {
        const deleted = await this.JournalEntries.deleteJournalEntry(req.params.id, req.params.userId);
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Entry not found' });
        }
        res.status(200).json({ success: true, message: 'Entry deleted' });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error deleting journal entry' });
      }
    });

    // Emotion Entry routes
    router.post('/app/emotion/', async (req, res) => {
      try {
        const entry = await this.EmotionEntries.createEmotionEntry({
          userId: req.body.userId || 'user123',
          moodScore: req.body.moodScore,
          feelings: req.body.feelings,
          date: req.body.date ? new Date(req.body.date) : undefined
        });
        res.status(201).json({ success: true, data: entry });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error creating emotion entry' });
      }
    });

    router.get('/app/emotion/monthly/:userId', async (req, res) => {
      try {
        const data = await this.EmotionEntries.getMonthlyEmotions(req.params.userId);
        res.status(200).json({ success: true, data });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Error fetching monthly emotion data' });
      }
    });

    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
    this.expressApp.use('/images', express.static(__dirname + '/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));
  }
}

export { App };