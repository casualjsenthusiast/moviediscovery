# 🎬 MoodFlix - TMDB Movie Discovery App

MoodFlix is a responsive Angular-based movie discovery application that fetches movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/). It allows users to explore movies based on moods (genres), search for specific titles, view movie details, add/remove from watchlist, and much more.

## 🚀 Features

- Responsive UI using **Bootstrap**
- Mood-based movie browsing (e.g., *Feel Good*, *Action Fix*, *Mind Benders*)
- Lazy-loaded landing page
- Movie detail view with:
  - Movie info
  - Cast
  - Similar movies
- Search with debounce and genre auto-detection
- Add/Remove movies from **Watchlist** using `localStorage`
- Pagination and navigation controls
- Modular standalone components (cards, headers, etc.)

## 🧰 Tech Stack

- Angular 17+
- RxJS
- Bootstrap 5
- TMDB API

## 📝 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [Angular CLI](https://angular.io/cli)

## 🔑 TMDB API Key Setup

1. Go to [TMDB Developers](https://developer.themoviedb.org/) and create an account.
2. Visit [API section](https://www.themoviedb.org/settings/api) and generate an API key (v3 auth).
3. Create a file at `src/assets/config.json`:

{
  "tmdbApiKey": "YOUR_TMDB_API_KEY",
  "tmdbBaseUrl": "https://api.themoviedb.org/3"
}

## ⚙️ Installation and Setup

1. Clone the repo
git clone https://github.com/your-username/tmdb-movie-app.git
cd tmdb-movie-app

2. Install dependencies
npm install

3. Run the application
npm run start
Visit http://localhost:4200 to view the app in your browser.

4. Run test cases
npm run test

## 📷 Screenshots
![alt text](image.png)
![alt text](image-1.png)

## ☁️ Deployment on Netlify
1. Push your code to GitHub.

2. Go to Netlify and click “Add New Site > Import from Git”.

3. Connect your GitHub account and choose your repo.

4. Set the build settings:

  - Build command: ng build --configuration production

  - Publish directory: dist/<your-app-name>/browser

5. Add a _redirects file in your src/ folder with the following content:
  ```/*    /index.html   200```

  Then, include this file in the Angular build output by updating angular.json:
  "assets": [
    "src/favicon.ico",
    "src/assets",
    "src/_redirects"
  ]

6. Rebuild and deploy automatically. Your Angular app will now be live on a Netlify URL.

Demo link: https://moviedisc.netlify.app/

## 📄 License
This project is licensed under the MIT License.