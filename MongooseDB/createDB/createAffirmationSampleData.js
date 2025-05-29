// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the affirmations collection
db.createCollection('affirmations')
affirmationCollection = db.getCollection("affirmations")
affirmationCollection.remove({})

// Insert sample affirmations with predefined IDs
affirmationCollection.insert({
    id: "a001f2345a6789b0c1d2e3f4",
    userId: 1,
    content: "I am building positive habits and approaching life with optimism!",
    sourceJournalEntry: "j001f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-01T10:30:00Z")
})

affirmationCollection.insert({
    id: "a002f2345a6789b0c1d2e3f4",
    userId: 1,
    content: "I am productive and make time for self-care activities that bring me peace.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-02T21:15:00Z")
})

affirmationCollection.insert({
    id: "a003f2345a6789b0c1d2e3f4",
    userId: 1,
    content: "I can handle stress by taking time for mindfulness and meditation.",
    sourceJournalEntry: "j003f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-03T23:00:00Z")
})

affirmationCollection.insert({
    id: "a004f2345a6789b0c1d2e3f4",
    userId: 1,
    content: "My family connections bring me joy and contentment.",
    sourceJournalEntry: "j004f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-04T22:00:00Z")
})

affirmationCollection.insert({
    id: "a005f2345a6789b0c1d2e3f4",
    userId: 1,
    content: "I am determined and capable of handling challenges, even when deadlines change.",
    sourceJournalEntry: "j005f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-06T08:15:00Z")
})

affirmationCollection.insert({
    id: "a006f2345a6789b0c1d2e3f4",
    userId: 2,
    content: "My motivation and curiosity drive me to succeed in new projects.",
    sourceJournalEntry: "j006f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-01T14:30:00Z")
})

affirmationCollection.insert({
    id: "a007f2345a6789b0c1d2e3f4",
    userId: 2,
    content: "Even on difficult days, I have supportive people in my life to be grateful for.",
    sourceJournalEntry: "j007f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-04T20:45:00Z")
})

// Additional cross-referencing affirmations
affirmationCollection.insert({
    id: "a008f2345a6789b0c1d2e3f4",
    userId: 1,
    content: "I balance productivity with relaxation to maintain my wellbeing.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-03T09:20:00Z")
})

affirmationCollection.insert({
    id: "a009f2345a6789b0c1d2e3f4",
    userId: 1,
    content: "I find calm even in stressful situations.",
    sourceJournalEntry: "j003f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-05-04T11:45:00Z")
})

// Verify the data has been inserted
print("Inserted " + affirmationCollection.count() + " affirmation records")
