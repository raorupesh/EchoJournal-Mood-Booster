// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the emotionentries collection
db.createCollection('emotionentries')
emotionCollection = db.getCollection("emotionentries")
emotionCollection.remove({})

// Insert sample emotion entries for the past week (June 2-8, 2025)
emotionCollection.insert({
    id: "e001f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-02T08:00:00Z"),
    feelings: ["motivated", "focused"],
    people: ["coworkers", "team"],
    place: ["office", "meeting room"],
    moodScore: 8,
    createdAt: new Date("2025-06-02T08:00:00Z")
})

emotionCollection.insert({
    id: "e002f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-03T19:30:00Z"),
    feelings: ["accomplished", "satisfied"],
    people: ["colleagues", "family"],
    place: ["office", "restaurant"],
    moodScore: 9,
    createdAt: new Date("2025-06-03T19:30:00Z")
})

emotionCollection.insert({
    id: "e003f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-04T15:00:00Z"),
    feelings: ["stressed", "resilient"],
    people: ["client", "team"],
    place: ["conference room", "office"],
    moodScore: 6,
    createdAt: new Date("2025-06-04T15:00:00Z")
})

emotionCollection.insert({
    id: "e004f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-05T12:15:00Z"),
    feelings: ["joyful", "grateful"],
    people: ["friends", "hobby group"],
    place: ["cafe", "home"],
    moodScore: 9,
    createdAt: new Date("2025-06-05T12:15:00Z")
})

emotionCollection.insert({
    id: "e005f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-06T17:45:00Z"),
    feelings: ["excited", "hopeful"],
    people: ["boss", "mentor"],
    place: ["office", "corporate building"],
    moodScore: 9,
    createdAt: new Date("2025-06-06T17:45:00Z")
})

emotionCollection.insert({
    id: "e006f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-07T13:30:00Z"),
    feelings: ["peaceful", "content"],
    people: ["hiking partner", "nature"],
    place: ["hiking trail", "home"],
    moodScore: 8,
    createdAt: new Date("2025-06-07T13:30:00Z")
})

emotionCollection.insert({
    id: "e007f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-08T09:20:00Z"),
    feelings: ["reflective", "optimistic"],
    people: ["myself", "family"],
    place: ["home", "garden"],
    moodScore: 8,
    createdAt: new Date("2025-06-08T09:20:00Z")
})

// Insert sample emotion entries for second user (105181080591378910223) - past week
emotionCollection.insert({
    id: "e008f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-02T07:00:00Z"),
    feelings: ["centered", "prepared"],
    people: ["yoga instructor", "myself"],
    place: ["yoga studio", "home"],
    moodScore: 7,
    createdAt: new Date("2025-06-02T07:00:00Z")
})

emotionCollection.insert({
    id: "e009f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-03T18:30:00Z"),
    feelings: ["inspired", "creative"],
    people: ["art mentor", "fellow artists"],
    place: ["art studio", "gallery"],
    moodScore: 9,
    createdAt: new Date("2025-06-03T18:30:00Z")
})

emotionCollection.insert({
    id: "e010f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-04T20:45:00Z"),
    feelings: ["proud", "relieved"],
    people: ["roommate", "myself"],
    place: ["apartment", "living room"],
    moodScore: 7,
    createdAt: new Date("2025-06-04T20:45:00Z")
})

emotionCollection.insert({
    id: "e011f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-05T15:30:00Z"),
    feelings: ["peaceful", "connected"],
    people: ["dog", "nature"],
    place: ["hiking trail", "forest"],
    moodScore: 8,
    createdAt: new Date("2025-06-05T15:30:00Z")
})

emotionCollection.insert({
    id: "e012f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-06T21:45:00Z"),
    feelings: ["joyful", "social"],
    people: ["close friends", "game group"],
    place: ["friend's house", "living room"],
    moodScore: 9,
    createdAt: new Date("2025-06-06T21:45:00Z")
})

emotionCollection.insert({
    id: "e013f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-07T10:15:00Z"),
    feelings: ["satisfied", "grounded"],
    people: ["farmers", "neighbors"],
    place: ["farmers market", "kitchen"],
    moodScore: 8,
    createdAt: new Date("2025-06-07T10:15:00Z")
})

emotionCollection.insert({
    id: "e014f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-08T14:30:00Z"),
    feelings: ["grateful", "calm"],
    people: ["myself", "book characters"],
    place: ["reading nook", "bedroom"],
    moodScore: 8,
    createdAt: new Date("2025-06-08T14:30:00Z")
})