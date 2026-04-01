# CLAUDE.md — NeuroD Waitlist
### Launch page + interactive prototype + email capture
### Goal: deploy to Vercel today, share on social media, capture interest

---

## 0. What This Is

A single-purpose PWA: convince people NeuroD is worth waiting for,
let them explore an interactive prototype of the app, and capture
their email for the waitlist. That's it. Nothing else.

This is NOT the full app. This is the launch page that validates demand.

**Three things happen on this site:**
1. Visitor reads what NeuroD does (30 seconds)
2. Visitor taps through the interactive prototype to experience it (2 minutes)
3. Visitor joins the waitlist with their email (10 seconds)

**Reference file:** `PROTOTYPE.html` in the root of this repo contains
the complete interactive prototype with all 17 screens. Use it as the
definitive reference for layout, content, colours, components, and UX flow.
Open it in a browser and click through every screen before writing any code.

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Vercel-native, fast deploy |
| Styling | **Tailwind CSS 4** | Utility classes, no config overhead |
| Fonts | **Fraunces** (headings) + **DM Sans** (body) | From Google Fonts, same as prototype |
| Email capture | **Supabase** (Postgres table + insert) | Free tier, instant setup, scales |
| Analytics | **Vercel Analytics** (optional) | Zero-config if on Vercel |
| PWA | `manifest.json` + meta tags | Installable, shareable |
| Deployment | **Vercel** | Push to deploy |
| Animations | **CSS only** | No JS animation libraries needed |

**No auth. No user accounts. No AI API calls. No complex backend.**
One Supabase table, one API route, one landing page with embedded prototype.

---

## 2. Repository Structure

```
neurod-waitlist/
├── CLAUDE.md                       ← you are here
├── PROTOTYPE.html                  ← interactive reference (open in browser)
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── .env.local
│
├── public/
│   ├── manifest.json
│   ├── favicon.ico
│   ├── og-image.png               ← Social sharing image (1200×630)
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── fonts/                      ← Self-host if preferred
│
├── app/
│   ├── layout.tsx                  ← Root layout, fonts, meta tags, PWA head
│   ├── page.tsx                    ← THE landing page (everything lives here)
│   ├── globals.css                 ← Tailwind + custom CSS vars + animations
│   └── api/
│       └── waitlist/
│           └── route.ts            ← POST: save email to Supabase
│
├── components/
│   ├── landing/
│   │   ├── Hero.tsx                ← "Your mind, understood" + CTA
│   │   ├── Problem.tsx             ← "1 in 8 people" stats section
│   │   ├── ThreeCapabilities.tsx   ← The 3 AI features (user language)
│   │   ├── InteractiveDemo.tsx     ← Embedded prototype (phone frame)
│   │   ├── HowItWorks.tsx          ← Tech explainer (3 AI types, honest)
│   │   ├── Principles.tsx          ← 5 design principles
│   │   ├── WaitlistForm.tsx        ← Email capture + counter
│   │   ├── FAQ.tsx                 ← Expandable questions
│   │   └── Footer.tsx              ← Links, legal, credits
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       └── Accordion.tsx
│
└── lib/
    ├── supabase.ts                 ← Supabase client (server-side only)
    └── waitlist.ts                 ← Validation + insert logic
```

---

## 3. Environment Variables

```bash
# .env.local
# Supabase — free tier project, one table
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Optional: Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...
```

Only two required vars. The Supabase anon key is NOT needed —
we use the service role key server-side only for the waitlist insert.
No client-side Supabase exposure.

---

## 4. Supabase Setup

### One table. That's the entire backend.

```sql
-- Run this in the Supabase SQL editor

CREATE TABLE waitlist (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  source      text DEFAULT 'website',        -- 'website', 'twitter', 'linkedin', etc.
  neuro_type  text,                           -- optional: what they selected
  created_at  timestamptz DEFAULT now()
);

-- Index for fast duplicate check
CREATE INDEX idx_waitlist_email ON waitlist (email);

-- Enable RLS but allow service role inserts only
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- No public read/write policies — only service role can insert
-- This means nobody can read the waitlist from the client
```

### Waitlist counter view (optional, for showing "X people joined")

```sql
CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS integer AS $$
  SELECT count(*)::integer FROM waitlist;
$$ LANGUAGE sql SECURITY DEFINER;
```

---

## 5. API Route — Waitlist Signup

```typescript
// app/api/waitlist/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email, source, neuroType } = await req.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Insert (UNIQUE constraint handles duplicates)
    const { error } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        source: source || 'website',
        neuro_type: neuroType || null,
      })

    if (error) {
      if (error.code === '23505') {
        // Duplicate — still treat as success (don't reveal existing emails)
        return NextResponse.json({ success: true, message: "You're on the list." })
      }
      throw error
    }

    // Get count for social proof
    const { data: countData } = await supabase.rpc('get_waitlist_count')

    return NextResponse.json({
      success: true,
      message: "You're on the list.",
      count: countData || null,
    })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
```

---

## 6. The Landing Page — Section by Section

### READ THE PROTOTYPE FIRST
Open `PROTOTYPE.html` in a browser. Click through all 17 screens.
The landing page content is derived from Screens 0, 13, 14, 15, 16
of the prototype. The interactive demo embeds Screens 0–11.

### Design Direction

**Aesthetic:** Editorial warmth meets clinical trust. Think Stripe's clarity
crossed with a wellbeing brand's softness. The cream background (#FAF8F4)
is essential — it separates NeuroD from every clinical-white health app.

**Fonts:** Fraunces (serif, editorial, warm) for headings.
DM Sans (clean, readable) for body. Same as the prototype.

**Colour palette:** (from PROTOTYPE.html CSS variables)
```css
:root {
  --cream: #FAF8F4;
  --purple: #6D28D9;
  --purple-light: #EDE9FE;
  --purple-mid: #8B5CF6;
  --teal: #0D9488;
  --teal-light: #CCFBF1;
  --amber: #D97706;
  --amber-light: #FEF3C7;
  --text-dark: #1C1917;
  --text-mid: #44403C;
  --text-soft: #78716C;
  --text-muted: #A8A29E;
  --border: #E7E5E4;
  --border-soft: #F5F5F4;
}
```

**Critical rule:** Do NOT default to purple-gradient-on-white. The cream
background and editorial serif font are what make this feel designed,
not generated. Maintain this distinction throughout.

---

### Section 1: Hero

```
Layout: Full viewport height. Centred content. Cream background.
Celebration banner at top (same as prototype Screen 5):
  ♾️ Neurodiversity Month · Celebrating different minds

Heading (Fraunces, ~42px desktop / 28px mobile):
  "Your mind, understood.
   Not fixed — supported."

Subheading (DM Sans, 18px, --text-mid):
  "Mental illness affects 1 in 8 people globally. Care is reactive,
   generic, and scarce. NeuroD learns your patterns, finds the real
   causes, and builds a plan that fits your brain."

Primary CTA:
  [Join the waitlist — it's free]  ← scrolls to waitlist form

Secondary CTA:
  [See how it works ↓]  ← scrolls to interactive demo

Bottom line (small, muted):
  "Launching 2026 · Free forever · No ads · Your data stays yours"
```

Entrance animation: staggered fade-up (same as prototype).
The hero must feel calm and confident, not salesy.

### Section 2: The Problem (Stats)

```
Layout: Full width, subtle background shift (slightly darker cream or white).

Three stat cards in a row (stack on mobile):

Card 1:
  "1 in 8"
  "people globally have a mental health condition"
  Source: WHO, 2022

Card 2:
  "75%"
  "receive no treatment at all"
  Source: The Lancet Commission

Card 3:
  "92%"
  "of mental health apps are abandoned within 2 weeks"
  Source: ORCHA/Lancet Digital Health

Below the cards:
  "NeuroD is built differently. Here's why people stay."
```

These stats ground the landing page in reality.
They justify why NeuroD exists. Keep them factual, no embellishment.

### Section 3: Three Capabilities

**CRITICAL: Use the user-facing language, not AI jargon.**
This content comes directly from prototype Screen 0.

```
Section heading (Fraunces):
  "Three things no other app does"

Card 1: "Spots what you can't see yet"
  Icon: Waveform/trend SVG (same as prototype)
  Body: "NeuroD watches patterns in your mood, sleep, and energy —
         and notices when something shifts before it becomes a problem."
  Tag: Works offline · Runs on your device

Card 2: "Finds the real why"
  Icon: Connected nodes SVG (same as prototype)
  Body: "Not just 'you feel low' — traces the chain. Office noise →
         poor sleep → social withdrawal → mood crash. NeuroD finds
         the first domino."
  Tag: Gets smarter over time · Honest about uncertainty

Card 3: "Builds a plan that fits your brain"
  Icon: Document SVG (same as prototype)
  Body: "Every recommendation adapts to your neuro profile, your
         energy today, and what actually works for people like you.
         Not generic advice — yours."
  Tag: Strength-first · Never pathologising
```

Each card should animate in on scroll (intersection observer, staggered).

### Section 4: Interactive Demo (The Star Feature)

This is what will make people share the page. An embedded,
clickable prototype inside a phone frame.

```
Section heading:
  "Try it yourself"
  Subtitle: "This is a working prototype. Tap through Alex's
             experience — from check-in to insights to care plan."

Phone frame:
  - A phone-shaped container (max-width 380px, ~720px tall)
  - Rounded corners, subtle shadow, dark bezel
  - Inside: the prototype screens rendered as React components
  - NOT an iframe of the HTML file — rebuild the screens as React
    components using the prototype as the exact reference

The demo includes these screens from the prototype:
  Screen 0: Landing (adapted as "demo start" — skip the real landing CTA)
  Screen 1-3: Profile setup
  Screen 4: Profile created
  Screen 5: Dashboard
  Screen 6: Quick pulse check-in
  Screen 7: Detailed check-in
  Screen 8: Insights (Early Signals + Root Causes)
  Screen 9: Care plan
  Screen 10: AI Chat (with canned responses, same as prototype)
  Screen 11: Crisis screen
  Screen 13: How NeuroD Works

Navigation: Same as prototype — tappable buttons, tab bar, back arrows.
Screen transitions: Same slide animation as the prototype.

Below the phone frame:
  Small label: "This is a prototype. The real app launches in 2026."

After the demo:
  [I want this → Join the waitlist]  ← scrolls to form
```

**Implementation note:** Rebuild each prototype screen as a React component.
Do NOT use an iframe. The screens need to be responsive within the phone
frame and the interactions need to feel native.

Copy all screen content, styling, and interactions exactly from PROTOTYPE.html.
The prototype is the source of truth for:
- Every piece of text
- Every colour and spacing value
- Every component style (pills, cards, mood grid, causal chain, etc.)
- Every interaction (pill toggle, sleep select, mood select, chat responses)
- Tab bar navigation
- Screen transition animations

### Section 5: How It Works (Tech Explainer)

This section is for the curious — people who want to know what's
under the hood. Content from prototype Screen 13.

```
Section heading:
  "Three kinds of AI. One goal: understanding you."

Three expandable cards (default: collapsed, first one open):

Card 1: "Pattern Recognition AI"
  Subline: "Powers 'Early Signals'"
  Content: [from prototype Screen 13 — the pattern recognition section]
  Badge: "Runs on your device · Works offline"

Card 2: "Causal Analysis AI"
  Subline: "Powers 'Root Causes'"
  Content: [from prototype Screen 13 — the causal section]
  Include: The progressive timeline dots (14 → 30 → 60 → 60+ days)
  Badge: "Progressive · Honest · No fake insights"

Card 3: "Generative AI"
  Subline: "Powers 'Your Plan' & Chat"
  Content: [from prototype Screen 13 — the generative section]
  Badge: "Powered by Claude (Anthropic)"

Bottom text:
  "Together, these three do something none can do alone.
   Pattern recognition spots the signal. Causal analysis
   finds the lever. Generative AI puts it in your hands."
```

### Section 6: Principles

From prototype Screen 14. Five cards.

```
Section heading:
  "Built on five promises"

1. "Strengths first, always"
   → Every plan starts with what you're good at.

2. "Honest AI"
   → Not enough data? We say so. No fake insights.

3. "The 3am test"
   → Every feature works when you have nothing left to give.

4. "Your data is yours"
   → Encrypted. Never sold. Delete with one button.

5. "No shame mechanics"
   → No streaks. No badges. No guilt.
```

### Section 7: Waitlist Form (Primary Conversion Point)

This section appears twice: once here, and the hero CTA scrolls to it.

```
Section heading (Fraunces):
  "Be the first to try NeuroD"

Subtitle:
  "Join the waitlist. We'll let you know when it's ready.
   No spam — just one email when we launch."

Form:
  [Email input field]   [Join the waitlist →]

  Optional (below the form, not required):
  "I identify as:" (pill selector, multi-select, all optional)
    ADHD · Autistic · AuDHD · Dyslexia · Dyspraxia ·
    Tourette's · Sensory SPD · Not sure yet · Just exploring ·
    Supporting someone · Professional/clinician

After submission — replace form with:
  ✓ "You're on the list."
  "We'll email you when NeuroD launches. Thank you for caring
   about better mental health support."
  [Share on Twitter/X] [Share on LinkedIn] [Copy link]

Social proof counter (if >10 signups):
  "🎉 X people have joined so far"
```

**Share buttons matter.** When someone joins, make it dead easy
to share. Pre-written share text:

Twitter/X:
```
I just joined the waitlist for @NeuroD_app — an AI-powered mental health companion that actually understands neurodiverse brains.

It spots patterns before you notice them, finds the real causes behind hard days, and builds a plan that fits your brain.

Join the waitlist: [URL]

#Neurodiversity #MentalHealth #AI
```

LinkedIn:
```
Mental illness affects 1 in 8 people globally. For neurodiverse individuals, the gap between need and care is even wider.

I just joined the waitlist for NeuroD — a new kind of mental health app that uses three types of AI (pattern recognition, causal analysis, and generative AI) to understand your mind, find the real causes behind hard days, and build a care plan that fits your brain.

No streaks. No shame. No generic advice. Strengths first.

Join the waitlist: [URL]
```

### Section 8: FAQ

From prototype Screen 16. Expandable accordions.

```
Section heading:
  "Questions you might have"

Q: "Do I need a diagnosis to use NeuroD?"
A: "No. 'Not sure yet' and 'Just exploring' are valid options.
    Full access from day one."

Q: "Is this a replacement for therapy?"
A: "No. NeuroD is the layer between you and your next appointment —
    it watches patterns, finds causes, and helps you prepare for
    conversations with your care team."

Q: "How is this different from a mood tracker?"
A: "Mood trackers show what happened. NeuroD shows why — and where
    to intervene. That's the difference between 'your mood is low'
    and 'sensory overload 2 days ago is why your mood dropped today.'"

Q: "Is my data safe?"
A: "Encrypted on your device. Never sold. Never used to train AI.
    Delete everything with one button. UK GDPR compliant."

Q: "When does it launch?"
A: "2026. Join the waitlist and we'll email you when it's ready."

Q: "Will it be free?"
A: "The core experience will be free forever. No ads."
```

### Section 9: Footer

```
Left: NeuroD logo/wordmark + "Your mind, understood."
Middle: Links — How it works · About · Privacy · FAQ
Right: "Built during Neurodiversity Month 2026"
Bottom line: "Made with Claude by Anthropic · Hosted on Vercel"

♾️ Different minds change everything.
```

---

## 7. PWA Configuration

### manifest.json

```json
{
  "name": "NeuroD",
  "short_name": "NeuroD",
  "description": "Your mind, understood. Not fixed — supported.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAF8F4",
  "theme_color": "#6D28D9",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Meta tags in layout.tsx

```tsx
// app/layout.tsx — head section must include:
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#6D28D9" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
```

---

## 8. Social Sharing Meta Tags

These are critical for the social media launch.

```tsx
// app/layout.tsx
export const metadata = {
  title: 'NeuroD — Your mind, understood.',
  description: 'AI-powered mental health support that learns your patterns, finds the real causes, and builds a plan that fits your brain. Built for neurodiverse minds.',
  metadataBase: new URL('https://neurod.app'),  // UPDATE with real domain
  openGraph: {
    title: 'NeuroD — Your mind, understood.',
    description: 'Mental illness affects 1 in 8 people. Care is reactive and generic. NeuroD uses three kinds of AI to understand your patterns, find the real why, and build a plan that fits your brain.',
    url: 'https://neurod.app',
    siteName: 'NeuroD',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroD — Your mind, understood.',
    description: 'AI-powered mental health support built for neurodiverse minds. Three kinds of AI. No shame mechanics. Strengths first.',
    images: ['/og-image.png'],
    // creator: '@NeuroD_app',  // UPDATE with real handle
  },
}
```

### OG Image (og-image.png — 1200×630)

Generate this as part of the build. Content:

```
Background: dark gradient (#1E1B4B → #064E3B)
Top left: ♾️ icon (subtle, large, low opacity)
Centre text:
  "NeuroD" (Fraunces, white, large)
  "Your mind, understood." (DM Sans, white, 60% opacity)
  "AI-powered mental health support · Built for neurodiverse minds" (small, 40% opacity)
Bottom: "neurod.app" (tiny, 30% opacity)
```

---

## 9. UTM Source Tracking

When sharing on social media, use UTM parameters to track which
platform drives the most signups.

```
Twitter:    https://neurod.app?utm_source=twitter&utm_medium=social&utm_campaign=launch
LinkedIn:   https://neurod.app?utm_source=linkedin&utm_medium=social&utm_campaign=launch
Reddit:     https://neurod.app?utm_source=reddit&utm_medium=social&utm_campaign=launch
Instagram:  https://neurod.app?utm_source=instagram&utm_medium=social&utm_campaign=launch
```

The waitlist form should read the `utm_source` query parameter and
pass it as the `source` field to the API. This way you know exactly
which social post drove each signup.

```typescript
// In WaitlistForm.tsx
const searchParams = useSearchParams()
const source = searchParams.get('utm_source') || 'website'

// Pass to API:
fetch('/api/waitlist', {
  method: 'POST',
  body: JSON.stringify({ email, source, neuroType }),
})
```

---

## 10. The Interactive Demo — Implementation Guide

This is the most complex component. It must feel polished.

### Structure

```tsx
// components/landing/InteractiveDemo.tsx

export function InteractiveDemo() {
  const [currentScreen, setCurrentScreen] = useState(0)

  return (
    <section className="...">
      {/* Phone frame */}
      <div className="phone-frame">
        <div className="phone-screen">
          <DemoScreen id={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      </div>
    </section>
  )
}
```

### Phone frame styling

```css
.phone-frame {
  width: 100%;
  max-width: 380px;
  aspect-ratio: 9/18;      /* realistic phone ratio */
  margin: 0 auto;
  border-radius: 36px;
  background: #1a1614;
  padding: 12px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.3);
  position: relative;
}
.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: var(--cream);
  position: relative;
}
```

### Screens to implement

Build each as a React component. Copy layout and content exactly
from PROTOTYPE.html. Do NOT improvise content — the prototype is
the source of truth.

```
DemoLanding.tsx      → Prototype Screen 0 (skip real CTA — use "Try the demo" instead)
DemoProfile1.tsx     → Prototype Screen 1
DemoProfile2.tsx     → Prototype Screen 2
DemoProfile3.tsx     → Prototype Screen 3
DemoProfileDone.tsx  → Prototype Screen 4
DemoDashboard.tsx    → Prototype Screen 5
DemoPulse.tsx        → Prototype Screen 6
DemoDetailedCheckin.tsx → Prototype Screen 7
DemoInsights.tsx     → Prototype Screen 8
DemoCarePlan.tsx     → Prototype Screen 9
DemoChat.tsx         → Prototype Screen 10 (with canned responses)
DemoCrisis.tsx       → Prototype Screen 11
DemoHowItWorks.tsx   → Prototype Screen 13
DemoSettings.tsx     → Prototype Screen 12
```

### Critical interactions to preserve from prototype

1. **Pill toggles** — tap to select/deselect (neuro types, strengths, support needs)
2. **Mood grid** — tap to select one emoji
3. **Pulse grid** — tap one emoji, animate others out, show "Saved ✓"
4. **Sleep track** — tap to select one range
5. **Toggle buttons** — tap to select one option in a row
6. **Intervention accordions** — tap header to expand/collapse
7. **Chat** — tap a suggested prompt or type, show canned response with typing indicator
8. **Screen transitions** — slide left/right matching prototype's CSS transitions
9. **Tab bar** — navigate between dashboard, check-in, insights, plan, chat
10. **Crisis trigger** — tapping foggy/low/anxious in pulse grid → crisis screen (after delay)
11. **Causal chain** — the vertical flow with lag labels (exact copy from prototype Screen 8)
12. **Sparkline bars** — animated bar chart on dashboard and insights (same heights as prototype)

### Content for canned chat responses

Copy exactly from the `chatResponses` object in PROTOTYPE.html's script section.
Four canned responses for the four suggested prompts.
Fallback response for anything else the user types.

---

## 11. Build Order

### Phase 1 — Project Setup (30 min)

- [ ] `npx create-next-app@latest neurod-waitlist --typescript --tailwind --app`
- [ ] Add Google Fonts (Fraunces + DM Sans) to layout
- [ ] Set up CSS variables in globals.css (copy from prototype)
- [ ] Create manifest.json + PWA meta tags
- [ ] Add OG meta tags for social sharing
- [ ] Create Supabase project + run waitlist table SQL
- [ ] Set up .env.local with Supabase credentials
- [ ] Verify: `npm run dev` shows a blank page with correct fonts

### Phase 2 — Waitlist Backend (20 min)

- [ ] Create `lib/supabase.ts` (server client)
- [ ] Create `app/api/waitlist/route.ts`
- [ ] Create `WaitlistForm.tsx` with email input + submit
- [ ] UTM source tracking from query params
- [ ] Test: submit email → appears in Supabase table
- [ ] Test: duplicate email → still shows success (no leak)
- [ ] Test: invalid email → shows validation error
- [ ] Post-signup: show success + share buttons

### Phase 3 — Landing Page Sections (2 hours)

- [ ] Hero section (heading, subtitle, CTAs, celebration banner)
- [ ] Problem section (3 stat cards)
- [ ] Three Capabilities section (3 feature cards, user language)
- [ ] How It Works section (3 AI explainer cards, expandable)
- [ ] Principles section (5 cards)
- [ ] FAQ section (expandable accordions)
- [ ] Footer
- [ ] Waitlist form section (with share buttons)
- [ ] Scroll animations (intersection observer, staggered fade-up)
- [ ] Mobile responsive (375px → 1440px)

### Phase 4 — Interactive Demo (3 hours)

This is the biggest piece. Take time. Get it right.

- [ ] Phone frame component
- [ ] Screen transition system (slide left/right)
- [ ] Tab bar component (shared across demo screens)
- [ ] DemoLanding screen
- [ ] DemoProfile1, DemoProfile2, DemoProfile3 screens
- [ ] DemoProfileDone screen
- [ ] DemoDashboard screen (sparkline, signal card, focus card)
- [ ] DemoPulse screen (9-emoji grid with save animation)
- [ ] DemoDetailedCheckin screen
- [ ] DemoInsights screen (signals + causal chain — most important screen)
- [ ] DemoCarePlan screen (strengths banner, focus, 3 interventions)
- [ ] DemoChat screen (canned responses, typing indicator)
- [ ] DemoCrisis screen (breathing animation, support contacts)
- [ ] DemoHowItWorks screen (3 AI types)
- [ ] DemoSettings screen
- [ ] Verify: every screen matches the prototype pixel-for-pixel

### Phase 5 — OG Image + Polish (30 min)

- [ ] Generate OG image (1200×630) — use the design spec from Section 8
- [ ] Generate PWA icons (192px + 512px) — NeuroD logomark on purple
- [ ] Generate favicon
- [ ] Lighthouse audit: performance, accessibility, PWA
- [ ] Test social sharing preview (Twitter card validator, LinkedIn post inspector)
- [ ] Final mobile check on real phone

### Phase 6 — Deploy (15 min)

- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy
- [ ] Verify: landing page loads, form works, demo works
- [ ] Test UTM tracking: visit with ?utm_source=twitter → check Supabase
- [ ] Share!

---

## 12. Social Media Post Templates

### Twitter/X (Main post)

```
Mental illness affects 1 in 8 people. Most will never get adequate care.

I'm building NeuroD — an AI companion that:
→ Spots patterns before you notice them
→ Finds the real cause, not just the symptom
→ Builds a plan that fits YOUR brain

Built for neurodiverse minds. Launching 2026.

Join the waitlist ↓
[URL]?utm_source=twitter

#Neurodiversity #MentalHealth #AI
```

### Twitter/X (Thread opener)

```
Why does every mental health app fail after 2 weeks?

Because they all do the same thing: ask "how are you feeling?"
and show you a graph.

That's not support. That's a mood diary with extra steps.

Here's what NeuroD does differently 🧵
```

### LinkedIn

```
I've been working on something I care deeply about.

Mental illness affects 1 in 8 people globally. For neurodiverse
individuals — ADHD, Autism, Dyslexia, AuDHD — the gap between
need and care is even wider. Standard tools assume a neurotypical
brain and miss everything that matters.

NeuroD is an AI-powered mental health companion built specifically
for neurodiverse minds. It uses three kinds of AI:

🔍 Pattern Recognition — spots shifts in mood, sleep, and energy
   before they become problems
🔗 Causal Analysis — finds the real why, not just correlations
✦ Generative AI — builds a care plan in your language, for your brain

No streaks. No shame. No generic advice. Strengths first.

We're launching in 2026. The waitlist is open.
Try the interactive prototype on the site — every screen
you see is what the real app will be.

[URL]?utm_source=linkedin

#Neurodiversity #MentalHealth #AI #HealthTech #Startup
```

### Reddit (r/ADHD, r/autism, r/neurodiversity)

```
Title: Building a mental health app that actually understands
       neurodiverse brains — would love your input

I'm building NeuroD, an AI mental health companion designed
specifically for neurodiverse people.

The core problem: every mental health app assumes a neurotypical
brain. They miss sensory overload, executive function dips,
social battery management, and the fact that "just journal"
is impossible on a 2/10 capacity day.

NeuroD has three layers:
- It watches your patterns and notices shifts before you do
- It finds the actual cause chain (sensory → sleep → social → mood)
- It builds a plan adapted to your neuro type and energy level

There's an interactive prototype on the site where you can tap
through the entire experience.

I'd genuinely love feedback from this community.
What would make you trust an app like this?
What would make you leave?

[URL]?utm_source=reddit
```

---

## 13. What NOT to Build

This is a waitlist page. Keep scope ruthlessly small.

DO NOT build:
- ❌ User authentication / sign up / login
- ❌ Real AI API calls (all demo is canned responses)
- ❌ Database beyond the waitlist table
- ❌ Email sending (no confirmation emails for now)
- ❌ Admin dashboard (just check Supabase directly)
- ❌ Blog or content pages
- ❌ Multiple pages (it's a single-page site with sections)
- ❌ Complex animation libraries (CSS only)
- ❌ Cookie consent banner (no tracking cookies used)
- ❌ i18n (English only for launch)

DO build:
- ✅ Beautiful, polished landing page
- ✅ Working interactive prototype in a phone frame
- ✅ Email capture that writes to Supabase
- ✅ Share buttons with pre-written text
- ✅ UTM tracking for social media sources
- ✅ Social sharing meta tags (OG + Twitter cards)
- ✅ PWA installable
- ✅ Mobile-first responsive design

---

## 14. Success Metrics

After launching, track in Supabase:

```sql
-- Total signups
SELECT count(*) FROM waitlist;

-- Signups by source
SELECT source, count(*) FROM waitlist GROUP BY source ORDER BY count DESC;

-- Signups by neuro type (of those who selected)
SELECT neuro_type, count(*) FROM waitlist
WHERE neuro_type IS NOT NULL
GROUP BY neuro_type ORDER BY count DESC;

-- Signups over time
SELECT date_trunc('day', created_at) AS day, count(*)
FROM waitlist GROUP BY day ORDER BY day;
```

**Target:** 100 signups in the first 48 hours = strong signal.
500+ in the first week = build the full app immediately.

---

*Ship this today. Validate tomorrow. Build what people actually want.*
