# TechNova '26 — Contributor Guide
### Written for people who have never coded before. Read this fully before touching anything.

---

## The Golden Rule

> **You only ever edit one file: `constants/site-data.ts`**
>
> Everything else is already built. If you change anything outside that file without asking Talha first, you will break the site.

---

## Step 1 — Get the Code on Your Computer

Open a terminal (search "Git Bash" or "Terminal" on your computer).

```bash
# Download the project
git clone https://github.com/Talhaahmad9/technova

# Enter the project folder
cd technova

# Install everything the project needs (takes 1-2 minutes)
npm install
```

---

## Step 2 — Create YOUR Branch

A branch is your own private workspace. Your work stays separate from the main site until Talha reviews and approves it.

```bash
# Create your branch — replace "yourname" with your actual name
git checkout -b feature/dashboard-yourname
```

You only do this once. After this, all your changes automatically go to your branch.

---

## Step 3 — Start the Development Server

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000/dashboard**

You will see the dashboard. Keep this running while you work — changes appear instantly.

---

## Step 4 — Making Changes

### The ONLY file you edit: `constants/site-data.ts`

Scroll to the very bottom of this file. You will see a section that starts with:

```
// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD DATA
// All dashboard content lives here. Your teammate only edits THIS section.
```

Everything below that line is yours to edit.

### What you can safely change:

| What | Example |
|------|---------|
| Numbers | Change `'347'` to `'412'` to update registration count |
| Names | Change `'Ahmed Raza'` to a real participant name |
| Dates | Change `'2026-02-28'` to the actual date |
| Status | Change `'Pending'` to `'Confirmed'` (must be exact spelling) |
| Text | Change announcement body text |

### What you must NEVER change:

- ❌ Anything above the `// DASHBOARD DATA` comment
- ❌ File names or folder names
- ❌ Lines that start with `import`
- ❌ Lines that contain `interface` or `export interface`
- ❌ Any file in `components/`, `app/`, `hooks/`, or `app/globals.css`
- ❌ The words `as const`, `satisfies`, `readonly` — leave these exactly as they are

---

## Step 5 — Adding a New Row (e.g. a new registration)

Find the `registrations` section. It looks like this:

```ts
entries: [
  { id: 'r-1', name: 'Ahmed Raza', email: 'ahmed@iqra.edu.pk', team: 'ByteForce', competition: 'DSA Throwdown', status: 'Confirmed', registeredAt: '2026-02-28' },
  { id: 'r-2', ... },
],
```

To add a new entry, copy one line exactly, paste it below the last one, and change the values. Make sure:
1. The `id` is unique — if the last one is `r-6`, yours should be `r-7`
2. `status` must be exactly one of: `'Confirmed'` / `'Pending'` / `'Waitlisted'`
3. Each line (except the last) ends with a comma `,`

---

## Step 6 — Saving Your Work to GitHub

After making changes, run these three commands:

```bash
# Stage your changes
git add .

# Save with a message describing what you did
git commit -m "update: added 10 new registrations and updated sponsor status"

# Upload to GitHub
git push origin feature/dashboard-yourname
```

Do this every time you finish a working session. Think of it as saving your game.

---

## Step 7 — Telling Talha Your Work is Ready

1. Go to https://github.com/Talhaahmad9/technova
2. You will see a yellow banner saying your branch has recent pushes
3. Click **"Compare & pull request"**
4. Write a short description of what you changed
5. Click **"Create pull request"**

Talha will review it and either merge it or leave comments.

---

## Common Mistakes and How to Fix Them

**"The page is blank / shows an error"**
You probably have a typo in `site-data.ts`. Check:
- Every `{` has a matching `}`
- Every opening `'` has a closing `'`
- Status values are spelled exactly right (capital first letter)

To undo your last change:
```bash
git checkout -- constants/site-data.ts
```

**"npm run dev doesn't work"**
Make sure you ran `npm install` first. If still broken, call Talha.

**"I accidentally edited the wrong file"**
Run this to restore it (replace `filename` with the actual file):
```bash
git checkout -- components/SomeFile.tsx
```

---

## Theme Colors — Read Only, Never Write

The site has 5 themes controlled by CSS variables. You will never need to touch colors directly. If you need to add a colored element, use these class names exactly:

| Class | What it does |
|-------|--------------|
| `card-glass` | Semi-transparent dark card with border |
| `text-gradient` | Gradient text using the current theme accent |
| `btn-glow` | Glowing button in accent color |
| `mono` | Monospace font (JetBrains Mono) |
| `section-grid-bg` | Subtle grid background pattern |

For text colors, use these inline styles (copy-paste exactly):
```
style={{ color: 'var(--text-primary)' }}    ← main text
style={{ color: 'var(--text-muted)' }}      ← secondary text
style={{ color: 'var(--text-subtle)' }}     ← very faint text
style={{ color: 'var(--accent-glow)' }}     ← glowing accent
style={{ color: 'var(--accent-primary)' }}  ← primary accent
```

---

## Contact

If something is broken and you don't know why:
1. Don't panic
2. Run `git checkout -- constants/site-data.ts` to undo your changes
3. Message Talha with a screenshot

---

*Last updated: TechNova '26 prototype — built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion*
