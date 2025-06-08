// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the journalentries collection
db.createCollection('journalentries')
journalCollection = db.getCollection("journalentries")
journalCollection.remove({})

// Insert sample journal entries for the past week (June 2-8, 2025)
journalCollection.insert({
    id: "j001f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-02T09:00:00Z"),
    content: "Monday morning motivation. Starting the week with positive energy and clear goals.",
    feelings: ["motivated", "focused"],
    createdAt: new Date("2025-06-02T09:00:00Z"),
    updatedAt: new Date("2025-06-02T09:00:00Z")
})

journalCollection.insert({
    id: "j002f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-03T20:30:00Z"),
    content: "Had a productive Tuesday at work. Completed my project milestone and celebrated with a nice dinner.",
    feelings: ["accomplished", "satisfied"],
    createdAt: new Date("2025-06-03T20:30:00Z"),
    updatedAt: new Date("2025-06-03T20:30:00Z")
})

journalCollection.insert({
    id: "j003f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-04T22:15:00Z"),
    content: "Wednesday brought some challenges with a difficult client meeting, but I handled it well. Taking time to decompress with meditation.",
    feelings: ["stressed", "resilient"],
    createdAt: new Date("2025-06-04T22:15:00Z"),
    updatedAt: new Date("2025-06-04T22:15:00Z")
})

journalCollection.insert({
    id: "j004f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-05T21:00:00Z"),
    content: "Thursday was amazing! Had lunch with old friends and spent the evening working on my hobby project. Feeling grateful for good friendships.",
    feelings: ["joyful", "grateful"],
    createdAt: new Date("2025-06-05T21:00:00Z"),
    updatedAt: new Date("2025-06-05T21:00:00Z")
})

journalCollection.insert({
    id: "j005f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-06T18:45:00Z"),
    content: "Friday brought exciting news about a potential promotion! Feeling optimistic about the future and celebrating the week's accomplishments.",
    feelings: ["excited", "hopeful"],
    createdAt: new Date("2025-06-06T18:45:00Z"),
    updatedAt: new Date("2025-06-06T18:45:00Z")
})

journalCollection.insert({
    id: "j006f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-07T14:30:00Z"),
    content: "Saturday was perfect for relaxation. Went hiking in the morning and spent the afternoon reading. Sometimes doing nothing is everything.",
    feelings: ["peaceful", "content"],
    createdAt: new Date("2025-06-07T14:30:00Z"),
    updatedAt: new Date("2025-06-07T14:30:00Z")
})

journalCollection.insert({
    id: "j007f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-08T10:00:00Z"),
    content: "Sunday reflection: This week has been a journey of growth and self-discovery. Looking forward to what next week brings.",
    feelings: ["reflective", "optimistic"],
    createdAt: new Date("2025-06-08T10:00:00Z"),
    updatedAt: new Date("2025-06-08T10:00:00Z")
})

// Insert sample journal entries for second user (105181080591378910223) - past week
journalCollection.insert({
    id: "j008f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-02T07:30:00Z"),
    content: "Starting the week with morning yoga and meditation. Feeling centered and ready for new challenges.",
    feelings: ["centered", "prepared"],
    createdAt: new Date("2025-06-02T07:30:00Z"),
    updatedAt: new Date("2025-06-02T07:30:00Z")
})

journalCollection.insert({
    id: "j009f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-03T19:15:00Z"),
    content: "Tuesday brought creative inspiration at the art studio. Working on a new painting series that feels meaningful.",
    feelings: ["inspired", "creative"],
    createdAt: new Date("2025-06-03T19:15:00Z"),
    updatedAt: new Date("2025-06-03T19:15:00Z")
})

journalCollection.insert({
    id: "j010f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-04T21:45:00Z"),
    content: "Had a challenging conversation with my roommate about boundaries. Proud of myself for speaking up honestly.",
    feelings: ["proud", "relieved"],
    createdAt: new Date("2025-06-04T21:45:00Z"),
    updatedAt: new Date("2025-06-04T21:45:00Z")
})

journalCollection.insert({
    id: "j011f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-05T16:20:00Z"),
    content: "Thursday was perfect for hiking with my dog. Nature always helps me find perspective and inner peace.",
    feelings: ["peaceful", "connected"],
    createdAt: new Date("2025-06-05T16:20:00Z"),
    updatedAt: new Date("2025-06-05T16:20:00Z")
})

journalCollection.insert({
    id: "j012f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-06T22:30:00Z"),
    content: "Friday game night with friends was exactly what I needed. Laughter really is the best medicine for stress.",
    feelings: ["joyful", "social"],
    createdAt: new Date("2025-06-06T22:30:00Z"),
    updatedAt: new Date("2025-06-06T22:30:00Z")
})

journalCollection.insert({
    id: "j013f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-07T11:00:00Z"),
    content: "Saturday farmers market and cooking a new recipe. Simple pleasures bring the most satisfaction.",
    feelings: ["satisfied", "grounded"],
    createdAt: new Date("2025-06-07T11:00:00Z"),
    updatedAt: new Date("2025-06-07T11:00:00Z")
})

journalCollection.insert({
    id: "j014f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-08T15:45:00Z"),
    content: "Sunday self-care day: journaling, reading, and planning for the week ahead. Feeling grateful for this peaceful moment.",
    feelings: ["grateful", "calm"],
    createdAt: new Date("2025-06-08T15:45:00Z"),
    updatedAt: new Date("2025-06-08T15:45:00Z")
})