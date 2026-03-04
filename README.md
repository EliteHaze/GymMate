💪 GymMate

A full-stack exercise library and workout management web application built with the MERN stack.

GymMate is a modern, responsive fitness app that lets you build and manage your personal exercise library. Search and filter exercises by muscle group, add new custom exercises, and browse workouts by available time — all from a clean, intuitive interface.

📸 Preview

Add screenshots here after deployment (e.g., Home page, Add Exercise form, By Time view)


🚀 Features

📚 Exercise Library — Browse all your saved exercises in a card-based grid layout
🔍 Search — Instantly filter exercises by name using the live search bar
🏋️ Muscle Group Filter — Filter exercises by one or more muscle groups (Chest, Back, Legs, Shoulders, Arms, Core, Full Body, Cardio)
➕ Add Exercises — Create new exercises with details like sets, reps, rest time, time duration, and muscle group
⏱️ By Time — Browse workout suggestions based on your available time (/suggest route)
🔔 Toast Notifications — Real-time feedback on actions (add, delete, errors)
📱 Responsive Design — Fully mobile-friendly with a sticky navbar and adaptive grid


🛠️ Tech Stack
Frontend
TechnologyVersionPurposeReact18.3.1UI frameworkReact Router DOM6.xClient-side routingAxios1.xHTTP client for API callsTailwind CSS3.xUtility-first CSS stylingDaisyUI4.xTailwind component libraryLucide React0.263.xIcon libraryReact Hot Toast2.xToast notification systemVite5.xBuild tool and dev server
Backend
TechnologyPurposeNode.jsRuntime environmentExpress.jsWeb framework / REST APIMongoDBDatabaseMongooseODM for MongoDB

📁 Project Structure
GymMate/
├── backend/
│   ├── models/
│   │   └── Exercise.js         # Mongoose schema for exercises
│   ├── routes/                 # Express API routes
│   ├── controllers/            # Route handler logic
│   └── server.js               # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky top navigation bar
│   │   │   ├── ExerciseCard.jsx    # Individual exercise display card
│   │   │   └── ExerciseNotFound.jsx # Empty state component
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Exercise library with search & filter
│   │   │   ├── CreatePage.jsx      # Add new exercise form
│   │   │   └── SuggestPage.jsx     # Browse workouts by time
│   │   ├── lib/
│   │   │   └── axios.js            # Pre-configured Axios instance
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── package.json                # Root-level scripts (concurrent dev)
└── .gitignore

⚙️ Exercise Data Model
Each exercise stored in MongoDB follows this schema:
js{
  exerciseName: String,      // required
  muscleGroup:  [String],    // required — array of targeted muscle groups
  sets:         Number,      // required
  reps:         Number,      // required
  restTime:     Number,      // required — rest between sets (seconds)
  workoutId:    String,      // required — links exercise to a workout
  timeDuration: Number,      // required — estimated duration (minutes)
  createdAt:    Date,        // auto-generated
  updatedAt:    Date         // auto-generated
}

🔗 API Endpoints
MethodEndpointDescriptionGET/api/exercisesFetch all exercisesPOST/api/exercisesCreate a new exerciseDELETE/api/exercises/:idDelete an exercise by ID

(Update this section to reflect your actual route structure)


🏁 Getting Started
Prerequisites

Node.js v18 or higher
MongoDB (local or Atlas)
npm


1. Clone the Repository
bashgit clone https://github.com/EliteHaze/GymMate.git
cd GymMate

2. Configure Environment Variables
Create a .env file inside the backend/ directory:
envPORT=5000
MONGO_URI=your_mongodb_connection_string

⚠️ Never commit your .env file. It is already listed in .gitignore.


3. Install Dependencies
Install all dependencies (root + backend + frontend) at once:
bashnpm install
Or install manually:
bash# Root
npm install

# Backend
cd backend && npm install

# Frontend
cd frontend && npm install

4. Run the App
Development mode (runs both frontend and backend concurrently):
bashnpm run dev
Run backend only:
bashcd backend && npm run dev
Run frontend only:
bashcd frontend && npm run dev
The frontend will be available at: http://localhost:5173
The backend API will run at: http://localhost:5000

5. Build for Production
bashcd frontend && npm run build

🗺️ Application Routes
RoutePageDescription/HomeExercise library with search and muscle group filters/createAdd ExerciseForm to create a new exercise/suggestBy TimeBrowse workout suggestions by time available

🧭 Navigation
The sticky Navbar provides quick access to all pages:

🏠 Home — View your exercise library
⏱️ By Time — Find workouts that fit your schedule
➕ Add Exercise — Log a new exercise


📦 Scripts Reference
ScriptDescriptionnpm run devStart both frontend and backend in development modenpm run buildBuild the frontend for productionnpm run previewPreview the production build locally

🤝 Contributing
Contributions, issues, and feature requests are welcome!

Fork the repository
Create a new branch: git checkout -b feature/your-feature-name
Commit your changes: git commit -m "Add your feature"
Push to the branch: git push origin feature/your-feature-name
Open a Pull Request


📄 License
This project is open source and available under the MIT License.

👤 Author
Limesh Chaudhari

GitHub: @EliteHaze



Made with ❤️ and lots of reps 💪
