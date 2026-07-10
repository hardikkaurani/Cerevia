## Overview

This Pull Request implements the complete **User Profile Management** module for **Cerevia**. It enables authenticated users to retrieve and update their personal profiles (`fullName`, `avatar`, and `bio`) securely while enforcing authorization, validating inputs using Zod, and generating the necessary schema migrations.

---

## Scope of Changes

1. **Database Schema & Migrations**
   - **`prisma/schema.prisma`**: Appended an optional `bio` field (`String?`) to the `User` model.
   - **`prisma/migrations/20260710044120_add_bio_to_user`**: Automatically generated migration sql to add the new `bio` column to the `User` table.

2. **Validation (`src/lib/validation/profile.ts`)**
   - **`updateProfileSchema`**: Defines Zod validations for profile updates:
     - `fullName`: String, min 2, max 100 characters (optional).
     - `avatar`: String, valid URL or null/empty string (optional).
     - `bio`: String, max 500 characters or null/empty string (optional).

3. **Service Layer (`src/lib/services/profile.ts`)**
   - **`getUserProfile(userId)`**: Safely resolves the profile from the database, omitting password hashes.
   - **`updateUserProfile(userId, data)`**: Checks for account existence, updates field values, and returns the modified profile.

4. **API Route Handler (`src/app/api/user/profile/route.ts`)**
   - **`GET`**: Resolves current authenticated session details and retrieves profile metadata.
   - **`PUT`**: Validates request parameters and updates profile values.

5. **Validation Testing (`tests/profile.test.ts`)**
   - Implements a self-contained integration test script to verify profile fetching, updates, and validation logic (invalid URL, long bios) against the database.

6. **Documentation & README**
   - Appended a detailed **👤 User Profile Management** section to the `README.md` detailing endpoint structures and validation guidelines.

---

## API Endpoints

*   **`GET /api/user/profile`**:
    *   **Authorization**: Bearer Token
    *   **Response (200 OK)**: Returns the user object (id, email, fullName, avatar, bio, totalXP, currentStreak, maxStreak, createdAt, updatedAt).
*   **`PUT /api/user/profile`**:
    *   **Authorization**: Bearer Token
    *   **Payload**:
        ```json
        {
          "fullName": "Jane Doe",
          "avatar": "https://example.com/jane.png",
          "bio": "Software developer & language enthusiast"
        }
        ```
    *   **Response (200 OK)**: Returns the updated user profile object.
    *   **Response (400 Bad Request)**: Validation error details if inputs are misconfigured.

---

## Validation & Code Quality Checks
*   **ESLint**: Verified all files with `npm run lint` - 0 errors/warnings.
*   **Prettier**: Ran code formatter on all source code files.
*   **Next.js Production Build**: Executed `npm run build` successfully to guarantee type safety and compilation correctness.
