# EchoJournal - Mood Booster

EchoJournal is a SaaS (Software as a Service) web application designed to help users track their moods, emotions, and journal entries. The platform provides a simple and interactive way to log daily feelings, reflect on emotional patterns, and boost mental well-being.

---

## 🚀 Features

- **User Journal Entries:**  
  Create, read, update, and delete personal journal entries with mood and emotion tagging.

- **Emotion Tracking:**  
  Log and visualize your emotional states over time.

- **RESTful API:**  
  Well-structured endpoints for journal and emotion management.

- **Testing Suite:**  
  Automated tests using Mocha and Chai for robust backend validation.

- **Frontend (Angular):**  
  Modern, interactive UI for users to manage their journals and emotions.

---

## 🛠️ Tech Stack

- **Frontend:** Angular
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Testing:** Mocha, Chai, Chai-HTTP
- **Other:**  
  - JavaScript (ES6+)  
  - RESTful API design  
  - Google SSO (for authentication)  
  - Azure (for deployment)  
  - VS Code recommended for development

---

## 📁 Project Structure

```
EchoJournal-Mood-Booster/
│
├── Angular/                  # Angular frontend application
│   ├── src/                  # Angular source code
│   ├── angular.json          # Angular config
│   └── ...                   # Other Angular files
│
├── Azure/                    # Azure deployment configuration
│   └── ...                   # Azure deployment files
│
├── MongooseDB/
│   ├── App.js                # Main Express app and API routes
│   ├── models/               # Mongoose models (JournalEntry, EmotionEntry, etc.)
│   ├── db/                   # MongoDB data directory
│   └── start.EchoJournal.cmd # Script to start MongoDB server
│
├── Mocha/
│   ├── test/
│   │   └── AppTestFile.js    # Mocha/Chai test cases for API
│   ├── runTestFile.cmd       # Script to run tests
│   └── package.json          # Testing dependencies
│
├── README.md                 # Project documentation
└── ...                       # Other supporting files
```

---

## ⚡ Getting Started

### 1. **Clone the Repository**
```sh
git clone <https://github.com/raorupesh/EchoJournal-Mood-Booster.git>
cd EchoJournal-Mood-Booster
```

### 2. **Install Backend & Test Dependencies**
```sh
cd Mocha
npm install
```

### 3. **Install Frontend Dependencies**
```sh
cd ../Angular
npm install
```

### 4. **Start MongoDB**
```sh
cd ../MongooseDB
start.EchoJournal.cmd
```
> Ensure the `db` folder exists in `MongooseDB/` for MongoDB data.

### 5. **Start the Backend Server**
```sh
node App.js
```
> The server runs by default on `http://localhost:8080`.

### 6. **Start the Angular Frontend**
```sh
cd ../Angular
ng serve
```
> The Angular app runs by default on `http://localhost:4200`.

### 7. **Run Tests**
```sh
cd ../Mocha
runTestFile.cmd
```
> This will execute all Mocha/Chai test cases in `test/AppTestFile.js`.

---

## 🚀 Azure Deployment

### Prerequisites
- Azure account with appropriate subscription
- Azure CLI installed and configured

### Deployment Steps

1. **Build Angular for Production**
```sh
cd angular
ng build
```
> This creates optimized files in the `dist/` folder.

2. **Copy Angular Build to Azure Directory**
```sh
cp -r dist/echo-journal/browser/* ../Azure/dist
```
or use file explorer in your system.

3. **Update API URLs**
- Update all API endpoint URLs in your Angular services to match your Azure deployment URLs
- Update MongoDB connection strings in `MongooseDB/App.js` to point to your Azure MongoDB instance

> **Note:** most of them could just be / because they are in the same endpoint.

4. **Configure Express Server for Azure**
- Ensure your Express server is configured for Azure hosting
- Update CORS settings and port configurations as needed for Azure App Service

5. **Deploy to Azure**

> **Note:** Make sure to configure your MongoDB connection and update all environment-specific URLs before deployment.

---

## 🧩 Components

- **Angular Frontend:**  
  User interface for journaling and emotion tracking.

- **Journal Entry API:**  
  Endpoints for creating, retrieving, and managing journal entries.

- **Emotion Entry API:**  
  Endpoints for logging and analyzing emotional states.

- **Testing Suite:**  
  Comprehensive tests for all major API endpoints.

---

## 📝 Example API Usage

- **Create Journal Entry:**  
  `POST /app/journal/`  
  ```json
  {
    "userId": 1,
    "content": "Today was a great day!",
    "feelings": ["happy", "motivated"],
    "date": "2025-05-18T01:53:39.307Z"
  }
  ```

- **Get All Entries for Student:**  
  `GET /app/journal/all/`

---

## 🧪 Running & Understanding Tests

- All tests are located in `Mocha/test/AppTestFile.js`.
- Tests cover:
  - Creating journal entries
  - Fetching by ID and user
  - Handling invalid IDs and non-existent entries
  - Pagination and empty results

---

## 💡 Tips for New Users

- **Start MongoDB before running the backend.**
- **Use MongoDB Compass** to visually inspect your data (`mongodb://localhost:27017` by default).
- **Check test output** for API contract and example responses.
- **Modify or add tests** in `AppTestFile.js` to extend coverage.

---

**EchoJournal - Mood Booster**  
Helping you reflect, grow, and boost your mood, one entry at a time.

