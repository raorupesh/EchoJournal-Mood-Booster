// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the emotionentries collection
db.createCollection('emotionentries')
emotionCollection = db.getCollection("emotionentries")
emotionCollection.remove({})

// Sample emotion entries for the past week (June 4-10, 2025)
// User ID: 105181080591378910223

// June 4, 2025 - Tuesday
emotionCollection.insert({
    id: "e001f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-04T09:00:00Z"),
    feelings: ["excited", "motivated"],
    people: ["colleagues", "manager"],
    place: ["office", "conference room"],
    moodScore: 8,
    createdAt: new Date("2025-06-04T09:00:00Z")
})

// June 4, 2025 - Evening
emotionCollection.insert({
    id: "e002f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-04T19:30:00Z"),
    feelings: ["relaxed", "content"],
    people: ["family"],
    place: ["home"],
    moodScore: 7,
    createdAt: new Date("2025-06-04T19:30:00Z")
})

// June 5, 2025 - Wednesday
emotionCollection.insert({
    id: "e003f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-05T08:15:00Z"),
    feelings: ["energized", "focused"],
    people: ["workout buddy"],
    place: ["gym"],
    moodScore: 8,
    createdAt: new Date("2025-06-05T08:15:00Z")
})

// June 5, 2025 - Afternoon
emotionCollection.insert({
    id: "e004f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-05T14:45:00Z"),
    feelings: ["stressed", "determined"],
    people: ["team members"],
    place: ["office"],
    moodScore: 6,
    createdAt: new Date("2025-06-05T14:45:00Z")
})

// June 6, 2025 - Thursday
emotionCollection.insert({
    id: "e005f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-06T12:30:00Z"),
    feelings: ["inspired", "creative"],
    people: ["design team"],
    place: ["creative studio"],
    moodScore: 9,
    createdAt: new Date("2025-06-06T12:30:00Z")
})

// June 6, 2025 - Evening
emotionCollection.insert({
    id: "e006f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-06T20:00:00Z"),
    feelings: ["happy", "social"],
    people: ["friends"],
    place: ["restaurant", "bar"],
    moodScore: 8,
    createdAt: new Date("2025-06-06T20:00:00Z")
})

// June 7, 2025 - Friday
emotionCollection.insert({
    id: "e007f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-07T10:00:00Z"),
    feelings: ["accomplished", "proud"],
    people: ["boss", "clients"],
    place: ["meeting room"],
    moodScore: 9,
    createdAt: new Date("2025-06-07T10:00:00Z")
})

// June 7, 2025 - Evening
emotionCollection.insert({
    id: "e008f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-07T18:30:00Z"),
    feelings: ["relieved", "celebratory"],
    people: ["work team"],
    place: ["pub"],
    moodScore: 8,
    createdAt: new Date("2025-06-07T18:30:00Z")
})

// June 8, 2025 - Saturday
emotionCollection.insert({
    id: "e009f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-08T11:00:00Z"),
    feelings: ["peaceful", "refreshed"],
    people: ["partner"],
    place: ["park", "nature trail"],
    moodScore: 8,
    createdAt: new Date("2025-06-08T11:00:00Z")
})

// June 8, 2025 - Afternoon
emotionCollection.insert({
    id: "e010f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-08T16:20:00Z"),
    feelings: ["curious", "engaged"],
    people: ["myself"],
    place: ["bookstore", "coffee shop"],
    moodScore: 7,
    createdAt: new Date("2025-06-08T16:20:00Z")
})

// June 9, 2025 - Sunday
emotionCollection.insert({
    id: "e011f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-09T10:30:00Z"),
    feelings: ["grateful", "warm"],
    people: ["family", "grandparents"],
    place: ["family home"],
    moodScore: 9,
    createdAt: new Date("2025-06-09T10:30:00Z")
})

// June 9, 2025 - Evening
emotionCollection.insert({
    id: "e012f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-09T21:00:00Z"),
    feelings: ["nostalgic", "content"],
    people: ["old friends"],
    place: ["home"],
    moodScore: 7,
    createdAt: new Date("2025-06-09T21:00:00Z")
})

// June 10, 2025 - Monday (Today)
emotionCollection.insert({
    id: "e013f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-10T08:45:00Z"),
    feelings: ["optimistic", "ready"],
    people: ["colleagues"],
    place: ["office"],
    moodScore: 8,
    createdAt: new Date("2025-06-10T08:45:00Z")
})

// June 10, 2025 - Lunch break
emotionCollection.insert({
    id: "e014f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-10T12:15:00Z"),
    feelings: ["balanced", "mindful"],
    people: ["lunch companion"],
    place: ["outdoor cafe"],
    moodScore: 7,
    createdAt: new Date("2025-06-10T12:15:00Z")
})

// Verify the data has been inserted
print("Inserted " + emotionCollection.count() + " emotion entry records for the past week")
