
# 🤖 AssistAI

An AI-powered assistant to supercharge your **career journey** — from building professional resumes and prepping for interviews to gaining real-time job market insights.

🌐 **Live Demo**: [assist-ai-henna.vercel.app](https://assist-ai-henna.vercel.app)

---

## 🚧 Features

- 📝 **Resume & Cover Letter Generator** – Create polished documents with just a few inputs.
- 💼 **Interview Preparation** – Practice with AI-generated MCQs tailored to your role.
- 📊 **Job Market Dashboard** – Personalized data and insights on job trends.
- 🛠 **AI Utilities** – Tools that automate and simplify the job-seeking process.

---

## 🛠 Tech Stack

| Tool | Tech |
|------|------|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="24" /> | **Next.js** – React framework |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="24" /> | **Tailwind CSS** – Utility-first styling |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="24" /> | **PostgreSQL** – Database |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="24" /> | **Prisma** – Type-safe ORM |
| <img src="https://avatars.githubusercontent.com/u/928394?s=200&v=4" width="24" /> | **Clerk** – Authentication |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" width="24" /> | **Vercel** – Hosting & deployment |

---

## 📁 Project Structure

```plaintext
assist-ai/                   # Root project folder
├─ .github/                  # GitHub-related configuration
│  ├─ ISSUE_TEMPLATE/        # Templates for GitHub issues
│  ├─ workflows/             # GitHub Actions workflows
│  └─ PULL_REQUEST_TEMPLATE.md  # PR template
├─ actions/                  # Custom GitHub or Next.js actions
├─ app/                      # Main application folder
│  ├─ authR/                 # Authentication-related routes
│  └─ mainR/                 # Main routes
├─ api/                      
│  └─ inngest/               # API routes for Inngest integration
├─ components/               # React components
├─ datas/                    # Data files / JSON / static data
├─ hooks/                    # Custom React hooks
├─ lib/                      # Utility functions or libraries
├─ prisma/                   # Prisma ORM related files
│  ├─ migrations/            # Database migrations
│  └─ schema.prisma          # Prisma schema
├─ public/                   # Public assets (images, fonts, favicon)
│  └─ favicon.ico            # Favicon file
├─ _not-found.jsx            # 404 page
├─ globals.css               # Global CSS styles
├─ layout.js                 # Main layout component
├─ page.js                   # Main page entry
├─ components.json           # Component configuration JSON
├─ eslint.config.mjs         # ESLint configuration
├─ jsconfig.json             # JS/TS configuration for paths
├─ middleware.js             # Middleware for app
├─ next.config.mjs           # Next.js configuration
├─ package-lock.json         # npm lock file
├─ package.json              # npm package file
├─ postcss.config.mjs        # PostCSS configuration
├─ vercel.json               # Vercel deployment configuration
├─ .gitignore                # Files/folders to ignore in git
├─ LICENSE                   # License file
├─ CONTRIBUTING.md           # Contribution guidelines
└─ README.md                 # Project README file

````

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/soumyo-jeet/AssistAI.git
cd AssistAI
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root and configure the required keys:

```env
DATABASE_URL=your_postgres_url
CLERK_API_KEY=your_clerk_key
...
```

### 4. Start the development server

```bash
npm run dev
```

Go to `http://localhost:3000` to view the app.

---

## 👥 Contributing
Please go through [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
You are free to use, modify, and distribute this project for personal or commercial purposes.

---

## 👤 Maintainer

**Developed by:**
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/soumyo-jeet">
        <img src="https://avatars.githubusercontent.com/u/181663403?s=400&u=edf6cd127172b4ab44b923ce66203cee26917073&v=4" width="80;" alt="Soumyo Jeet"/>
        <br />
        <p><b>Soumyo Jeet</b></p>
      </a>
    </td>
</table>

---


## ✨ Contributors

#### Thanks to all the wonderful contributors 💖

<a href="https://github.com/soumyo-jeet/assist-ai/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=soumyo-jeet/assist-ai" />
</a>

#### See full list of contributor contribution [Contribution Graph](https://github.com/soumyo-jeet/assist-ai/graphs/contributors)  

---

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub and share it with others!

---
