# News Portal (TypeScript Edition)

A responsive single-page application for browsing world news headlines by source channel, migrated from JavaScript to TypeScript as part of the RS School task.

## Key Features & Improvements

-   **Fully Migrated to TypeScript**:
    -   Enums (`Endpoint`, `HttpStatus`, `HttpMethod`, `ResponseStatus`)
    -   Strict Object Interfaces (`ISource`, `IArticle`, `INewsResponse`, `ISourcesResponse`, etc.)
    -   Generics in HTTP loader and callbacks (`<T>`)
    -   Access Modifiers (`private`, `protected`, `public`, `readonly`)
    -   Utility Types (`Pick`, `Readonly`, `Partial`)
    -   Union Types (`Endpoint | string`, `NullableString`)
    -   Strict compiler mode with `"noImplicitAny": true` and `"strict": true`
    -   Zero use of `any` across the entire codebase (`@typescript-eslint/no-explicit-any` enabled)
-   **Enhanced Design & UX**:
    -   Fully adaptive layout supporting viewport widths from **320px to 1920px**
    -   Real-time search filter for news sources
    -   Interactive source pills with active state indication
    -   Responsive news cards with hover effects, readable typography, and fallback image preview
    -   Structured footer featuring RS School logo and link, author GitHub link, and creation year (2026)
    -   Automatic fallback to proxy mock endpoints (`https://rss-news-api.onrender.com/mocks/`) when deployed without an API key

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   npm

### Installation

1. Clone repository and navigate to project folder:

    ```bash
    git clone git@github.com:Stanovyi/news-JS.git
    cd news-JS
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. (Optional) Configure environment variables:
   Copy `.env.example` to `.env` and provide your [News API](https://newsapi.org/) key:
    ```env
    API_URL=https://newsapi.org/v2/
    API_KEY=your_api_key_here
    ```
    > **Note:** If no `.env` or `API_KEY` is provided, the application automatically falls back to the public RS School proxy mock endpoints, allowing full testing of functionality without API key restrictions.

### Available Scripts

-   **`npm start`**: Runs Webpack development server with hot reload (`http://localhost:8080/`)
-   **`npm run build`**: Compiles production-ready bundle into the `dist/` directory
-   **`npm run lint`**: Checks TypeScript source code for formatting and lint rules using ESLint
