# 🎓 UniQuiz AI — Classroom Hub Edition

<p align="center">
  <img src="https://raw.githubusercontent.com/Tahsin0909/UniQuiz-AI/main/public/favicon.ico" width="80" alt="UniQuiz AI Logo" />
</p>

<p align="center">
  <b>Turn your lecture PDFs and YouTube educational videos into interactive, high-yield quizzes within seconds.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.5_Flash-orange?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📖 Overview

**UniQuiz AI** is an intelligent, modern learning platform designed specifically for university students, educators, and self-learners. Powered by **Google Gemini 2.5 Flash** and the **Vercel AI SDK**, UniQuiz AI instantly analyzes lecture slides, textbooks, and YouTube lecture links to extract core concepts, definitions, and formulas, automatically generating high-yield multiple-choice tests with real-time hints and explanations.

Wrapped in a playful **Neo-Brutalist Classroom Hub** aesthetic with chalkboard greens, tilted yellow capsule badges, and physical drop shadows, UniQuiz makes studying fun, engaging, and remarkably efficient.

---

## ✨ Features

### 📄 PDF to Quiz Generator
- **Instant Document Parsing:** Upload lecture notes, syllabus slides, handouts, or textbook chapters (up to 5MB).
- **AI-Powered Title Extraction:** Automatically detects the topic and titles your quiz contextually.
- **Drag-and-Drop Dropzone:** Intuitive file upload zone with type checking and size validation.

### 🎥 YouTube to Quiz Generator
- **Multi-Format URL Support:** Works with standard watch links (`youtube.com/watch?v=...`), short links (`youtu.be/...`), Shorts (`youtube.com/shorts/...`), embeds, and direct video IDs.
- **Multi-Language Caption Extraction:** Automatically retrieves English, auto-generated, or localized captions using an updated InnerTube parser (`youtube-transcript-plus`).
- **Smart Metadata Fallback:** If a creator disables closed captions, UniQuiz analyzes the video's public syllabus, title, and educational description to craft questions so quiz generation never fails.
- **Live Thumbnail Preview:** Automatically detects the video ID and renders a live video preview badge.
- **One-Click Sample Presets:** Quick-test with curated educational lectures (*3Blue1Brown Linear Algebra*, *Harvard CS50*, *CrashCourse Genetics*).

### ⚡ Real-Time Streaming Generation
- **Low-Latency Streaming:** Uses `@ai-sdk/react`'s `useObject` and Google's `gemini-2.5-flash` to stream questions in real time.
- **Live Progress Tracker:** Watch questions formulate one by one with animated status feedback (`Crafting question #3 of 10...`).

### 🎮 Interactive Two-Column Quiz Engine
- **Vibrant Choice Cards:** 4 high-contrast, color-coded option bars:
  - 🔵 **Option A:** Sky Blue (`#5cd0ff`)
  - 🟠 **Option B:** Coral (`#fd8f51`)
  - 🌸 **Option C:** Pastel Pink (`#f78bb0`)
  - 🟣 **Option D:** Lavender (`#9b8bed`)
- **Teacher's Hint Drawer:** Expandable hint tab on every question providing contextual clues without immediately spoiling the answer.
- **Review Dashboard:** Comprehensive score screen with percentage grading, motivational mastery badges, and a complete question-by-question breakdown.

### 🏫 Classroom Hub Bulletin Board
The home page is an interactive corkboard featuring 9 live classroom widgets:
1. **📅 Today's Agenda:** Daily goals, exam targets, and recommended study tasks.
2. **💡 Daily Classroom Tip:** Evidence-based study strategies (Active Recall & Spaced Repetition).
3. **⏱️ Live Classroom Focus Timer:** Fully functional Pomodoro timer with Play, Pause, Reset, and sound alert.
4. **📊 Student Poll:** Interactive classroom polling on upcoming features.
5. **🧩 Daily Brain Teaser:** Logic riddles with an interactive reveal button.
6. **📢 Latest Updates:** Platform changelog detailing Gemini 2.5 Flash updates and YouTube features.
7. **🔗 Quick Study Links:** 1-click jumps to PDF and YouTube quiz engines.
8. **👨‍🏫 Professor's Corner:** Instructor bio and direct repository/profile links.
9. **📆 Class Calendar:** Key milestones, midterms, assignment deadlines, and final reviews.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[Next.js 16 (App Router)](https://nextjs.org/)** | React Framework with Turbopack for ultra-fast compilation |
| **[React 19](https://react.dev/)** | Core UI library with modern server & client components |
| **[Google Gemini 2.5 Flash](https://ai.google.dev/)** | State-of-the-art multimodal LLM for quiz generation |
| **[Vercel AI SDK](https://sdk.vercel.ai/)** | Streaming object generation (`ai`, `@ai-sdk/google`, `@ai-sdk/react`) |
| **[Tailwind CSS v3](https://tailwindcss.com/)** | Utility-first CSS framework customized for Neo-Brutalist aesthetics |
| **[Framer Motion](https://www.framer.com/motion/)** | Smooth micro-interactions, modal transitions, and progress bar animations |
| **[youtube-transcript-plus](https://github.com/ericmmartin/youtube-transcript-plus)** | Zero-dependency, modern YouTube InnerTube caption retrieval |
| **[Zod](https://zod.dev/)** | Strict runtime schema validation for structured quiz outputs |
| **[Sonner](https://sonner.emilkowal.ski/)** | Toast notification system |
| **[Lucide React](https://lucide.dev/)** | Crisp interface iconography |

---

## 📁 Project Structure

```text
UniQuiz-AI/
├── public/                     # Static assets, favicons, audio effects
├── src/
│   ├── app/
│   │   ├── (preview)/
│   │   │   └── actions.ts      # Server actions (quiz & video title generation)
│   │   ├── api/
│   │   │   ├── generate-quiz/  # POST endpoint for PDF-to-quiz streaming
│   │   │   └── generate-link-quiz/ # POST endpoint for YouTube-to-quiz streaming
│   │   ├── pdf-to-quiz/        # PDF upload page
│   │   ├── youtube-to-quiz/    # YouTube link upload page
│   │   ├── globals.css         # Global Tailwind and font styles
│   │   ├── layout.tsx          # Root layout with theme, fonts, Toaster & Footer
│   │   └── page.tsx            # Main Classroom Hub page
│   ├── components/
│   │   ├── MainPage.tsx        # Interactive Bulletin Board with 9 live modals
│   │   ├── quiz.tsx            # Two-column Neo-Brutalist quiz runner & results
│   │   ├── PageTransition.tsx  # Framer Motion smooth page transitions
│   │   ├── pdfToQuiz/
│   │   │   └── PdfToQuiz.tsx   # PDF dropzone & streaming generator
│   │   ├── youtubeToQuiz/
│   │   │   └── LinkInput.tsx   # YouTube URL input, video preview & streaming
│   │   ├── shared/
│   │   │   ├── Footer.tsx      # Neo-Brutalist classroom footer
│   │   │   ├── Icons.tsx       # Custom SVG icons (YouTube, GitHub, LinkedIn)
│   │   │   └── RootWraper.tsx  # Layout wrapper
│   │   └── ui/                 # Accessible Radix UI components (Sonner, Progress)
│   └── lib/
│       ├── schemas.ts          # Zod schema definitions for questions & choices
│       └── utils.ts            # Class merge utilities
├── package.json                # Project dependencies and npm scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind theme and custom color extensions
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** `>= 18.18.0` (Node.js 20+ or 22+ recommended)
- **npm**, **pnpm**, or **yarn**
- A **Google Gemini API Key** (Get one free from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tahsin0909/UniQuiz-AI.git
   cd UniQuiz-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Generative AI API Key
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```
   *(Alternatively, `GEMINI_API_KEY` is also supported as an alias).*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the Classroom Hub live.

---

## 🧪 Production Build & Linting

To check types and create an optimized production build:

```bash
# Type check with TypeScript
npx tsc --noEmit

# Build production bundle with Turbopack
npm run build

# Start production server
npm run start
```

---

## 🔌 API Endpoints

### `POST /api/generate-quiz`
Streams 10 structured multiple-choice questions from an uploaded PDF document.
- **Request Body:**
  ```json
  {
    "files": [
      {
        "name": "Lecture_1.pdf",
        "type": "application/pdf",
        "data": "JVBERi0xLjQK..." // base64 string
      }
    ]
  }
  ```
- **Response:** SSE / NDJSON text stream yielding structured `Question[]` objects.

### `POST /api/generate-link-quiz`
Fetches YouTube captions or video metadata and streams 10 multiple-choice questions.
- **Request Body:**
  ```json
  {
    "videoUrl": "https://www.youtube.com/watch?v=0PaWV3wIfkM"
  }
  ```
- **Response:** SSE / NDJSON text stream yielding structured `Question[]` objects.

---

## 🎨 Design System

UniQuiz AI combines **Neo-Brutalism** with a nostalgic **Classroom Bulletin Board** theme:
- **Chalkboard Green (`#3ea66b`):** Grounded background mimicking classroom chalkboards.
- **Cream Bulletin Card (`#fffbe0`):** Warm document paper tone for content containers.
- **Capsule Badge Yellow (`#ffd83f`):** Eye-catching tilted accent badges with 3D offset.
- **High-Yield Palette:**
  - 🔵 `#5cd0ff` — Sky Blue (Option A & Navigation)
  - 🟠 `#fd8f51` — Bright Coral (Option B & YouTube Quiz)
  - 🌸 `#f78bb0` — Pastel Pink (Option C & Quiz Badges)
  - 🟣 `#9b8bed` — Lavender (Option D & Calendar)
- **Sharp Typography & Shadows:** High-contrast `3px` solid black borders and `4px` to `8px` hard black drop shadows (`shadow-[8px_8px_0px_0px_#000]`).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

Crafted with ❤️ by **Tahsin**:
- **GitHub:** [@Tahsin0909](https://github.com/Tahsin0909)
- **LinkedIn:** [Tahsin](https://www.linkedin.com/in/tahsin09/)
- **Repository:** [UniQuiz-AI](https://github.com/Tahsin0909/UniQuiz-AI)

<p align="center">
  <sub>Classroom Hub Edition • UniQuiz AI © 2026</sub>
</p>
