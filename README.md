# Headless WordPress Frontend

A simple React + Tailwind CSS frontend that loads posts from a WordPress site through the REST API. Each post is shown as a card with its featured image, title and content, in a 3-column grid (1 column on phones, 2 on tablets).

## Tech stack

- React 19 (Create React App)
- Tailwind CSS 3
- WordPress REST API (`/wp-json/wp/v2/posts?_embed`)

## Project structure

```
frontend/
├── public/                     # index.html, favicon, manifest
├── src/
│   ├── components/
│   │   └── Posts/
│   │       └── Posts.js        # Fetches posts and renders the card grid
│   ├── App.js                  # Page layout
│   ├── index.js                # React entry point
│   └── index.css               # Tailwind directives + base styles
├── .env.example                # Template for environment variables
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Requirements

- Node.js 18 or newer and npm
- A running WordPress site (for example a [Local](https://localwp.com/) site at `http://cms.local`) with at least one published post

## Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Point the app at your WordPress site

Copy the example env file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and set your WordPress URL (no trailing slash):

```
REACT_APP_WP_API_URL=http://cms.local
```

If `.env.local` is missing, the app falls back to `http://cms.local`.

### Step 4: Start the development server

```bash
npm start
```

Open http://localhost:3000 to see the posts.

### Step 5: Build for production (optional)

```bash
npm run build
```

The optimized files go to the `build/` folder. Upload them to any static host (Netlify, Vercel, GitHub Pages, etc.).

## WordPress notes

- **Featured images:** the `?_embed` query parameter makes WordPress include each post's featured image in the response. Posts without one show a "No image" placeholder.
- **Number of posts:** the REST API returns 10 posts by default. To change that, add `&per_page=12` to the fetch URL in `src/components/Posts/Posts.js`.
- **CORS:** if the frontend runs on a different domain than WordPress and the request is blocked, allow the frontend origin in WordPress (for example with a CORS plugin or a `rest_pre_serve_request` filter).

## Available scripts

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm start`     | Runs the dev server on port 3000     |
| `npm run build` | Creates a production build in `build/` |
