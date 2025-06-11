// Switch to your sample DB
db = db.getSiblingDB('echoJournalSample')

// Create and clear the journalentries collection
db.createCollection('journalentries')
journalCollection = db.getCollection("journalentries")

// Sample journal entries for the past week (June 4-10, 2025)
// User ID: 113352457463047835007

// June 4, 2025 - Tuesday
journalCollection.insert({
    id: "j001f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-04T21:30:00Z"),
    content: "Another overwhelming day at work. The presentation didn't go as planned and I felt so anxious in front of everyone. My manager seemed disappointed and I can't shake the feeling that I'm not good enough for this job. Coming home, even my family felt distant.",
    feelings: ["overwhelmed", "anxious", "inadequate"],
    createdAt: new Date("2025-06-04T21:30:00Z"),
    updatedAt: new Date("2025-06-04T21:30:00Z")
})

// June 5, 2025 - Wednesday
journalCollection.insert({
    id: "j002f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-05T22:15:00Z"),
    content: "Couldn't even get myself to the gym this morning. Felt so tired and unmotivated. Work was a disaster with impossible deadlines that I couldn't meet. I keep making mistakes and my team members seem frustrated with me. I feel like I'm failing at everything.",
    feelings: ["exhausted", "unmotivated", "defeated"],
    createdAt: new Date("2025-06-05T22:15:00Z"),
    updatedAt: new Date("2025-06-05T22:15:00Z")
})

// June 6, 2025 - Thursday
journalCollection.insert({
    id: "j003f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-06T23:00:00Z"),
    content: "Creative block hit me hard today. Sat in the design session feeling completely uninspired while everyone else seemed to have brilliant ideas. Went out with friends afterward but felt so isolated even in their company. They all seemed so happy and successful while I felt like a fraud.",
    feelings: ["uninspired", "blocked", "isolated"],
    createdAt: new Date("2025-06-06T23:00:00Z"),
    updatedAt: new Date("2025-06-06T23:00:00Z")
})

// June 7, 2025 - Friday
journalCollection.insert({
    id: "j004f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-07T22:45:00Z"),
    content: "The client presentation was a complete disaster. I stumbled through my slides and felt so embarrassed. My boss looked disappointed and the clients seemed unimpressed. Even the team drinks afterward felt hollow - I just felt drained and empty, like I was pretending to be okay.",
    feelings: ["disappointed", "embarrassed", "drained"],
    createdAt: new Date("2025-06-07T22:45:00Z"),
    updatedAt: new Date("2025-06-07T22:45:00Z")
})

// June 8, 2025 - Saturday
journalCollection.insert({
    id: "j005f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-08T20:30:00Z"),
    content: "Tried to go for a hike to clear my head but felt so restless and agitated even in nature. My partner seemed to notice I was off but I couldn't explain what was wrong. Spent the afternoon wandering around bookstores but couldn't focus on anything. Everything feels meaningless right now.",
    feelings: ["restless", "agitated", "meaningless"],
    createdAt: new Date("2025-06-08T20:30:00Z"),
    updatedAt: new Date("2025-06-08T20:30:00Z")
})

// June 9, 2025 - Sunday
journalCollection.insert({
    id: "j006f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-09T21:15:00Z"),
    content: "Visited my grandparents today but even their stories felt bittersweet. Seeing them aging makes me think about mortality and how time passes so quickly. Called some old friends but realized how distant we've become. I feel like I'm losing connections with everyone who used to matter.",
    feelings: ["melancholy", "sad", "disconnected"],
    createdAt: new Date("2025-06-09T21:15:00Z"),
    updatedAt: new Date("2025-06-09T21:15:00Z")
})

// June 10, 2025 - Monday (Today)
journalCollection.insert({
    id: "j007f2345a6789b0c1d2e3f4",
    userId: "113352457463047835007",
    date: new Date("2025-06-10T19:00:00Z"),
    content: "Monday blues hit hard. Woke up dreading another week of work and feeling hopeless about everything. Even my lunch break felt empty - sat at the outdoor cafe but couldn't appreciate anything around me. I feel so detached from my own life, like I'm just going through the motions.",
    feelings: ["hopeless", "dreading", "detached"],
    createdAt: new Date("2025-06-10T19:00:00Z"),
    updatedAt: new Date("2025-06-10T19:00:00Z")
})

// Verify the data has been inserted
print("Inserted " + journalCollection.count() + " journal entry records for the past week")