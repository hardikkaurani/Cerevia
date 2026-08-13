@echo off
setlocal

:: Clear the invalid GITHUB_TOKEN so gh uses keyring
set GITHUB_TOKEN=
set GH_TOKEN=

:: Try to create PR using gh with explicit token from keyring
for /f "tokens=*" %%i in ('gh auth token -h github.com 2^>nul') do set GH_AUTH_TOKEN=%%i

if not defined GH_AUTH_TOKEN (
    echo ERROR: Could not get GitHub token from keyring
    exit /b 1
)

curl -s -X POST ^
  -H "Accept: application/vnd.github+json" ^
  -H "Authorization: Bearer %GH_AUTH_TOKEN%" ^
  -H "X-GitHub-Api-Version: 2022-11-28" ^
  https://api.github.com/repos/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia/pulls ^
  -d "{\"title\":\"fix: Realistic Profile Stats + Working Difficulty Filters\",\"head\":\"feature/pr-13-stats-and-filters-fix\",\"base\":\"main\",\"body\":\"## What This PR Fixes\n\n### 1. Study Time - Realistic Hours\n- **Before**: completedModules * 8.1 = 16.2 hours for 2 lessons (unrealistic)\n- **After**: completedModules * 1.5 = 3.0 hours (realistic)\n\n### 2. Labs Submitted - Accurate Count\n- **Before**: completedModules * 3 = 6 Submitted (inflated 3x)\n- **After**: completedModules = 2 Submitted (real count)\n\n### 3. Difficulty Filters - Now Working\n- **Root Cause**: Buttons used UPPERCASE but DB stores title case\n- **Fix**: Changed filter values to match database values\n\n## Files Changed\n| File | Change |\n|------|--------|\n| ProfileOverviewStats.tsx | Fixed study hours (8.1x to 1.5x) and labs submitted (3x to 1x) |\n| lessons/page.tsx | Fixed difficulty filter case mismatch (BEGINNER to Beginner) |\n\n## Testing\n- Study time shows realistic values\n- Labs submitted matches actual count\n- All difficulty filter buttons work properly\"}"
