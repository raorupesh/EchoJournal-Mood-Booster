// Switch to your sample DB
db = db.getSiblingDB('journalSample')

// Create and clear the emotionentries collection
db.createCollection('emotionentries')
emotionCollection = db.getCollection("emotionentries")
emotionCollection.remove({})

// Insert sample emotion entries
emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-01T08:00:00Z"),
    feelings: ["happy", "energized"],
    moodScore: 8
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-02T12:30:00Z"),
    feelings: ["focused", "content"],
    moodScore: 7
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-03T21:00:00Z"),
    feelings: ["anxious", "hopeful"],
    moodScore: 6
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-01T09:15:00Z"),
    feelings: ["motivated"],
    moodScore: 9
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-04T19:45:00Z"),
    feelings: ["tired", "relieved"],
    moodScore: 5
})