// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the emotionentries collection
db.createCollection('emotionentries')
emotionCollection = db.getCollection("emotionentries")
emotionCollection.remove({})

// Using predefined IDs instead of generating them
// Insert sample emotion entries
emotionCollection.insert({
    id: "e001f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-25T08:00:00Z"),
    feelings: ["happy", "energized"],
    people: ["family", "coworkers"],
    place: ["home", "office"],
    moodScore: 8,
    createdAt: new Date("2025-04-25T08:00:00Z")
})

emotionCollection.insert({
    id: "e002f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-26T12:30:00Z"),
    feelings: ["focused", "content"],
    people: ["teammates"],
    place: ["coffee shop"],
    moodScore: 7,
    createdAt: new Date("2025-04-26T12:30:00Z")
})

emotionCollection.insert({
    id: "e003f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-27T21:00:00Z"),
    feelings: ["anxious", "hopeful"],
    people: ["myself"],
    place: ["home"],
    moodScore: 6,
    createdAt: new Date("2025-04-27T21:00:00Z")
})

emotionCollection.insert({
    id: "e004f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-28T10:15:00Z"),
    feelings: ["inspired", "motivated"],
    people: ["mentor", "colleagues"],
    place: ["meeting room", "office"],
    moodScore: 8,
    createdAt: new Date("2025-04-28T10:15:00Z")
})

emotionCollection.insert({
    id: "e005f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-29T18:45:00Z"),
    feelings: ["tired", "accomplished"],
    people: ["team"],
    place: ["conference room"],
    moodScore: 6,
    createdAt: new Date("2025-04-29T18:45:00Z")
})

emotionCollection.insert({
    id: "e006f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-30T09:30:00Z"),
    feelings: ["calm", "relaxed"],
    people: ["friends"],
    place: ["park"],
    moodScore: 7,
    createdAt: new Date("2025-04-30T09:30:00Z")
})

emotionCollection.insert({
    id: "e007f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-05-01T14:20:00Z"),
    feelings: ["excited", "nervous"],
    people: ["boss", "client"],
    place: ["client office"],
    moodScore: 7,
    createdAt: new Date("2025-05-01T14:20:00Z")
})

emotionCollection.insert({
    id: "e008f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-05-02T20:00:00Z"),
    feelings: ["satisfied", "proud"],
    people: ["team", "family"],
    place: ["office", "home"],
    moodScore: 9,
    createdAt: new Date("2025-05-02T20:00:00Z")
})

emotionCollection.insert({
    id: "e009f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-03T09:15:00Z"),
    feelings: ["motivated"],
    people: ["running partner"],
    place: ["gym"],
    moodScore: 9,
    createdAt: new Date("2025-04-03T09:15:00Z")
})

emotionCollection.insert({
    id: "e010f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-05T11:30:00Z"),
    feelings: ["focused", "determined"],
    people: ["study group"],
    place: ["library"],
    moodScore: 8,
    createdAt: new Date("2025-04-05T11:30:00Z")
})

emotionCollection.insert({
    id: "e011f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-06T16:45:00Z"),
    feelings: ["content", "peaceful"],
    people: ["partner"],
    place: ["beach"],
    moodScore: 7,
    createdAt: new Date("2025-04-06T16:45:00Z")
})

emotionCollection.insert({
    id: "e012f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-07T08:20:00Z"),
    feelings: ["stressed", "overwhelmed"],
    people: ["professor", "classmates"],
    place: ["university"],
    moodScore: 4,
    createdAt: new Date("2025-04-07T08:20:00Z")
})

emotionCollection.insert({
    id: "e013f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-08T13:10:00Z"),
    feelings: ["optimistic", "energetic"],
    people: ["mentor"],
    place: ["cafe"],
    moodScore: 8,
    createdAt: new Date("2025-04-08T13:10:00Z")
})

emotionCollection.insert({
    id: "e014f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-09T19:30:00Z"),
    feelings: ["grateful", "relaxed"],
    people: ["family"],
    place: ["restaurant"],
    moodScore: 7,
    createdAt: new Date("2025-04-09T19:30:00Z")
})

emotionCollection.insert({
    id: "e015f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-04-04T19:45:00Z"),
    feelings: ["tired", "relieved"],
    people: ["roommates"],
    place: ["apartment"],
    moodScore: 5,
    createdAt: new Date("2025-04-04T19:45:00Z")
})