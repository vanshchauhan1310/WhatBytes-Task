# Healthcare Frontend

This is the frontend for the healthcare application, built with Next.js, TypeScript, and Tailwind CSS. It provides a modern, responsive user interface for interacting with the backend API.

## Features

-   **User Authentication:** Clean and intuitive pages for user registration and login.
-   **Protected Dashboard:** A secure, feature-rich dashboard for authenticated users to manage their patient records with full CRUD functionality.
-   **Public Doctor Directory:** A public-facing page that displays a list of all available doctors.
-   **Modern Tech Stack:** Built with Next.js for server-side rendering and static site generation, TypeScript for type safety, and Tailwind CSS for a professional and responsive design.

## Getting Started

Follow these instructions to get the frontend up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or later)
-   npm or yarn
-   A running instance of the [healthcare backend server](..).

### 1. Navigate to the Frontend Directory

From the root of the project, change into the `frontend` directory:

```bash
cd frontend
```

### 2. Install Dependencies

Install all the required npm packages:

```bash
npm install
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Important

For the application to function correctly, the backend server must be running on `http://localhost:8000`. Please make sure you have followed the setup instructions in the main project's `README.md` to get the backend running before starting the frontend development server.