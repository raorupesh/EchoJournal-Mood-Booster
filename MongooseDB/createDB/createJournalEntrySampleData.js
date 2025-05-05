// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the journalentries collection
db.createCollection('journalentries')
journalCollection = db.getCollection("journalentries")
journalCollection.remove({})

// Insert sample journal entries
journalCollection.insert({
    userId: "nandan",
    date: new Date("2025-05-01T09:00:00Z"),
    content: "Started my new journaling habit today. Feeling optimistic!",
    feelings: ["excited", "hopeful"],
    moodScore: 8
})

journalCollection.insert({
    userId: "nandan",
    date: new Date("2025-05-02T20:30:00Z"),
    content: "Had a productive day at work. Enjoyed a nice walk in the evening.",
    feelings: ["productive", "relaxed"],
    moodScore: 7
})

journalCollection.insert({
    userId: "nandan",
    date: new Date("2025-05-03T22:15:00Z"),
    content: "Felt a bit stressed about upcoming deadlines, but managed to meditate.",
    feelings: ["stressed", "calm"],
    moodScore: 6
})

journalCollection.insert({
    userId: "nandan",
    date: new Date("2025-05-04T21:00:00Z"),
    content: "Spent the day with family. We had a barbecue and played board games.",
    feelings: ["happy", "content"],
    moodScore: 9
})

journalCollection.insert({
    userId: "nandan",
    date: new Date("2025-05-05T22:45:00Z"),
    content: "Monday was challenging. Project deadline moved up, feeling a bit overwhelmed.",
    feelings: ["anxious", "determined"],
    moodScore: 4
})

journalCollection.insert({
    userId: "rupesh",
    date: new Date("2025-05-01T10:00:00Z"),
    content: "First entry for a new project. Looking forward to progress.",
    feelings: ["motivated", "curious"],
    moodScore: 8
})

journalCollection.insert({
    userId: "rupesh",
    date: new Date("2025-05-04T18:00:00Z"),
    content: "Had a tough day, but grateful for supportive friends.",
    feelings: ["tired", "grateful"],
    moodScore: 5
})