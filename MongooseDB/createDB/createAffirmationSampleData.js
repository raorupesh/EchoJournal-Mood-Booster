// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the affirmations collection
db.createCollection('affirmations')
affirmationCollection = db.getCollection("affirmations")
affirmationCollection.remove({})

// Insert sample affirmations for the past week (June 2-8, 2025)
affirmationCollection.insert({
    id: "a001f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I start each week with motivation and clear focus on my goals.",
    sourceJournalEntry: "j001f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-02T10:30:00Z")
})

affirmationCollection.insert({
    id: "a002f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I celebrate my accomplishments and take time to appreciate my progress.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-03T21:15:00Z")
})

affirmationCollection.insert({
    id: "a003f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I handle challenges with grace and use meditation to find my center.",
    sourceJournalEntry: "j003f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-04T23:00:00Z")
})

affirmationCollection.insert({
    id: "a004f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I am grateful for meaningful friendships that bring joy to my life.",
    sourceJournalEntry: "j004f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-05T22:00:00Z")
})

affirmationCollection.insert({
    id: "a005f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I embrace exciting opportunities and maintain hope for my future.",
    sourceJournalEntry: "j005f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-06T19:15:00Z")
})

affirmationCollection.insert({
    id: "a006f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I find peace in simple moments and value the power of rest.",
    sourceJournalEntry: "j006f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-07T15:30:00Z")
})

affirmationCollection.insert({
    id: "a007f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I reflect on my growth with optimism and look forward to new possibilities.",
    sourceJournalEntry: "j007f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-08T11:45:00Z")
})

// Additional affirmations for cross-referencing
affirmationCollection.insert({
    id: "a008f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I balance productivity with self-care and celebration.",
    sourceJournalEntry: "j002f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-04T09:20:00Z")
})

affirmationCollection.insert({
    id: "a009f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    content: "I cultivate resilience and find strength in difficult situations.",
    sourceJournalEntry: "j003f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-05T11:45:00Z")
})

// Insert sample affirmations for second user (105181080591378910223) - past week
affirmationCollection.insert({
    id: "a010f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I start each day centered and prepared for whatever comes my way.",
    sourceJournalEntry: "j008f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-02T08:30:00Z")
})

affirmationCollection.insert({
    id: "a011f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "My creativity flows freely and brings meaning to my work.",
    sourceJournalEntry: "j009f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-03T20:15:00Z")
})

affirmationCollection.insert({
    id: "a012f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I communicate with honesty and courage, setting healthy boundaries.",
    sourceJournalEntry: "j010f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-04T22:45:00Z")
})

affirmationCollection.insert({
    id: "a013f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "Nature connects me to inner peace and helps me find perspective.",
    sourceJournalEntry: "j011f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-05T17:20:00Z")
})

affirmationCollection.insert({
    id: "a014f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "Laughter and friendship are powerful medicine for my well-being.",
    sourceJournalEntry: "j012f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-06T23:30:00Z")
})

affirmationCollection.insert({
    id: "a015f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I find deep satisfaction in life's simple pleasures and moments.",
    sourceJournalEntry: "j013f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-07T12:00:00Z")
})

affirmationCollection.insert({
    id: "a016f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I am grateful for peaceful moments and time for self-reflection.",
    sourceJournalEntry: "j014f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-08T16:45:00Z")
})

// Additional affirmations for second user cross-referencing
affirmationCollection.insert({
    id: "a017f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I balance creative expression with honest communication.",
    sourceJournalEntry: "j009f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-05T10:20:00Z")
})

affirmationCollection.insert({
    id: "a018f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    content: "I nurture my soul through nature and meaningful connections.",
    sourceJournalEntry: "j011f2345a6789b0c1d2e3f4",
    createdAt: new Date("2025-06-06T14:45:00Z")
})

// Verify the data has been inserted
print("Inserted " + affirmationCollection.count() + " affirmation records")
