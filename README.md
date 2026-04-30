# ExamVault — Premium Exam Paper Archive (Frontend) 📚✨

ExamVault is a state-of-the-art, high-performance web platform designed to provide students with seamless access to previous year question papers, sample papers, and academic notes. This repository contains the **Frontend** of the application.

![ExamVault Preview](https://via.placeholder.com/1200x600/0d1117/f0b429?text=ExamVault+Premium+UI)

## 🌟 Key Features
- **Premium Aesthetics**: A stunning "Glassmorphic" dark theme with gold accents and smooth micro-animations.
- **Dynamic Filtering**: Instantly filter papers by Year, Subject, and Paper Type with zero-flicker transitions.
- **University & School Modes**: Intelligent multi-step wizard tailored for both School Boards and University Students.
- **Instant PDF Preview**: View question papers directly in the browser with a high-definition overlay.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop viewing.

## 🛠️ Tech Stack
- **Structure**: Semantic HTML5
- **Logic**: Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS3 (Variables, Flexbox, Grid)
- **Deployment**: Optimized for **Vercel**

## 🚀 Quick Start (Deployment)

### 1. Configure the API
Open `js/api.js` and ensure the `API_BASE` points to your live **Render Backend URL**:
```javascript
const API_BASE = 'https://your-backend-on-render.com';
```

### 2. Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import the repo into [Vercel](https://vercel.com).
3. Vercel will automatically detect the `vercel.json` and deploy the site.

## 📁 Project Structure
- `index.html`: The main entry point.
- `css/style.css`: The entire design system and glassmorphic styles.
- `js/api.js`: Handles API communication and state management.
- `js/ui.js`: Manages dynamic component rendering and animations.
- `vercel.json`: Optimized hosting configuration for Vercel.

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
**Designed with ❤️ by the ExamVault Team**
