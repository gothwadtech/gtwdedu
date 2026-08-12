Gothwad Education - K-12 School Management & Learning Platform
Welcome to Gothwad Education, a mobile-first, high-performance School Management System and Digital Learning Ecosystem designed for Admins, Teachers, Students, and Parents.

🌟 Key Features
👑 Admin Management Portal
Student & Staff Registry: Full CRUD operations for managing students, teachers, and school personnel.
Fee Management: Track tuition status, generate receipts, record payments, and filter overdue accounts.
Notices & Circulars: Broadcast school-wide announcements with target role filtering.
System Overview Analytics: Attendance stats, class demographics, fee collection progress.
👨‍🏫 Teacher Portal
Digital Class Attendance: One-tap daily attendance marking for classes.
Homework Assignment Hub: Post new homework assignments with class, subject, and deadline parameters.
Submission Evaluator: Review student homework submissions and provide direct feedback/grades.
Report Card Generator: Enter term marks, automatic GPA calculation, and report generation.
🎓 Student Portal
Personal Learning Dashboard: View class timetable, subject list, and homework deadlines.
Homework Submission Engine: Upload or type homework responses directly from mobile or desktop.
Academic Progress Tracker: View subject grades, term report cards, and attendance percentages.
Notice Board: Read school circulars and exam schedules.
👪 Parent Portal
Child Progress Tracker: Real-time view of attendance logs, academic report cards, and fee receipts.
Direct Fee Payment: View detailed fee breakup and clear tuition dues.
Teacher Communication: Access teacher notes and homework status updates.
🛠️ Technology Stack
Frontend Framework: React 18 + Vite + TypeScript
Styling & Layout: Tailwind CSS with mobile-first flat responsive design
Iconography: Lucide React
Data Persistence: Safe client-side storage engine (safeStorage) with zero-downtime local persistence + optional Supabase backend synchronization
Authentication: Multi-role persona auth state machine supporting Instant Demo Personas & Supabase Auth
📁 Project Structure
├── docs/
│   ├── README.md        # Platform Documentation
│   └── AGENTS.md        # AI Agent Rules & Architecture Guidelines
├── sql/
│   └── schema.sql       # PostgreSQL / Supabase Schema & Seed Data
├── public/
│   ├── logo.jpg         # 512x512 Curved App Splash Logo
│   └── assets/          # Static Media & Platform Assets
├── src/
│   ├── components/      # UI primitives, modals, cards, headers, splash screen
│   ├── config/          # Constants, demo accounts, Supabase setup
│   ├── context/         # Auth, Theme, and Toast providers
│   ├── features/        # Role-based dashboard views (Admin, Teacher, Student, Parent)
│   ├── hooks/           # Custom React hooks (useAuth, useTheme, etc.)
│   ├── lib/             # Data stores, storage wrappers, mock data generators
│   └── types.ts         # Global TypeScript interfaces
├── .env                 # Local Environment File
├── .env.example         # Environment Variable Schema
└── package.json         # NPM Dependencies & Build Scripts
⚙️ Quick Start & Local Setup
Install Dependencies:

npm install
Configure Environment Variables: Copy .env.example to .env and set optional credentials.

Start Development Server:

npm run dev
Production Build:

npm run build
📄 License & Credits
Developed for Gothwad Education Platform. All rights reserved.
