# BeautyOS 💄

אפליקציית ניהול טיפוח עור (Skincare Management) בעברית, עם ממשק RTL מלא, המחוברת ל-Supabase לניהול משתמשים ונתונים.

🔗 **אתר חי:** [beautyos-drab.vercel.app](https://beautyos-drab.vercel.app)

---

## אודות הפרויקט

BeautyOS היא אפליקציית ווב המאפשרת למשתמשות לנהל את שגרת הטיפוח האישית שלהן: מעקב אחר מוצרי טיפוח, בניית שגרת יומן, קבלת התאמות אישיות לפי סוג עור ורגישויות, והתראות על רכיבים בעייתיים במוצרים.

הפרויקט פותח כפרויקט גמר, תוך שימוש בגישת פיתוח מודולרית (8 מודולים), ומדגים בניית אפליקציית React מלאה עם ניהול אימות משתמשים (Authentication), בסיס נתונים בענן, וניתוב מבוסס-הרשאות.

---

## טכנולוגיות

| קטגוריה | טכנולוגיה |
|---|---|
| Frontend Framework | React 18 |
| Build Tool | Vite 4 |
| Routing | React Router DOM 6 |
| Backend / Database | Supabase (Auth + Postgres) |
| Styling | Tailwind CSS (CDN) + CSS Variables (Design Tokens) |
| פריסה (Deployment) | Vercel |
| שפה / כיווניות | עברית, RTL מלא |
| טיפוגרפיה | DM Serif Display (כותרות), Inter (טקסט) |

---

## פיצ'רים עיקריים

- **הרשמה והתחברות** — ניהול משתמשים מלא דרך Supabase Auth (אימייל + סיסמה)
- **ניתוב מבוסס-הרשאות** — נתיבים מוגנים (Dashboard, Journal) הדורשים התחברות, עם הפניה אוטומטית ל-Login למשתמש לא מזוהה
- **Dashboard אישי** — מסך בית למשתמש מחובר
- **שאלון סוג עור (`/quiz`)** — איסוף מידע על סוג עור, רגישויות ומטרות טיפוח
- **ניהול מלאי מוצרים (Inventory)** — מעקב אחר מוצרי טיפוח אישיים
- **יומן טיפוח (Journal)** — תיעוד שגרת הטיפוח היומית
- **פרטי מוצר** — עמוד ייעודי לכל מוצר עם התראות על רכיבים (Ingredient Warning)
- **פרופיל אישי** — ניהול פרטי המשתמש

---

## מבנה נתיבים (Routing)

| נתיב | דף | הרשאה נדרשת |
|---|---|---|
| `/` | הפניה אוטומטית: מחובר → `/dashboard`, לא מחובר → `/login` | - |
| `/login` | התחברות | ציבורי |
| `/onboarding` | הרשמה | ציבורי |
| `/quiz` | שאלון סוג עור | ציבורי |
| `/dashboard` | מסך בית ראשי | מוגן 🔒 |
| `/journal` | יומן טיפוח | מוגן 🔒 |
| `/inventory` | ניהול מלאי מוצרים | ציבורי |
| `/product/:id` | פרטי מוצר | ציבורי |
| `/profile` | פרופיל אישי | ציבורי |

---

## הרצה מקומית

### דרישות מקדימות

- Node.js 18 ומעלה
- חשבון Supabase עם פרויקט פעיל

### התקנה

```bash
git clone https://github.com/Mayasason14/BEAUTYOS.git
cd BEAUTYOS/beautyos
npm install
```

### משתני סביבה

יש ליצור קובץ `.env` בתיקיית `beautyos/` עם המשתנים הבאים:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

את הערכים ניתן למצוא ב-Supabase Dashboard תחת **Project Settings → API**.

> ⚠️ קובץ ה-`.env` נמצא ברשימת ה-`.gitignore` ולא אמור להיות מועלה ל-git.

### הרצה בסביבת פיתוח

```bash
npm run dev
```

האפליקציה תרוץ בכתובת `http://localhost:5173`

### בנייה לפרודקשן

```bash
npm run build
```

הפלט ייווצר בתיקיית `dist/`.

---

## פריסה (Deployment)

הפרויקט פרוס ב-Vercel עם ההגדרות הבאות:

- **Framework Preset:** Vite
- **Root Directory:** `beautyos`
- **Build Command:** `npm run build` (ברירת מחדל)
- **Output Directory:** `dist` (ברירת מחדל)
- **Environment Variables:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

קובץ `vercel.json` מגדיר SPA fallback routing (חיוני עבור React Router עם BrowserRouter), כך שרענון ישיר של נתיב פנימי (למשל `/dashboard`) לא מחזיר שגיאת 404.

---

## מבנה הפרויקט

```
beautyos/
├── src/
│   ├── components/       # קומפוננטות משותפות (Navbar, Footer, ProductCard...)
│   ├── pages/            # דפי האפליקציה
│   ├── lib/
│   │   └── supabase.js   # אתחול לקוח Supabase
│   ├── styles/
│   │   └── globals.css   # Design tokens ועיצוב גלובלי
│   ├── App.jsx           # הגדרת הניתוב הראשי
│   └── main.jsx          # נקודת הכניסה
├── DESIGN.md             # מסמך מערכת העיצוב (צבעים, טיפוגרפיה)
├── vercel.json           # הגדרות SPA routing ל-Vercel
└── package.json
```

---

## מערכת עיצוב

ראו [DESIGN.md](DESIGN.md) לפירוט מלא של פלטת הצבעים, הטיפוגרפיה וכללי העיצוב.

---

*פותח כפרויקט גמר — Maya Sason, 2026*
