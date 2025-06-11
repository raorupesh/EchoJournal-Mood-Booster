// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the affirmations collection
db.createCollection('affirmations')
affirmationCollection = db.getCollection("affirmations")
affirmationCollection.remove({})

// Sample affirmations for the past week (June 4-10, 2025)
// User ID: 105181080591378910223
// Based on corresponding journal entries

// From June 4 journal entry
affirmationCollection.insert({
    id: "a001f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I am excited about new opportunities and motivated to excel in my work projects.",
    sourceJournalEntry: "j001f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-05T09:30:00Z")
})

// From June 5 journal entry
affirmationCollection.insert({
    id: "a002f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I have the energy and determination to handle challenging deadlines with focus.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-06T08:15:00Z")
})

// From June 6 journal entry
affirmationCollection.insert({
    id: "a003f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "My creativity flows naturally when I collaborate with others and I balance work with joy.",
    sourceJournalEntry: "j003f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-07T10:00:00Z")
})

// From June 7 journal entry
affirmationCollection.insert({
    id: "a004f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I am accomplished and proud of my achievements, surrounded by supportive colleagues.",
    sourceJournalEntry: "j004f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-08T09:45:00Z")
})

// From June 8 journal entry
affirmationCollection.insert({
    id: "a005f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I find peace in nature and appreciate the simple pleasures that bring me contentment.",
    sourceJournalEntry: "j005f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-09T11:20:00Z")
})

// From June 9 journal entry
affirmationCollection.insert({
    id: "a006f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I am grateful for my family connections and the love that surrounds me in my life.",
    sourceJournalEntry: "j006f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-10T08:30:00Z")
})

// From June 10 journal entry
affirmationCollection.insert({
    id: "a007f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I approach each new week with optimism and mindfulness, ready for any challenge.",
    sourceJournalEntry: "j007f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-10T20:00:00Z")
})

// Additional positive affirmations derived from the week's themes
affirmationCollection.insert({
    id: "a008f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I maintain excellent work-life balance and celebrate my professional successes.",
    sourceJournalEntry: "j003f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-07T15:30:00Z")
})

affirmationCollection.insert({
    id: "a009f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I am energized by physical activity and it helps me stay focused throughout my day.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-06T14:45:00Z")
})

affirmationCollection.insert({
    id: "a010f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I cherish meaningful connections with both family and friends across all generations.",
    sourceJournalEntry: "j006f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-10T12:00:00Z")
})

// Verify the data has been inserted
print("Inserted " + affirmationCollection.count() + " affirmation records for the past week")
