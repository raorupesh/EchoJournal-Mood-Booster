// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the journalentries collection
db.createCollection('journalentries')
journalCollection = db.getCollection("journalentries")
journalCollection.remove({})

// Insert sample journal entries with predefined IDs
journalCollection.insert({
    id: "j001f2345a6789b0c1d2e3f4",
    userId: 1,
    date: new Date("2025-05-01T09:00:00Z"),
    content: "Started my new journaling habit today. Feeling optimistic!",
    feelings: ["excited", "hopeful"],
    createdAt: new Date("2025-05-01T09:00:00Z"),
    updatedAt: new Date("2025-05-01T09:00:00Z")
})

journalCollection.insert({
    id: "j002f2345a6789b0c1d2e3f4",
    userId: 1,
    date: new Date("2025-05-02T20:30:00Z"),
    content: "Had a productive day at work. Enjoyed a nice walk in the evening.",
    feelings: ["productive", "relaxed"],
    createdAt: new Date("2025-05-02T20:30:00Z"),
    updatedAt: new Date("2025-05-02T20:30:00Z")
})

journalCollection.insert({
    id: "j003f2345a6789b0c1d2e3f4",
    userId: 1,
    date: new Date("2025-05-03T22:15:00Z"),
    content: "Felt a bit stressed about upcoming deadlines, but managed to meditate.",
    feelings: ["stressed", "calm"],
    createdAt: new Date("2025-05-03T22:15:00Z"),
    updatedAt: new Date("2025-05-03T22:15:00Z")
})

journalCollection.insert({
    id: "j004f2345a6789b0c1d2e3f4",
    userId: 1,
    date: new Date("2025-05-04T21:00:00Z"),
    content: "Spent the day with family. We had a barbecue and played board games.",
    feelings: ["happy", "content"],
    createdAt: new Date("2025-05-04T21:00:00Z"),
    updatedAt: new Date("2025-05-04T21:00:00Z")
})

journalCollection.insert({
    id: "j005f2345a6789b0c1d2e3f4",
    userId: 1,
    date: new Date("2025-05-05T22:45:00Z"),
    content: "Monday was challenging. Project deadline moved up, feeling a bit overwhelmed.",
    feelings: ["anxious", "determined"],
    createdAt: new Date("2025-05-05T22:45:00Z"),
    updatedAt: new Date("2025-05-05T22:45:00Z")
})

journalCollection.insert({
    id: "j006f2345a6789b0c1d2e3f4",
    userId: 2,
    date: new Date("2025-05-01T10:00:00Z"),
    content: "First entry for a new project. Looking forward to progress.",
    feelings: ["motivated", "curious"],
    createdAt: new Date("2025-05-01T10:00:00Z"),
    updatedAt: new Date("2025-05-01T10:00:00Z")
})

journalCollection.insert({
    id: "j007f2345a6789b0c1d2e3f4",
    userId: 2,
    date: new Date("2025-05-04T18:00:00Z"),
    content: "Had a tough day, but grateful for supportive friends.",
    feelings: ["tired", "grateful"],
    createdAt: new Date("2025-05-04T18:00:00Z"),
    updatedAt: new Date("2025-05-04T18:00:00Z")
})