// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the emotionentries collection
db.createCollection('emotionentries')
emotionCollection = db.getCollection("emotionentries")
emotionCollection.remove({})

// Insert sample emotion entries
emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-25T08:00:00Z"),
    feelings: ["happy", "energized"],
    moodScore: 8
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-26T12:30:00Z"),
    feelings: ["focused", "content"],
    moodScore: 7
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-27T21:00:00Z"),
    feelings: ["anxious", "hopeful"],
    moodScore: 6
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-28T10:15:00Z"),
    feelings: ["inspired", "motivated"],
    moodScore: 8
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-29T18:45:00Z"),
    feelings: ["tired", "accomplished"],
    moodScore: 6
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-04-30T09:30:00Z"),
    feelings: ["calm", "relaxed"],
    moodScore: 7
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-05-01T14:20:00Z"),
    feelings: ["excited", "nervous"],
    moodScore: 7
})

emotionCollection.insert({
    userId: "nandan",
    date: new Date("2025-05-02T20:00:00Z"),
    feelings: ["satisfied", "proud"],
    moodScore: 9
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-03T09:15:00Z"),
    feelings: ["motivated"],
    moodScore: 9
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-05T11:30:00Z"),
    feelings: ["focused", "determined"],
    moodScore: 8
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-06T16:45:00Z"),
    feelings: ["content", "peaceful"],
    moodScore: 7
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-07T08:20:00Z"),
    feelings: ["stressed", "overwhelmed"],
    moodScore: 4
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-08T13:10:00Z"),
    feelings: ["optimistic", "energetic"],
    moodScore: 8
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-09T19:30:00Z"),
    feelings: ["grateful", "relaxed"],
    moodScore: 7
})

emotionCollection.insert({
    userId: "rupesh",
    date: new Date("2025-04-04T19:45:00Z"),
    feelings: ["tired", "relieved"],
    moodScore: 5
})