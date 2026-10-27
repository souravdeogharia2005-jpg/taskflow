# TaskFlow ⚡ - Smart Task Manager

TaskFlow is a modern, responsive, and aesthetic task management application featuring fluid UI transitions, dynamic theme switching, full calendar timeline scheduling, category filtering, and real-time statistics.

---

## 🎨 Themes & Visual Aesthetics

TaskFlow features three distinct visual themes:

1. **Modern Sky** (Default): Sky Blue, White, Obsidian Black & Slate Grey accents.
2. **Retro Classic**: A nostalgic 2000s/2010s early Facebook & Google web aesthetic with classic royal blue header (`#3B5998`), beveled Web 2.0 buttons, crisp 1px borders (`#D8DFEA`), and Google multi-color category badges.
3. **Night Mode**: Deep Obsidian & Slate Dark Mode with glowing sky-blue accents.

---

## 🚀 Features

- **Dynamic Interactive Dashboard**: Real-time progress bar, daily statistics cards, and priority task highlights.
- **Task Management**: Create, edit, complete, delete, search, sort, and filter tasks.
- **Subtasks & Checklists**: Add and track subtask progress with live percentage indicators.
- **Calendar & Timeline View**: 7-day responsive strip and chronological schedule slots.
- **Categories & Tags**: Organize tasks into Work, Study, Personal, Shopping, Health, and custom categories.
- **Comprehensive Statistics**: Visual breakdown of completion rate, category distribution, and task counts.
- **Full Offline Persistence**: Instant local persistence with zero initial clutter.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router v6, GSAP animations, Date-fns, Vanilla CSS Design System.
- **Backend**: Node.js, Express, CORS, RESTful API architecture.

---

## 💻 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd to-do-list
   ```

2. Install dependencies:
   ```bash
   # In root
   npm install
   # In client
   cd client && npm install
   # In server
   cd ../server && npm install
   ```

3. Run the development environment:
   - **Frontend** (Vite):
     ```bash
     cd client
     npm run dev
     ```
     Runs on `http://localhost:3000`
   - **Backend** (Express API):
     ```bash
     cd server
     npm start
     ```
     Runs on `http://localhost:5000`

---

## 📄 License

MIT License.
