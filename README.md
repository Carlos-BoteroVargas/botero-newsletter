# Newsletter Application

This project is a React-based Newsletter application. It allows users to create, manage, and send updates via an SPA. 

The app integrates with Mapbox for location-based features.

## Live Site
[Live Newsletter](https://botero-news.netlify.com/)

## Purpose

The Newsletter application is designed to:
- Collect our Family's Highlights each year
- Send regular updates to family and friends
- Provide location-aware content using Mapbox

## Setup Instructions

1. **Clone the repository:**
   git clone https://github.com/Carlos-BoteroVargas/botero-newsletter.git cd `botero-newsletter`
2. **Install dependencies:**
   npm install
3. **Configure environment variables:**
    - Create a `.env.local` file in the root directory.
    - Add your Mapbox token:
      ```
      VITE_MAPBOX_TOKEN=<mapbox_token_here>
      ```

4. **Run the application:**
   npm run dev
5. **Open in your browser:**
    - Visit `http://localhost:5173` (or the port shown in your terminal).

## Technologies Used

- React
- Vite
- Mapbox
- npm

## License

MIT