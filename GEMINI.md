
# Project Overview

This is a multi-tenant car rental application built with Next.js and TypeScript. The application is designed to display information about car rentals for different tenants, where each tenant has a unique slug. The frontend is bootstrapped with `create-next-app` and uses Tailwind CSS for styling. It fetches data from a backend API to display tenant-specific information, including vehicle listings and contact details.

## Key Technologies

*   **Framework:** Next.js 15
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Data Fetching:** Axios
*   **State Management:** Zustand (based on `package.json`)
*   **Form Handling:** React Hook Form (based on `package.json`)
*   **Schema Validation:** Zod (based on `package.json`)

## Architecture

The application follows a standard Next.js project structure.

*   **`src/app`:** Contains the main application logic, including routing and page components. The `[tenantSlug]` directory is a dynamic route that displays information for a specific tenant.
*   **`src/components`:** Reusable React components are organized into `common`, `layout`, and `sections`.
*   **`src/lib`:** Contains the API client (`api.ts`) and utility functions.
*   **`src/services`:** The `tenant.service.ts` file is responsible for fetching tenant-specific data from the backend.
*   **`src/hooks`:** The `useTenant.ts` hook likely provides an easy way to access tenant data throughout the application.
*   **`src/types`:** TypeScript type definitions for the API and tenant data.
*   **`public`:** Static assets like images and SVGs.

# Building and Running

To get the application up and running, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the development server with Turbopack at `http://localhost:3000`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```

4.  **Start the Production Server:**
    ```bash
    npm run start
    ```

5.  **Lint the Code:**
    ```bash
    npm run lint
    ```

# Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are preferred over custom CSS.
*   **API Interaction:** All interactions with the backend API are handled by the `apiClient` in `src/lib/api.ts`. Services in `src/services` should be used to interact with specific API endpoints.
*   **Types:** All data structures are strongly typed using TypeScript. Type definitions can be found in the `src/types` directory.
*   **Components:** Components are organized by their function (common, layout, sections) and should be kept small and reusable.
