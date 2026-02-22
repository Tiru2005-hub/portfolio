# Hosting Your Portfolio 🚀

Your portfolio is prepared for hosting. Here are the recommended steps to get it live on a domain.

## Recommended: Render.com (Unified Hosting)
Since your project has both a **Frontend** and a **Backend**, the easiest way is to host the whole thing on [Render](https://render.com).

### Steps:
1. **GitHub**: Upload your `portfolio` folder to a new GitHub repository.
2. **Render Account**: Create a free account at [render.com](https://render.com).
3. **New Web Service**:
   - Click **New** -> **Web Service**.
   - Connect your GitHub repository.
   - **Root Directory**: Leave blank (root).
   - **Environment**: `Node`.
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
4. **Environment Variables**:
   - Render automatically provides a URL (e.g., `tiru-portfolio.onrender.com`).
   - Your `main.js` is already configured to automatically detect this URL!

## Custom Domain
Once hosted on Render:
1. Go to your Web Service **Settings**.
2. Scroll to **Custom Domains**.
3. Add your domain (e.g., `www.tirukrishna.com`).
4. Update your DNS settings as instructed by Render.

---

### Fixed Errors:
- ✅ **Dynamic Backend URL**: The site now automatically detects if it's running locally or on a server.
- ✅ **Backend Readiness**: The server is configured to serve your static files and handle contact form submissions.
- ✅ **Git Configuration**: Added `.gitignore` to keep your project clean.

### Pending:
- ⚠️ **Resume**: `certificates/Resume.pdf` is currently missing. Please add your resume file to that folder and rename it to `Resume.pdf` to make the download button work.
