# LENS 🚀 — Advanced AI News Verification System

**LENS** is a premium, full-stack news verification platform designed to combat misinformation in the modern digital age. Powered by **Google Gemini 2.5 Flash**, it provides real-time, high-accuracy analysis of news content in both **English and Urdu**, supporting both text and image-based inputs.

---

## 🌟 Key Features

*   **Link Analysis (URL Check)**: Verify news directly from web links by fetching and analyzing live article content.
*   **Intelligent Content Filtering**: Automatically detects and flags non-news content (gibberish, casual chat) as "Not News".
*   **Multimodal Vision (AI-OCR)**: Leverages Gemini's vision capabilities to "read" news from images, newspaper clips, and social media screenshots—bypassing traditional noisy OCR.
*   **Multilingual Intelligence**: Native support for English and Urdu with custom localized prompts for maximum accuracy.

*   **Intelligent Reasoning**: Provides concise, 3-4 line factual explanations for every classification (Fake vs. Real).
*   **Automatic RTL Support**: Dynamic UI adjustment for Urdu (Right-to-Left) ensuring a seamless user experience for regional content.
*   **Interactive Dashboard**: Real-time analytics tracking system activity, classification trends, and language distribution.
*   **Analysis History**: Persistent storage of all past checks using a lightweight, efficient SQLite database.
*   **Premium Glassmorphism UI**: A futuristic, high-end interface with smooth animations, moving backgrounds, and a responsive layout.

---

## 📱 Pages & Modules

### 1. 🏠 Home Page
The gateway to the platform, featuring a premium hero section and an overview of the verification process.
*   **Call to Actions**: Quick access to text or image analysis.
*   **Process Walkthrough**: Visual 4-step guide on how the AI verifies content.

### 2. 📝 Text Analysis
A clean, focused workspace for analyzing long-form articles or snippets.
*   **Auto-Detection**: Intelligent language detection.
*   **Responsive Input**: Optimized for both desktop and mobile text entry.

### 3. 🖼️ Image Analysis (Vision)
Upload images directly to the AI for extraction and verification.
*   **Smart Extraction**: See the text the AI "saw" in the image.
*   **Visual Preview**: Real-time image preview with glassmorphic styling.

### 4. 📊 Analytics Dashboard
A bird's-eye view of the system's performance and history.
*   **Stat Cards**: Total checks, Fake vs. Real counts, and platform activity.
*   **Recent Activity Table**: A searchable, sortable list of the most recent analysis results.

### 5. ℹ️ About & Roadmap
Details about the underlying technology and the future vision of LENS.

---

## 🛠️ Technical Stack

### **Frontend**
*   **React 18**: Component-based architecture.
*   **Tailwind CSS**: Modern, utility-first styling with custom glassmorphism.
*   **Framer Motion**: High-end micro-animations and page transitions.
*   **Lucide Icons**: Crisp, professional iconography.

### **Backend**
*   **Node.js & Express**: Scalable API architecture.
*   **SQLite**: Robust local database for history management.
*   **Multer**: Secure file handling for image uploads.

### **Intelligence (AI)**
*   **Google Gemini 2.5 Flash**: State-of-the-art LLM for zero-shot news classification and multimodal vision.
*   **Custom Prompt Engineering**: Optimized for news fact-checking and Urdu localization.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   A Google Gemini API Key (get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lens-ai.git
   cd lens-ai
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env and add your GEMINI_API_KEY=your_key_here
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🛡️ Future Roadmap
- [ ] **Live Fact-Checking API**: Integration with global fact-checking registries.
- [ ] **Browser Extension**: Verify news directly on any website with one click.
- [ ] **Deep Research Mode**: In-depth analysis of sources and linked references.
- [ ] **User Accounts**: Cloud-sync for history and personalized settings.

---
**Developed for Advanced AI Research — Empowering Truth in Media.**
