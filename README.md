
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

```

AssistAI/
└── .github/
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        ├── feature_request.md
        └── enhancement.md
    └── PULL_REQUEST_TEMPLATE.md
├── app/                # Pages and routes (Next.js App Router)
├── components/         # Reusable UI components
├── datas/              # Static and seeded data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and DB config
├── prisma/             # Prisma schema and database config
├── public/             # Static assets like images/icons
├── actions/            # Server-side logic (API handlers)
├── middleware.ts       # Auth and route guards
├── next.config.mjs     # App configuration
└── package.json        # Dependencies and scripts

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

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub and share it with others!

---
