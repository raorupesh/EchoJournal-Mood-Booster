// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the emotionentries collection
db.createCollection('emotionentries')
emotionCollection = db.getCollection("emotionentries")

// Sample emotion entries for the past week (June 4-10, 2025)
// User ID: 113352457463047835007

// June 4, 2025 - Tuesday
emotionCollection.insert({
    id: "e001f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-04T09:00:00Z"),
    feelings: ["overwhelmed", "anxious"],
    people: ["colleagues", "manager"],
    place: ["office", "conference room"],
    moodScore: 3,
    createdAt: new Date("2025-06-04T09:00:00Z")
})

// June 5, 2025 - Wednesday
emotionCollection.insert({
    id: "e003f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-05T08:15:00Z"),
    feelings: ["exhausted", "unmotivated"],
    people: ["workout buddy"],
    place: ["gym"],
    moodScore: 2,
    createdAt: new Date("2025-06-05T08:15:00Z")
})

// June 6, 2025 - Thursday
emotionCollection.insert({
    id: "e005f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-06T12:30:00Z"),
    feelings: ["uninspired", "blocked"],
    people: ["design team"],
    place: ["creative studio"],
    moodScore: 3,
    createdAt: new Date("2025-06-06T12:30:00Z")
})

// June 7, 2025 - Friday
emotionCollection.insert({
    id: "e007f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-07T10:00:00Z"),
    feelings: ["disappointed", "inadequate"],
    people: ["boss", "clients"],
    place: ["meeting room"],
    moodScore: 2,
    createdAt: new Date("2025-06-07T10:00:00Z")
})

// June 8, 2025 - Saturday
emotionCollection.insert({
    id: "e009f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-08T11:00:00Z"),
    feelings: ["restless", "agitated"],
    people: ["partner"],
    place: ["park", "nature trail"],
    moodScore: 4,
    createdAt: new Date("2025-06-08T11:00:00Z")
})

// June 9, 2025 - Sunday
emotionCollection.insert({
    id: "e011f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-09T10:30:00Z"),
    feelings: ["sad", "melancholy"],
    people: ["family", "grandparents"],
    place: ["family home"],
    moodScore: 4,
    createdAt: new Date("2025-06-09T10:30:00Z")
})

// June 10, 2025 - Monday (Today)
emotionCollection.insert({
    id: "e013f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-10T08:45:00Z"),
    feelings: ["optimistic", "ready"],
    people: ["colleagues"],
    place: ["office"],
    moodScore: 8,
    createdAt: new Date("2025-06-10T08:45:00Z")
})

// Verify the data has been inserted
print("Inserted " + emotionCollection.count() + " emotion entry records for the past week")
