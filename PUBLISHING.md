# How to Publish Your Node.js/Discord OAuth Project to GitHub

## 1. Prepare Your Project
Make sure your project folder includes:
- Your main server file (e.g., `server.js` or `app.js`)
- `package.json`
- Any public, view, or config files
- A `.gitignore` file (see below)
- A `README.md` file describing your project

## 2. Initialize Git (if not already)
Open a terminal in your project folder and run:
```sh
git init
git add .
git commit -m "Initial commit"
```

## 3. Create a New Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new)
2. Name your repository (e.g., `discord-oauth-dashboard`)
3. Add a description
4. Keep it public (recommended)
5. Do **not** initialize with README (you already have one)

## 4. Link Local Repo to GitHub
Replace `yourusername` and `your-repo` with your info:
```sh
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

## 5. Add a `.gitignore`
Create a file named `.gitignore` and add:
```
node_modules/
.env
```

## 6. Add a `.env.example`
Create a file named `.env.example` to show required environment variables (never upload your real `.env`):
```
CLIENT_ID=your_discord_client_id
CLIENT_SECRET=your_discord_client_secret
REDIRECT_URI=your_redirect_uri
```

## 7. Push Updates
After making future changes:
```sh
git add .
git commit -m "Describe your changes"
git push
```

## 8. Share Your Repo!
Your project is now live at:
```
https://github.com/yourusername/your-repo
```

---

**Tip:**  
Never upload your real `.env` file or any secrets!