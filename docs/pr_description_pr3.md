## Overview

This Pull Request establishes the complete relational database foundation for **Cerevia** using **PostgreSQL** and **Prisma ORM**. It implements all primary models required for progress tracking, user streaks, XP, weekly leaderboards, and an extensible achievements/badge system.

---

## Scope of Changes

1. **Prisma Dependencies & Config Setup**
   - Installed and configured Prisma CLI & Client (`v5.22.0`).
   - Integrated `tsx` devDependency to execute TypeScript files (like the seed script) without compilation steps.
   - Configured `prisma.seed` inside `package.json` to enable automated seeding.

2. **Schema & Model Implementations (`prisma/schema.prisma`)**
   - **`User`**: Enhanced with authentication support (`password`), profiles (`fullName`, `avatar`), experience tracking (`totalXP`), and streak indicators (`currentStreak`, `maxStreak`, `lastActivityAt`).
   - **`Lesson`**: Includes metadata, difficulty indicators (`Beginner`, `Intermediate`, `Advanced`), and XP rewards (`xpReward`).
   - **`LessonProgress`**: Refactored from the previous placeholder to capture lesson completion events, forming a many-to-many relationship.
   - **`Achievement` & `UserAchievement`**: Established a reusable badge system supporting unlock dates and rewards.
   - **`Leaderboard`**: Replaced the transient `LeaderboardCache` with weekly historical snapshots tracking user points and ranks for any given week and year.

3. **Database Migrations**
   - Generated and executed the initial migration `20260709190943_init` using Prisma Migrate.

4. **Idempotent Seed Script (`prisma/seed.ts`)**
   - Developed a robust seed script populating default, static lessons into the database. It uses `upsert` to guarantee execution safety on repeated runs.

5. **Refactored Core Logic (`src/lib/streak-manager.ts`)**
   - Updated the complete business transactions (e.g. `completeLesson`, `refreshLeaderboardCache`) to interact with the new model structure and property names (`xpReward`, `LessonProgress`, `Leaderboard`).

---

## Detailed Model Architecture & Relationships

### 1. Model Definitions
*   **User**:
    *   `id`: `String` (UUID primary key)
    *   `email`: `String` (unique identifier)
    *   `fullName`: `String?`
    *   `password`: `String` (salted password hash)
    *   `avatar`: `String?` (avatar URL)
    *   `currentStreak`: `Int` (consecutive activity days)
    *   `maxStreak`: `Int` (longest streak milestone)
    *   `totalXP`: `Int` (accumulated XP points)
    *   `lastActivityAt`: `DateTime?`
*   **Lesson**:
    *   `id`: `String` (UUID primary key)
    *   `title`: `String`
    *   `description`: `String?`
    *   `xpReward`: `Int` (XP rewarded to users upon completion)
    *   `difficulty`: `String` (Beginner, Intermediate, Advanced)
*   **LessonProgress**:
    *   `id`: `String` (UUID primary key)
    *   `userId` & `lessonId`: Foreign keys referencing User and Lesson.
    *   `completedAt`: `DateTime` (timestamp of completion)
*   **Achievement**:
    *   `id`: `String` (UUID primary key)
    *   `title`: `String` (unique badge title)
    *   `description`: `String`
    *   `badgeIcon`: `String` (icon asset identifier)
    *   `xpReward`: `Int` (XP awarded for unlocking the achievement)
*   **UserAchievement**:
    *   `id`: `String` (UUID primary key)
    *   `userId` & `achievementId`: Foreign keys mapping users to earned achievements.
    *   `unlockedAt`: `DateTime` (timestamp of unlock)
*   **Leaderboard**:
    *   `id`: `String` (UUID primary key)
    *   `userId`: Foreign key mapping to User.
    *   `score`: `Int` (total points earned during the target week)
    *   `rank`: `Int` (computed placing)
    *   `week` & `year`: `Int` (ISO 8601 week tracking for persistent snapshots)

### 2. Relationship Schema
*   **User ➔ LessonProgress** (`1:N`): A user has multiple lesson progress completions.
*   **Lesson ➔ LessonProgress** (`1:N`): A lesson has progress records for different users.
*   **User ➔ UserAchievement ➔ Achievement** (`N:M`): Joint relationships mapping unlocked achievements/badges to users.
*   **User ➔ Leaderboard** (`1:N`): A user can have multiple leaderboard historical rows representing distinct weeks.

---

## Migration and Seeding Strategies

*   **Migration**: Applied standard schema tracking via Prisma Migrate:
    - Running `npx prisma migrate dev` creates a migration tracking directory under `prisma/migrations` and builds the SQL schema file.
*   **Seeding**: Configured to run `npx prisma db seed` which invokes `tsx prisma/seed.ts`. It upserts core static lesson details, securing reference integrity across environments.

---

## Verification Completed

- All database models compile successfully and the Prisma client was generated.
- Initial migrations and DB seeding commands executed and verified against a running local PostgreSQL instance.
- Verified Next.js production build passes with `exit code 0`.
- Verified Prettier and ESLint formatting and checks return zero warnings/errors.
