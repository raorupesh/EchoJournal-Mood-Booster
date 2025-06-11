// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the affirmations collection
db.createCollection('affirmations')
affirmationCollection = db.getCollection("affirmations")

// Sample affirmations for the past week (June 4-10, 2025)
// User ID: 113352457463047835007
// Based on corresponding journal entries - therapeutic affirmations for difficult times

// From June 4 journal entry
affirmationCollection.insert({
    id: "a001f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "It's okay to have difficult days. My worth is not determined by one presentation or meeting.",
    sourceJournalEntry: "j001f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-05T09:30:00Z")
})

// From June 5 journal entry
affirmationCollection.insert({
    id: "a002f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I am human and it's normal to feel overwhelmed sometimes. Rest is not a sign of weakness.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-06T08:15:00Z")
})

// From June 6 journal entry
affirmationCollection.insert({
    id: "a003f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "Creative blocks are temporary. My value doesn't depend on constant productivity or comparison to others.",
    sourceJournalEntry: "j003f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-07T10:00:00Z")
})

// From June 7 journal entry
affirmationCollection.insert({
    id: "a004f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "One difficult presentation doesn't define my capabilities. I am learning and growing through challenges.",
    sourceJournalEntry: "j004f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-08T09:45:00Z")
})

// From June 8 journal entry
affirmationCollection.insert({
    id: "a005f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "It's okay to feel restless. I can be gentle with myself and take things one moment at a time.",
    sourceJournalEntry: "j005f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-09T11:20:00Z")
})

// From June 9 journal entry
affirmationCollection.insert({
    id: "a006f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "Feeling sad about life changes is natural. I can honor my emotions while still finding connection.",
    sourceJournalEntry: "j006f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-10T08:30:00Z")
})

// From June 10 journal entry
affirmationCollection.insert({
    id: "a007f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "Even when I feel detached, I am still worthy of love and care. Tomorrow can be different.",
    sourceJournalEntry: "j007f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-10T20:00:00Z")
})

// Additional supportive affirmations derived from the week's themes
affirmationCollection.insert({
    id: "a008f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I don't have to pretend to be okay. My feelings are valid and seeking support is brave.",
    sourceJournalEntry: "j004f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-07T15:30:00Z")
})

affirmationCollection.insert({
    id: "a009f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "Self-compassion is more important than self-criticism. I can treat myself with kindness.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-06T14:45:00Z")
})

affirmationCollection.insert({
    id: "a010f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "Relationships may change, but my capacity for connection and love remains strong.",
    sourceJournalEntry: "j006f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-10T12:00:00Z")
})

// Verify the data has been inserted
print("Inserted " + affirmationCollection.count() + " affirmation records for the past week")
