// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the journalentries collection
db.createCollection('journalentries')
journalCollection = db.getCollection("journalentries")
journalCollection.remove({})

// Sample journal entries for the past week (June 4-10, 2025)
// User ID: 105181080591378910223

// June 4, 2025 - Tuesday
journalCollection.insert({
    id: "j001f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-04T21:30:00Z"),
    content: "Started the week with so much energy! Had an amazing presentation at work and felt really connected with my team. The new project we're working on has me genuinely excited about what's to come.",
    feelings: ["excited", "motivated", "accomplished"],
    createdAt: new Date("2025-06-04T21:30:00Z"),
    updatedAt: new Date("2025-06-04T21:30:00Z")
})

// June 5, 2025 - Wednesday
journalCollection.insert({
    id: "j002f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-05T22:15:00Z"),
    content: "Hit the gym early this morning and felt so energized afterward. Work was intense today with some tight deadlines, but I managed to stay focused. Sometimes the pressure brings out the best in me.",
    feelings: ["energized", "focused", "determined"],
    createdAt: new Date("2025-06-05T22:15:00Z"),
    updatedAt: new Date("2025-06-05T22:15:00Z")
})

// June 6, 2025 - Thursday
journalCollection.insert({
    id: "j003f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-06T23:00:00Z"),
    content: "Creative breakthrough today! The design session went incredibly well and I felt so inspired by the collaborative energy. Later went out with friends for dinner and drinks. Perfect balance of productivity and fun.",
    feelings: ["inspired", "creative", "happy"],
    createdAt: new Date("2025-06-06T23:00:00Z"),
    updatedAt: new Date("2025-06-06T23:00:00Z")
})

// June 7, 2025 - Friday
journalCollection.insert({
    id: "j004f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-07T22:45:00Z"),
    content: "What a way to end the work week! Our client presentation went better than expected and I felt such a sense of accomplishment. Celebrated with the team afterward. Grateful for supportive colleagues who feel like family.",
    feelings: ["accomplished", "proud", "grateful"],
    createdAt: new Date("2025-06-07T22:45:00Z"),
    updatedAt: new Date("2025-06-07T22:45:00Z")
})

// June 8, 2025 - Saturday
journalCollection.insert({
    id: "j005f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-08T20:30:00Z"),
    content: "Perfect Saturday. Went for a long hike with my partner in the morning - felt so peaceful surrounded by nature. Spent the afternoon browsing bookstores and found some great reads. Simple pleasures really are the best.",
    feelings: ["peaceful", "refreshed", "content"],
    createdAt: new Date("2025-06-08T20:30:00Z"),
    updatedAt: new Date("2025-06-08T20:30:00Z")
})

// June 9, 2025 - Sunday
journalCollection.insert({
    id: "j006f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-09T21:15:00Z"),
    content: "Family day! Spent time with my grandparents and heard so many wonderful stories from their past. It made me feel incredibly grateful for my roots and the love that surrounds me. Called up some old friends in the evening and caught up.",
    feelings: ["grateful", "warm", "nostalgic"],
    createdAt: new Date("2025-06-09T21:15:00Z"),
    updatedAt: new Date("2025-06-09T21:15:00Z")
})

// June 10, 2025 - Monday (Today)
journalCollection.insert({
    id: "j007f2345a6789b0c1d2e3f4",
    userId: "105181080591378910223",
    date: new Date("2025-06-10T19:00:00Z"),
    content: "Monday motivation is real! Started the new week feeling optimistic and ready for challenges. Had a mindful lunch break at the outdoor cafe - taking time to be present and appreciate the small moments makes such a difference.",
    feelings: ["optimistic", "balanced", "mindful"],
    createdAt: new Date("2025-06-10T19:00:00Z"),
    updatedAt: new Date("2025-06-10T19:00:00Z")
})

// Verify the data has been inserted
print("Inserted " + journalCollection.count() + " journal entry records for the past week")