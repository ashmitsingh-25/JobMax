# Rule: Automatic GitHub & Vercel Synchronization

Always automatically stage, commit, and push all file changes, additions, and updates made in this repository to the remote GitHub repository (`https://github.com/ashmitsingh-25/JobMax.git` on branch `main`), which automatically triggers production deployments on Vercel.

## Required Workflow:
1. Whenever any task modifies, adds, or fixes files, code, tests, or configurations in this workspace:
   - Run verification (e.g., tests or build check).
   - Stage all relevant changes: `git add .`
   - Commit with a clear, descriptive message: `git commit -m "<Descriptive message>"`
   - Push immediately to GitHub: `git push origin main`
2. **Vercel Automatic Deployment**:
   - Because the Vercel project is connected to this GitHub repo, every push to `main` automatically triggers Vercel CI/CD to build and publish the latest commit.
   - If a `VERCEL_DEPLOY_HOOK_URL` is set in environment or config, ping it via HTTP POST as an immediate deploy trigger.
3. Never finish a user request with uncommitted or unpushed changes in the working tree.
4. Keep `.gitignore` strictly adhered to (`node_modules`, `.env`, `.vercel` ignored).

