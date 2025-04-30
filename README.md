# 📦 SignalPet Home Assignment

A modern web application built with **Next.js 15** and **TypeScript**, offering dynamic report generation and multilingual support.

---

## 🚀 Features

- **Server-Side Rendering (SSR)** for improved performance and SEO
- **Dynamic Report Generation** functionality
- **Automated Report Translation** via LibreTranslate
- **Cost efficient translation** (batch sending && caching [with ttl])
- **Browser Language Detection** to auto-select the preferred language
- **Language Persistence** – remembers your last used language
- **Full TypeScript Support** for safer, scalable code

---

## 🛠️ Getting Started

### 1. Install Dependencies

To get started with the project, run the following command to install the required dependencies:

```bash
npm install
```

### 2. Configure Environment Variables
Create a .env file in the project root directory and set up the necessary environment variable:
```.dotenv
# LibreTranslate service URL (ensure LibreTranslate is running)
LIBRETRANSLATE_URL=http://localhost:5001
```
Make sure LibreTranslate is available and running locally or remotely.


### Run the Development Server
```bash
npm run dev
```
Once the server starts, open your browser and navigate to http://localhost:3000 to see the app in action.


## 📚 Additional Notes
- This project relies on LibreTranslate for translation functionality. You can deploy it locally or connect to a hosted instance.
- Built with the latest features of Next.js 15 for optimal performance.
- Supports TypeScript, ensuring type safety across the codebase.

