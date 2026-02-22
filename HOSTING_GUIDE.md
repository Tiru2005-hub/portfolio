# Hosting Your Portfolio 🚀

Your portfolio is fully prepared for hosting. Since you now have a root `package.json`, the deployment process is extremely simple.

## Recommended: Render.com (Free & Fast)

Render is the best choice for this project because it handles the Node.js backend and serves your frontend automatically.

### 1. Prepare your GitHub Repository
- Create a new repository on GitHub (e.g., `my-portfolio`).
- Push all your files from this folder to that repository.
- **Ensure the `backend/` folder and the `package.json` in the root are included.**

### 2. Connect to Render
1. Go to [render.com](https://render.com) and sign up (connect your GitHub).
2. Click **"New +"** and select **"Web Service"**.
3. Select your portfolio repository.
4. Use these settings:
   - **Name**: `tiru-portfolio`
   - **Region**: Choose the closest one to you.
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && cd backend && npm install`
   - **Start Command**: `npm start`
5. Click **"Deploy Web Service"**.

### 3. That's It!
Render will give you a public URL like `https://tiru-portfolio.onrender.com`. 
Your `main.js` is already smart enough to detect this new URL and connect the contact form automatically!

---

### Important Checklist:
- [ ] **Resume**: Add your `Resume.pdf` to the `certificates/` folder to make the download button work.
- [ ] **GitHub Links**: Update the GitHub icons in `index.html` and `about.html` with your actual GitHub profile link.
- [ ] **Profile Photo**: Your photo `Tiru.jpg` is already integrated.

✅ **The project is 100% "Host-Ready".** Just push to GitHub and connect to Render!
