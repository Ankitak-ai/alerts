```md
# M4PS Donation Page — Complete Handover & Editing Guide

This document explains how the donation page works, how to run it locally, how to deploy it to Vercel, and how to make common design/content changes safely.

> Important: This version is a standalone preview version.  
> It is designed to work without Supabase, Razorpay, database, or backend.  
> Payment submission is simulated with a fake success message.

---

## 1. What This Project Is

This project shows a streamer donation page for:

- Streamer Name: `M4PS`
- Streamer Slug: `m4ps`
- Brand Color: Lime green: `#a3e635`

The page allows a visitor to:

1. Enter their name.
2. Choose donation type:
   - Text
   - Voice
   - Sound
   - Media
3. Choose currency.
4. Enter amount.
5. Add message / record voice / select sound / upload media depending on selected type.
6. Click the Support button.

In this preview version, clicking Support does not charge money.  
It shows a fake processing state and then a success alert.

---

## 2. Files You Need To Know

The main file you will edit is:

```txt
src/App.tsx
```

This one file contains:

1. Mock data.
2. Fake payment logic.
3. CSS styles.
4. UI layout.
5. Streamer details.
6. Form logic.

If you are only changing design, text, images, colors, pricing, or labels, you usually only need to edit:

```txt
src/App.tsx
```

---

## 3. How To Run The Project Locally

### Step 1: Install Node.js

Install Node.js from:

```txt
https://nodejs.org/
```

Recommended version: LTS.

After installing, open terminal/command prompt and check:

```bash
node -v
```

and:

```bash
npm -v
```

If both show versions, Node is installed correctly.

---

### Step 2: Create project

Open terminal inside the folder where you want to keep the project.

Run:

```bash
npm create vite@latest m4ps-donation -- --template react-ts
```

Then enter the folder:

```bash
cd m4ps-donation
```

Install dependencies:

```bash
npm install
```

---

### Step 3: Replace App.tsx

Go to:

```txt
src/App.tsx
```

Delete everything inside that file.

Paste the full standalone donation page code into:

```txt
src/App.tsx
```

Save the file.

---

### Step 4: Start local server

Run:

```bash
npm run dev
```

You should see something like:

```txt
Local: http://localhost:5173/
```

Open that link in your browser.

The donation page should appear.

---

## 4. How To Use Local Images

The default preview uses placeholder images from `placehold.co` so it works immediately.

If you want to use real M4PS images:

### Step 1: Create folder

Inside the project root, create:

```txt
public/assets/streamers/
```

Your folder structure should look like:

```txt
m4ps-donation/
  public/
    assets/
      streamers/
        m4ps-logo.jpg
        m4ps-bg.png
  src/
    App.tsx
```

---

### Step 2: Put images there

Example:

```txt
public/assets/streamers/m4ps-logo.jpg
public/assets/streamers/m4ps-bg.png
```

---

### Step 3: Update code

Scroll to the bottom of `src/App.tsx`.

Find this part:

```tsx
export default function App() {
  return (
    <CustomDonationPage
      streamerSlug="m4ps"
      streamerName="M4PS"
      brandColor="#a3e635"
      logoSrc="https://placehold.co/100x100/a3e635/000000?text=M4PS"
      backgroundSrc="https://placehold.co/1920x1080/0a0810/1a1a1a?text=."
      tagline="Support M4PS"
    />
  );
}
```

Change it to:

```tsx
export default function App() {
  return (
    <CustomDonationPage
      streamerSlug="m4ps"
      streamerName="M4PS"
      brandColor="#a3e635"
      logoSrc="/assets/streamers/m4ps-logo.jpg"
      backgroundSrc="/assets/streamers/m4ps-bg.png"
      tagline="Support M4PS"
    />
  );
}
```

Save the file.

If the local server is running, the page should update automatically.

---

## 5. How The Code Is Organized

The file is divided into sections. Search for these comments inside `src/App.tsx`:

```tsx
/* ── UTILS & MOCKS ── */
```

This section contains fake data and helper functions.

```tsx
/* ── MOCK TOAST SYSTEM ── */
```

This section shows small success/error popup messages.

```tsx
/* ── MOCK ICONS (Lucide) ── */
```

This section contains SVG icons.

```tsx
/* ── MOCK HOOKS & COMPONENTS ── */
```

This section contains fake versions of:

- Voice recorder.
- HyperSound selector.
- Media uploader.
- Rewards banner.
- Footer.

```tsx
/* ── HELPERS ── */
```

This section handles color conversion and color shading.

```tsx
/* ── PROPS ── */
```

This section defines what data the donation page accepts.

```tsx
/* ── STATIC CSS ── */
```

This section contains all design styling.

```tsx
/* ── MAIN COMPONENT ── */
```

This is the actual donation page logic and layout.

```tsx
/* ── STREAMER WRAPPER (M4PS) ── */
```

This is where M4PS details are passed into the page.

---

# 6. Line-By-Line Explanation Of Important Code

This section explains the important lines in simple language.

---

## 6.1 React Import

```tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
```

### Explanation

This imports React and some React tools.

| Part | Meaning |
|---|---|
| `React` | Main React library. |
| `useState` | Used to store changing values, like form input. |
| `useEffect` | Used to run code after page loads or when something changes. |
| `useRef` | Used to directly access a DOM element. |
| `useCallback` | Used to store a function so it does not recreate unnecessarily. |

### Can you edit this?

Usually no. Leave this line as it is.

---

## 6.2 Class Name Helper

```tsx
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");
```

### Explanation

This helps combine CSS class names.

Example:

```tsx
cn("c-tb", donationType === t.key ? "c-on" : "")
```

If donation type is selected, final class may become:

```txt
c-tb c-on
```

If not selected:

```txt
c-tb
```

### Can you edit this?

No need to edit.

---

## 6.3 Supported Currencies

```tsx
const SUPPORTED_CURRENCIES = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
];
```

### Explanation

This defines currencies shown in dropdown.

| Field | Meaning |
|---|---|
| `code` | Currency code. |
| `symbol` | Symbol shown beside amount. |

### How to add GBP

Add this line inside the array:

```tsx
{ code: "GBP", symbol: "£" },
```

Example:

```tsx
const SUPPORTED_CURRENCIES = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
];
```

---

## 6.4 Get Currency Symbol

```tsx
const getCurrencySymbol = (code: string) => SUPPORTED_CURRENCIES.find(c => c.code === code)?.symbol || "₹";
```

### Explanation

This finds the symbol for the selected currency.

Example:

```tsx
getCurrencySymbol("USD")
```

Returns:

```txt
$
```

If currency is not found, it returns:

```txt
₹
```

### Can you edit this?

Usually no.

---

## 6.5 Mock Pricing

```tsx
const mockPricing = {
  minText: 10,
  minVoice: 50,
  minHypersound: 100,
  minMedia: 150,
  minTts: 50,
  ttsEnabled: true,
  messageCharTiers: [{ amount: 0, chars: 150 }, { amount: 100, chars: 300 }],
  voiceDurationTiers: [{ amount: 50, duration: 15 }, { amount: 100, duration: 30 }],
};
```

### Explanation

This controls preview pricing rules.

| Setting | Meaning |
|---|---|
| `minText` | Minimum amount for text donation. |
| `minVoice` | Minimum amount for voice donation. |
| `minHypersound` | Minimum amount for sound donation. |
| `minMedia` | Minimum amount for media donation. |
| `minTts` | Minimum amount for Text-To-Speech hint. |
| `ttsEnabled` | Shows/hides TTS hint. |
| `messageCharTiers` | Controls message length based on amount. |
| `voiceDurationTiers` | Controls voice length based on amount. |

---

### Example: Change minimum text donation

Find:

```tsx
minText: 10,
```

Change to:

```tsx
minText: 20,
```

Now text donation minimum becomes 20.

---

### Example: Change message character limit

Find:

```tsx
messageCharTiers: [{ amount: 0, chars: 150 }, { amount: 100, chars: 300 }],
```

Meaning:

| Amount | Character Limit |
|---|---|
| 0 or more | 150 characters |
| 100 or more | 300 characters |

To allow 500 characters at amount 200:

```tsx
messageCharTiers: [
  { amount: 0, chars: 150 },
  { amount: 100, chars: 300 },
  { amount: 200, chars: 500 },
],
```

---

### Example: Change voice duration

Find:

```tsx
voiceDurationTiers: [{ amount: 50, duration: 15 }, { amount: 100, duration: 30 }],
```

Meaning:

| Amount | Voice Duration |
|---|---|
| 50 or more | 15 seconds |
| 100 or more | 30 seconds |

Change 15 to 20:

```tsx
voiceDurationTiers: [{ amount: 50, duration: 20 }, { amount: 100, duration: 30 }],
```

---

## 6.6 Use Streamer Pricing

```tsx
const useStreamerPricing = () => ({ pricing: mockPricing });
```

### Explanation

This returns the mock pricing object.

In real app, this would fetch pricing from database.

### Can you edit this?

Usually no.

---

## 6.7 Get Max Message Length

```tsx
const getMaxMessageLength = (tiers: any[], amount: number) => {
  let max = 150;
  for (const tier of tiers) {
    if (amount >= tier.amount) max = tier.chars;
  }
  return max;
};
```

### Explanation

This calculates how many characters the donor can type.

It checks the amount entered and gives the matching character limit.

Example:

If amount is 120:

```tsx
messageCharTiers: [
  { amount: 0, chars: 150 },
  { amount: 100, chars: 300 },
]
```

Result:

```txt
300 characters
```

Because 120 is greater than 100.

---

## 6.8 Get Voice Max Duration

```tsx
const getVoiceMaxDuration = (amount: number, tiers: any[]) => {
  let max = 15;
  for (const tier of tiers) {
    if (amount >= tier.amount) max = tier.duration;
  }
  return max;
};
```

### Explanation

This calculates allowed voice message length.

Example:

If amount is 100, and tiers are:

```tsx
[
  { amount: 50, duration: 15 },
  { amount: 100, duration: 30 },
]
```

Result:

```txt
30 seconds
```

---

# 7. Toast Popup Explanation

```tsx
const ToastContainer = ({ message, type }: { message: string; type: "error" | "success" }) => (
```

This creates the popup component.

| Prop | Meaning |
|---|---|
| `message` | Text shown in popup. |
| `type` | Either `error` or `success`. |

---

```tsx
  <div style={{
```

This starts the popup box styling.

---

```tsx
    position: "fixed", top: "20px", right: "20px", zIndex: 9999,
```

This places popup at top right corner.

Change:

```tsx
top: "20px"
```

To:

```tsx
top: "80px"
```

If you want it lower.

---

```tsx
    background: type === "error" ? "rgba(239,68,68,0.9)" : "rgba(34,197,94,0.9)",
```

This chooses popup background.

| Type | Color |
|---|---|
| Error | Red |
| Success | Green |

---

```tsx
    color: "#fff", padding: "12px 20px", borderRadius: "8px",
```

This makes text white and adds padding/rounded corners.

---

```tsx
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontFamily: "'Barlow', sans-serif",
```

This adds shadow and font.

---

```tsx
    fontWeight: 600, fontSize: "14px", animation: "c-fu .2s ease forwards"
```

This makes text bold and adds fade-in animation.

---

# 8. Icon Components Explanation

There are three icon components:

```tsx
const Check = ({ className }: { className?: string }) => (
```

```tsx
const ChevronsUpDown = ({ className }: { className?: string }) => (
```

```tsx
const Heart = ({ className }: { className?: string }) => (
```

These are SVG icons.

| Icon | Used For |
|---|---|
| `Check` | Not heavily used in simplified dropdown, but available. |
| `ChevronsUpDown` | Originally for dropdown arrow. |
| `Heart` | Button heart icon. |

Usually you do not need to edit these.

---

# 9. Voice Recorder Mock Explanation

```tsx
const useVoiceRecorder = (maxDuration: number) => {
```

This creates fake voice recorder logic.

`maxDuration` is maximum recording seconds.

---

```tsx
  const [isRecording, setIsRecording] = useState(false);
```

Stores whether recording is active.

---

```tsx
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
```

Stores fake recorded audio after recording.

---

```tsx
  const [duration, setDuration] = useState(0);
```

Stores current recording seconds.

---

```tsx
  const [intervalId, setIntervalId] = useState<any>(null);
```

Stores timer ID so we can stop the timer.

---

```tsx
  const startRecording = () => {
```

This function starts fake recording.

---

```tsx
    setIsRecording(true);
```

Sets recording state to true.

---

```tsx
    setAudioBlob(null);
```

Clears old recording.

---

```tsx
    setDuration(0);
```

Resets timer to zero.

---

```tsx
    const id = setInterval(() => {
```

Starts a timer that runs every second.

---

```tsx
      setDuration(d => {
```

Updates duration every second.

---

```tsx
        if (d >= maxDuration) {
```

If duration reaches maximum allowed time, stop recording.

---

```tsx
          clearInterval(id);
```

Stops timer.

---

```tsx
          setIsRecording(false);
```

Recording is no longer active.

---

```tsx
          setAudioBlob(new Blob(["mock audio data"], { type: "audio/wav" }));
```

Creates fake audio data.

---

```tsx
          return maxDuration;
```

Sets duration to max.

---

```tsx
        return d + 1;
```

Otherwise increase duration by one second.

---

```tsx
  const stopRecording = () => {
```

This stops recording manually.

---

```tsx
  const reset = () => {
```

This clears recording and starts over.

---

# 10. Voice Recorder UI Explanation

```tsx
const EnhancedVoiceRecorder = ({ controller, maxDurationSeconds, requiredAmount, currentAmount, brandColor, currencySymbol }: any) => {
```

This displays the voice recorder box.

| Prop | Meaning |
|---|---|
| `controller` | Voice recorder logic. |
| `maxDurationSeconds` | Maximum allowed seconds. |
| `requiredAmount` | Minimum amount needed for voice. |
| `currentAmount` | Amount user entered. |
| `brandColor` | Button/accent color. |
| `currencySymbol` | Currency symbol. |

---

```tsx
  const canRecord = currentAmount >= requiredAmount;
```

User can only record if entered amount is enough.

---

```tsx
  return (
```

Starts UI.

---

```tsx
      {!canRecord ? (
```

If amount is too low, show error text.

---

```tsx
        <p style={{ fontSize: "12px", color: "#ef4444" }}>Minimum {currencySymbol}{requiredAmount} required for voice</p>
```

Shows red minimum amount warning.

---

```tsx
      ) : controller.isRecording ? (
```

If recording is active, show recording UI.

---

```tsx
          <p style={{ fontSize: "14px", fontWeight: "bold", color: brandColor }}>Recording... {controller.duration}s / {maxDurationSeconds}s</p>
```

Shows current recording time.

---

```tsx
          <button onClick={controller.stopRecording} ...>Stop</button>
```

Stop recording button.

---

```tsx
      ) : controller.audioBlob ? (
```

If recording exists, show saved state.

---

```tsx
          <p style={{ fontSize: "14px", color: "#22c55e" }}>✓ Recording saved!</p>
```

Shows green saved message.

---

```tsx
          <button onClick={controller.reset} ...>Re-record</button>
```

Allows user to record again.

---

```tsx
        <button onClick={controller.startRecording} ...>
```

Shows start recording button.

---

# 11. HyperSound Selector Explanation

```tsx
const HyperSoundSelector = ({ selectedSound, onSoundSelect }: any) => {
```

This displays sound options.

---

```tsx
  const sounds = ["Vine Boom", "Bruh", "Airhorn", "Tada"];
```

These are fake sound names.

### How to change sounds

Replace this line:

```tsx
const sounds = ["Vine Boom", "Bruh", "Airhorn", "Tada"];
```

With:

```tsx
const sounds = ["Alert", "Ping", "Explosion", "Cheer"];
```

---

```tsx
      {sounds.map((s) => (
```

This loops through each sound and creates a button.

---

```tsx
          onClick={() => onSoundSelect(s)}
```

When button is clicked, that sound is selected.

---

```tsx
            border: selectedSound === s ? "1.5px solid #f87171" : "1px solid rgba(255,255,255,0.1)",
```

Selected sound gets red border.

---

# 12. Media Uploader Explanation

```tsx
const MediaUploader = ({ onMediaUploaded }: any) => {
```

This displays fake media upload field.

---

```tsx
      <input
        type="file"
        accept="image/*,video/*"
```

Allows image or video selection.

---

```tsx
        onChange={(e) => {
```

Runs when user chooses a file.

---

```tsx
          if (e.target.files?.[0]) {
```

Checks if a file was selected.

---

```tsx
            onMediaUploaded("mock-media-url.jpg", e.target.files[0].type);
```

Pretends file was uploaded and passes fake URL.

In real app, this would upload to server/storage.

---

# 13. Rewards Banner Explanation

```tsx
const RewardsBanner = ({ amount }: any) => {
```

This displays reward message if amount is high enough.

---

```tsx
  if (amount < 500) return null;
```

If amount is less than 500, show nothing.

### Change reward threshold

Change:

```tsx
if (amount < 500) return null;
```

To:

```tsx
if (amount < 1000) return null;
```

Now reward appears only above 1000.

---

```tsx
      🎉 You unlocked a special reward!
```

Reward text.

Change this text freely.

---

# 14. Footer Explanation

```tsx
const DonationPageFooter = ({ brandColor }: any) => (
```

This shows footer text.

---

```tsx
    Powered by MockDonations • <span style={{ color: brandColor }}>M4PS</span>
```

Change this to whatever footer you want.

Example:

```tsx
    Powered by M4PS Community
```

---

# 15. Color Helper Functions

```tsx
const hexToRgb = (hex: string) => {
```

Converts hex color to RGB.

Example:

```txt
#a3e635
```

Becomes:

```txt
r: 163
g: 230
b: 53
```

---

```tsx
const rgbToHex = (r: number, g: number, b: number) =>
```

Converts RGB back to hex.

---

```tsx
const adjustColor = (hex: string, amount: number) => {
```

Makes a color lighter or darker.

Positive amount makes lighter.

Negative amount makes darker.

---

# 16. Props Explanation

```tsx
export interface CustomDonationPageProps {
  streamerSlug: string;
  streamerName: string;
  brandColor: string;
  logoSrc: string;
  backgroundSrc?: string;
  tagline?: string;
}
```

This defines what information the page needs.

| Prop | Meaning |
|---|---|
| `streamerSlug` | Internal streamer ID. |
| `streamerName` | Display name. |
| `brandColor` | Main theme color. |
| `logoSrc` | Avatar/logo image. |
| `backgroundSrc` | Page background image. |
| `tagline` | Small text under name. |

---

# 17. CSS Styling Explained

The large CSS block is stored here:

```tsx
const BASE_STYLES = `
```

Everything between the backticks is CSS.

Do not delete the backticks:

```txt
`
```

---

## 17.1 Font Import

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700;800;900&display=swap');
```

This loads two fonts:

| Font | Used For |
|---|---|
| Bebas Neue | Streamer name and main button. |
| Barlow | Normal text. |

### Change font

Example: Add Montserrat.

Replace with:

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;800&display=swap');
```

Then find:

```css
font-family: 'Barlow', sans-serif;
```

Change to:

```css
font-family: 'Montserrat', sans-serif;
```

---

## 17.2 Root Colors

```css
:root {
  --c-cyan:    #06b6d4;
  --c-amber:   #f59e0b;
  --c-red:     #ef4444;
  --c-purple:  #a855f7;
  --c-white:   #ffffff;
  --c-grey:    #9ca3af;
  --c-bg:      #0a0810;
  --c-card:    #0f0c1a;
}
```

These are global color variables.

| Variable | Meaning |
|---|---|
| `--c-cyan` | Voice/accent color. |
| `--c-amber` | Warning/media color. |
| `--c-red` | Error/sound color. |
| `--c-purple` | Media color. |
| `--c-bg` | Page background color. |
| `--c-card` | Main card background. |

### Change page background color

Change:

```css
--c-bg:      #0a0810;
```

To:

```css
--c-bg:      #000000;
```

---

## 17.3 Page Container

```css
.c-page {
  width: 100vw; height: 100dvh;
  background: var(--c-bg) var(--bg-img) center / cover no-repeat;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; position: relative;
}
```

This controls the full screen page.

| Property | Meaning |
|---|---|
| `width: 100vw` | Full viewport width. |
| `height: 100dvh` | Full viewport height. |
| `background` | Background color/image. |
| `display: flex` | Centers card. |
| `align-items: center` | Vertical center. |
| `justify-content: center` | Horizontal center. |

---

## 17.4 Background Glow Layer

```css
.c-bg-layer {
```

This creates colorful glow background.

You can reduce opacity by adding:

```css
opacity: 0.5;
```

Inside `.c-bg-layer`.

---

## 17.5 Grid Pattern

```css
.c-grid {
```

This creates subtle grid lines.

To remove grid, find:

```tsx
<div className="c-grid" />
```

Delete that line.

Or in CSS:

```css
.c-grid {
  display: none;
}
```

---

## 17.6 Card Width

```css
.c-scale-wrap { width: 420px; transform-origin: top center; position: relative; z-index: 10; }
```

and:

```css
.c-card {
  width: 420px;
```

These control card width.

### Make card wider

Change both:

```css
width: 420px;
```

To:

```css
width: 500px;
```

Important: Change both places.

---

## 17.7 Main Card Styling

```css
.c-card {
  width: 420px;
  background: linear-gradient(170deg, var(--c-card) 0%, #0a0810 100%);
  border-radius: 18px;
  border: 1px solid rgba( var(--brand-rgb), 0.28);
```

| Property | Meaning |
|---|---|
| `background` | Card gradient. |
| `border-radius` | Rounded corners. |
| `border` | Outer border. |

### Make corners sharper

Change:

```css
border-radius: 18px;
```

To:

```css
border-radius: 8px;
```

---

## 17.8 Top Animated Bar

```css
.c-card::before {
```

This creates animated top line.

To make it thicker:

Change:

```css
height: 2px;
```

To:

```css
height: 4px;
```

To remove it, delete:

```css
.c-card::before { ... }
```

Or set:

```css
display: none;
```

---

## 17.9 Header/Hero Section

```css
.c-hero {
```

This controls top section with avatar, name, and LIVE badge.

Change spacing here:

```css
padding: 20px 22px 18px;
```

Meaning:

| Value | Meaning |
|---|---|
| 20px | Top padding |
| 22px | Left/right padding |
| 18px | Bottom padding |

---

## 17.10 Avatar Ring

```css
.c-avatar-ring {
  width: 68px; height: 68px;
```

Controls avatar size.

### Make avatar bigger

Change:

```css
width: 68px; height: 68px;
```

To:

```css
width: 85px; height: 85px;
```

---

## 17.11 Streamer Name

```css
.c-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 40px; line-height: 0.92; letter-spacing: 0.06em;
```

Controls streamer name style.

### Make name larger

Change:

```css
font-size: 40px;
```

To:

```css
font-size: 48px;
```

---

## 17.12 LIVE Badge

```css
.c-live {
```

Controls LIVE badge.

To change LIVE text color:

Find:

```css
.c-live-text { font-size: 10px; font-weight: 800; color: #4ade80; letter-spacing: 0.1em; }
```

Change:

```css
color: #4ade80;
```

To another color.

---

## 17.13 Form Body

```css
.c-body { padding: 16px 20px 18px; display: flex; flex-direction: column; gap: 13px; }
```

Controls spacing inside card.

| Property | Meaning |
|---|---|
| `padding` | Space inside card. |
| `gap` | Space between fields. |

### Increase spacing between fields

Change:

```css
gap: 13px;
```

To:

```css
gap: 20px;
```

---

## 17.14 Labels

```css
.c-lbl {
  font-size: 9px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
```

Controls small labels like:

- Your Name
- Donation Type
- Amount
- Message

### Make labels bigger

Change:

```css
font-size: 9px;
```

To:

```css
font-size: 11px;
```

---

## 17.15 Input Fields

```css
.c-iw input {
```

Controls text and amount inputs.

### Change input background

Find:

```css
background: rgba(10,10,28,0.9) !important;
```

Change color value.

### Change input border radius

Find:

```css
border-radius: 9px !important;
```

Change to:

```css
border-radius: 20px !important;
```

---

## 17.16 Message Textarea

```css
.c-ta {
```

Controls message box.

### Make message box taller

Find:

```tsx
rows={2}
```

Change to:

```tsx
rows={4}
```

---

## 17.17 Donation Type Buttons

```css
.c-types { display: grid; grid-template-columns: repeat(4,1fr); gap: 7px; }
```

Controls donation type button layout.

Currently four buttons in one row.

### Make two buttons per row

Change:

```css
grid-template-columns: repeat(4,1fr);
```

To:

```css
grid-template-columns: repeat(2,1fr);
```

---

## 17.18 Type Button Colors

There are four type button styles:

```css
.c-tb-br
```

Brand/text button.

```css
.c-tb-cy
```

Cyan/voice button.

```css
.c-tb-rd
```

Red/sound button.

```css
.c-tb-pu
```

Purple/media button.

You can change colors inside each.

Example:

```css
border: 1.5px solid rgba(6,182,212,0.48);
```

Change the RGB values to change border color.

---

## 17.19 Currency Dropdown

```css
.c-cur {
```

Controls currency dropdown.

### Make dropdown wider

Find:

```css
min-width: 90px;
```

Change to:

```css
min-width: 120px;
```

---

## 17.20 Divider

```css
.c-div {
```

Controls divider line with lightning icon.

To remove divider, find:

```tsx
<div className="c-div" />
```

Delete that line.

---

## 17.21 Special Panels

```css
.c-sp { border-radius: 10px; padding: 11px 13px; }
```

These are panels for:

- Voice
- HyperSound
- Media

Classes:

```css
.c-sp-cy
.c-sp-rd
.c-sp-am
```

Control their border/background colors.

---

## 17.22 Support Button

```css
.c-btn {
```

Controls main Support button.

### Change button text size

Find:

```css
font-size: 20px;
```

Change to:

```css
font-size: 24px;
```

### Make button less rounded

Find:

```css
border-radius: 13px;
```

Change to:

```css
border-radius: 6px;
```

---

# 18. Main Component State Explained

Inside:

```tsx
const CustomDonationPage: React.FC<CustomDonationPageProps> = ({
```

This starts the main page component.

---

## 18.1 Props

```tsx
  streamerSlug,
  streamerName,
  brandColor,
  logoSrc,
  backgroundSrc,
  tagline = "Support",
}) => {
```

These values are passed from bottom of file.

| Prop | Example |
|---|---|
| `streamerSlug` | `"m4ps"` |
| `streamerName` | `"M4PS"` |
| `brandColor` | `"#a3e635"` |
| `logoSrc` | Logo URL |
| `backgroundSrc` | Background URL |
| `tagline` | `"Support M4PS"` |

---

## 18.2 References

```tsx
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
```

These allow the code to measure the card size.

Used for scaling on small screens.

Usually do not edit.

---

## 18.3 Form Data

```tsx
  const [formData, setFormData] = useState({ name: "", amount: "", message: "" });
```

Stores form values.

| Field | Meaning |
|---|---|
| `name` | Donor name. |
| `amount` | Donation amount. |
| `message` | Text message. |

---

## 18.4 Selected Currency

```tsx
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
```

Default currency is INR.

### Change default currency

Change:

```tsx
useState("INR")
```

To:

```tsx
useState("USD")
```

---

## 18.5 Donation Type

```tsx
  const [donationType, setDonationType] = useState<"text" | "voice" | "hypersound" | "media">("text");
```

Default donation type is text.

### Change default donation type

Change:

```tsx
("text")
```

To:

```tsx
("voice")
```

Now Voice is selected by default.

---

## 18.6 Selected Hypersound

```tsx
  const [selectedHypersound, setSelectedHypersound] = useState<string | null>(null);
```

Stores selected sound.

---

## 18.7 Media URL and Type

```tsx
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);
```

Stores uploaded media info.

---

## 18.8 Processing State

```tsx
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
```

Controls whether button shows Processing.

---

## 18.9 Toast Message

```tsx
  const [toastMsg, setToastMsg] = useState<{ message: string; type: "error" | "success" } | null>(null);
```

Stores current popup message.

---

## 18.10 Pricing and Calculations

```tsx
  const { pricing } = useStreamerPricing();
```

Gets pricing rules.

---

```tsx
  const currencySymbol = getCurrencySymbol(selectedCurrency);
```

Gets symbol for selected currency.

---

```tsx
  const currentAmount = parseFloat(formData.amount) || 0;
```

Converts amount text to number.

If amount is empty, uses 0.

---

```tsx
  const maxMessageLength = getMaxMessageLength(pricing.messageCharTiers, currentAmount);
```

Gets allowed message length.

---

```tsx
  const voiceMaxDuration = getVoiceMaxDuration(currentAmount, pricing.voiceDurationTiers);
```

Gets allowed voice duration.

---

```tsx
  const voiceRecorder = useVoiceRecorder(voiceMaxDuration);
```

Starts fake voice recorder logic.

---

# 19. Brand Color Calculations

```tsx
  const brandDark = adjustColor(brandColor, -50);
```

Creates darker version of brand color.

---

```tsx
  const brandLight = adjustColor(brandColor, 90);
```

Creates lighter version.

---

```tsx
  const brandRgb = hexToRgb(brandColor);
```

Converts brand color to RGB.

---

```tsx
  const brandRgbStr = `${brandRgb.r},${brandRgb.g},${brandRgb.b}`;
```

Makes RGB usable in CSS.

Example:

```txt
163,230,53
```

---

```tsx
  const bgImg = backgroundSrc ? `url(${backgroundSrc})` : "none";
```

If background image exists, use it. Otherwise none.

---

# 20. Toast Function

```tsx
  const showToast = (message: string, type: "error" | "success" = "error") => {
```

This shows popup.

---

```tsx
    setToastMsg({ message, type });
```

Sets popup content.

---

```tsx
    setTimeout(() => setToastMsg(null), 3000);
```

Hides popup after 3000 milliseconds.

### Change popup duration

Change:

```tsx
3000
```

To:

```tsx
5000
```

Now popup stays for 5 seconds.

---

# 21. Screen Scaling

```tsx
  const applyScale = useCallback(() => {
```

This makes sure the card fits on small screens.

Usually do not edit.

---

# 22. Input Change Handler

```tsx
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
```

This runs when user types in name, amount, or message.

---

```tsx
    const { name, value } = e.target;
```

Gets field name and typed value.

---

```tsx
    setFormData((prev) => ({ ...prev, [name]: value }));
```

Updates form data.

---

# 23. Donation Type Change Handler

```tsx
  const handleDonationTypeChange = (value: "text" | "voice" | "hypersound" | "media") => {
```

This runs when user clicks a donation type button.

---

```tsx
    setDonationType(value);
```

Sets selected type.

---

```tsx
    const amount =
      value === "voice"
        ? pricing.minVoice
        : value === "hypersound"
          ? pricing.minHypersound
          : value === "media"
            ? pricing.minMedia
            : pricing.minText;
```

Sets amount to minimum required for selected type.

Example:

If user clicks Voice, amount becomes `pricing.minVoice`.

---

```tsx
    setFormData({ name: formData.name, amount: String(amount), message: "" });
```

Keeps donor name, updates amount, clears message.

---

```tsx
    setSelectedHypersound(null);
    setMediaUrl(null);
    setMediaType(null);
```

Clears previous sound/media selection.

---

# 24. Form Submit Handler

```tsx
  const handleSubmit = async (e: React.FormEvent) => {
```

Runs when user clicks Support button.

---

```tsx
    e.preventDefault();
```

Stops page from refreshing.

---

## 24.1 Emoji Check

```tsx
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
```

Detects emojis.

---

```tsx
    if (emojiRegex.test(formData.name)) {
      showToast("Please remove emojis from your name", "error");
      return;
    }
```

If donor name has emoji, show error.

Reason: Emojis may break Text-To-Speech.

---

## 24.2 Basic Validation

```tsx
    const amount = Number(formData.amount);
```

Converts amount to number.

---

```tsx
    if (!formData.name || !amount || amount <= 0) {
      showToast("Enter valid name and amount", "error");
      return;
    }
```

Requires name and positive amount.

---

## 24.3 Minimum Amount Check

```tsx
    const minAmount =
      donationType === "voice"
        ? pricing.minVoice
        : donationType === "hypersound"
          ? pricing.minHypersound
          : donationType === "media"
            ? pricing.minMedia
            : pricing.minText;
```

Chooses minimum amount for selected type.

---

```tsx
    if (amount < minAmount) {
      showToast(`Minimum for ${donationType} is ${currencySymbol}${minAmount}`, "error");
      return;
    }
```

Shows error if amount too low.

---

## 24.4 Type-Specific Checks

```tsx
    if (donationType === "voice" && !voiceRecorder.audioBlob) {
      showToast("Please record a voice message", "error");
      return;
    }
```

Voice donation needs recording.

---

```tsx
    if (donationType === "hypersound" && !selectedHypersound) {
      showToast("Select a sound", "error");
      return;
    }
```

Sound donation needs selected sound.

---

```tsx
    if (donationType === "media" && !mediaUrl) {
      showToast("Upload a media file", "error");
      return;
    }
```

Media donation needs uploaded file.

---

```tsx
    await processPayment();
```

If all checks pass, start fake payment.

---

# 25. Fake Payment Processing

```tsx
  const processPayment = async () => {
```

This simulates payment.

---

```tsx
    setIsProcessingPayment(true);
```

Button becomes disabled and shows Processing.

---

```tsx
      await new Promise(resolve => setTimeout(resolve, 1500));
```

Waits 1.5 seconds.

### Change processing time

Change:

```tsx
1500
```

To:

```tsx
3000
```

Now waits 3 seconds.

---

```tsx
      showToast(`Successfully processed ${currencySymbol}${formData.amount} donation!`, "success");
```

Shows success popup.

---

```tsx
      setTimeout(() => {
        alert(`[MOCK REDIRECT]\nNavigating to: /status?order_id=mock_order_123&status=success`);
        setIsProcessingPayment(false);
      }, 1000);
```

After 1 second, shows fake redirect alert.

In real app, this would redirect to payment status page.

---

# 26. Message Character Progress

```tsx
  const msgPct = maxMessageLength > 0 ? (formData.message.length / maxMessageLength) * 100 : 0;
```

Calculates message progress percentage.

---

```tsx
  const msgClr = msgPct > 90 ? "var(--c-red)" : msgPct > 70 ? "var(--c-amber)" : "var(--brand)";
```

Changes progress bar color.

| Percentage | Color |
|---|---|
| Above 90% | Red |
| Above 70% | Amber |
| Otherwise | Brand color |

---

# 27. Donation Type Buttons Data

```tsx
  const TYPES = [
```

This defines the four donation type buttons.

---

```tsx
    { key: "text" as const, emoji: "💬", label: "Text", min: pricing.minText, tc: "c-tb-br", nc: "var(--brand)" },
```

Text button.

---

```tsx
    { key: "voice" as const, emoji: "🎤", label: "Voice", min: pricing.minVoice, tc: "c-tb-cy", nc: "var(--c-cyan)" },
```

Voice button.

---

```tsx
    { key: "hypersound" as const, emoji: "🔊", label: "Sound", min: pricing.minHypersound, tc: "c-tb-rd", nc: "var(--c-red)" },
```

Sound button.

---

```tsx
    { key: "media" as const, emoji: "🖼️", label: "Media", min: pricing.minMedia, tc: "c-tb-pu", nc: "var(--c-purple)" },
```

Media button.

---

## How to remove a button

Example: Remove Media button.

Delete this line:

```tsx
    { key: "media" as const, emoji: "🖼️", label: "Media", min: pricing.minMedia, tc: "c-tb-pu", nc: "var(--c-purple)" },
```

Then also delete or ignore the media UI section:

```tsx
{donationType === "media" && (
  ...
)}
```

Usually deleting from `TYPES` is enough to hide the button.

---

# 28. UI Layout Explained

```tsx
  return (
```

Starts the visible page.

---

## 28.1 Inject CSS

```tsx
      <style dangerouslySetInnerHTML={{ __html: BASE_STYLES }} />
```

This inserts the CSS block into the page.

Do not edit unless necessary.

---

## 28.2 Toast Popup

```tsx
      {toastMsg && <ToastContainer message={toastMsg.message} type={toastMsg.type} />}
```

If there is a toast message, show it.

---

## 28.3 Root Container

```tsx
      <div
        className="c-root c-page"
        style={
          {
            "--brand": brandColor,
```

This sets CSS variables.

| Variable | Meaning |
|---|---|
| `--brand` | Main brand color. |
| `--brand-dark` | Darker brand color. |
| `--brand-light` | Lighter brand color. |
| `--brand-rgb` | RGB version of brand color. |
| `--bg-img` | Background image. |

---

## 28.4 Background Layers

```tsx
        <div className="c-bg-layer" />
```

Adds glow background.

---

```tsx
        <div className="c-grid" />
```

Adds grid pattern.

---

## 28.5 Scale Wrapper

```tsx
        <div ref={wrapRef} className="c-scale-wrap" style={{ transformOrigin: "top center" }}>
```

Wrapper used for responsive scaling.

---

## 28.6 Main Card

```tsx
          <div ref={cardRef} className="c-card c-in">
```

Main donation card.

---

## 28.7 Hero Section

```tsx
            <div className="c-hero">
```

Top header area.

---

```tsx
              <div className="c-avatar-ring">
                <div className="c-avatar-inner">
                  <img src={logoSrc} alt={streamerName} className="c-avatar-img" />
                </div>
              </div>
```

Shows streamer logo/avatar.

---

```tsx
              <div className="c-hero-text">
                <div className="c-name">{streamerName}</div>
```

Shows streamer name.

---

```tsx
                <div className="c-hero-sub-row">
                  <div className="c-hero-tag">
                    <span style={{ fontSize: 8 }}>⚡</span>
                    <span className="c-hero-sub">{tagline}</span>
                  </div>
                </div>
```

Shows tagline.

Change tagline at bottom of file.

---

```tsx
              <div className="c-live" style={{ flexShrink: 0 }}>
                <div className="c-live-dot" />
                <span className="c-live-text">LIVE</span>
              </div>
```

Shows LIVE badge.

To remove LIVE badge, delete this block.

---

# 29. Form Fields Explained

```tsx
            <form onSubmit={handleSubmit}>
```

Starts form.

When submitted, runs `handleSubmit`.

---

## 29.1 Name Field

```tsx
                <div>
                  <label className="c-lbl">Your Name</label>
```

Label text.

Change:

```tsx
Your Name
```

To:

```tsx
Donor Name
```

If needed.

---

```tsx
                  <div className="c-iw">
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" required />
                  </div>
                </div>
```

Actual input field.

Change placeholder:

```tsx
placeholder="Enter your name"
```

To:

```tsx
placeholder="Who is supporting?"
```

---

## 29.2 Donation Type Buttons

```tsx
                <div>
                  <label className="c-lbl">Donation Type</label>
                  <div className="c-types">
                    {TYPES.map((t) => (
```

Loops through donation types and creates buttons.

---

```tsx
                        className={cn("c-tb", t.tc, donationType === t.key ? "c-on" : "")}
```

Adds selected style if button is active.

---

```tsx
                          <span className="c-tb-emoji">{t.emoji}</span>
```

Shows button emoji.

---

```tsx
                          <span
                            className="c-tb-name"
```

Shows button label.

---

```tsx
                          <span className="c-tb-min">
                            {currencySymbol}
                            {t.min}+
                          </span>
```

Shows minimum amount under button.

---

## 29.3 Amount Field

```tsx
                <div>
                  <label className="c-lbl">Amount</label>
```

Amount label.

---

```tsx
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="c-cur"
                    >
```

Currency dropdown.

---

```tsx
                      {SUPPORTED_CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.symbol} {c.code}
                        </option>
                      ))}
```

Creates currency options.

---

```tsx
                      <input
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange}
                        min="1"
                        placeholder="0"
                        required
                      />
```

Amount input.

### Change minimum amount input

Change:

```tsx
min="1"
```

To:

```tsx
min="10"
```

This only affects HTML input minimum. Real validation still uses `mockPricing`.

---

## 29.4 TTS Hint

```tsx
                  {pricing.ttsEnabled && (
                    <p className="c-hint">
                      ⚡ TTS above {currencySymbol}
                      {pricing.minTts}
                    </p>
                  )}
```

Shows TTS hint if enabled.

To disable it:

Find:

```tsx
ttsEnabled: true,
```

Change to:

```tsx
ttsEnabled: false,
```

---

## 29.5 Divider

```tsx
                <div className="c-div" />
```

Visual divider.

Delete if not needed.

---

## 29.6 Text Message Section

```tsx
                {donationType === "text" && (
```

Shows only when Text type is selected.

---

```tsx
                      <label className="c-lbl" style={{ margin: 0 }}>Message</label>
```

Message label.

---

```tsx
                      <span style={{ fontSize: 10, fontWeight: 800, color: msgClr }}>
                        {formData.message.length}/{maxMessageLength}
                      </span>
```

Character counter.

---

```tsx
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message (optional)"
                      className="c-ta"
                      rows={2}
                      maxLength={maxMessageLength}
                    />
```

Message input box.

Change placeholder:

```tsx
placeholder="Your message (optional)"
```

To:

```tsx
placeholder="Write something nice"
```

---

```tsx
                    <div className="c-cbar">
                      <div className="c-cbar-fill" style={{ width: `${msgPct}%`, background: msgClr }} />
                    </div>
```

Character progress bar.

---

## 29.7 Voice Section

```tsx
                {donationType === "voice" && (
```

Shows only when Voice type is selected.

---

```tsx
                    <label className="c-lbl">Voice Message</label>
```

Voice label.

---

```tsx
                    <div className="c-sp c-sp-cy">
```

Voice panel.

---

```tsx
                      <EnhancedVoiceRecorder
                        controller={voiceRecorder}
                        maxDurationSeconds={voiceMaxDuration}
                        requiredAmount={pricing.minVoice}
                        currentAmount={currentAmount}
                        brandColor="#06b6d4"
                        currencySymbol={currencySymbol}
                      />
```

Voice recorder component.

### Change voice recorder accent color

Change:

```tsx
brandColor="#06b6d4"
```

To another hex color.

---

## 29.8 HyperSound Section

```tsx
                {donationType === "hypersound" && (
```

Shows only when Sound type selected.

---

```tsx
                      <span style={{ fontSize: 16 }}>🔊</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#f87171" }}>HyperSounds</span>
```

Section title.

Change text:

```tsx
HyperSounds
```

To:

```tsx
Alert Sounds
```

---

```tsx
                    <HyperSoundSelector
                      selectedSound={selectedHypersound}
                      onSoundSelect={setSelectedHypersound}
                    />
```

Shows sound buttons.

---

## 29.9 Media Section

```tsx
                {donationType === "media" && (
```

Shows only when Media type selected.

---

```tsx
                      <span style={{ fontSize: 16 }}>🖼️</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#fcd34d" }}>Media Upload</span>
```

Media title.

---

```tsx
                    <MediaUploader
                      onMediaUploaded={(url: string, type: string) => {
                        setMediaUrl(url);
                        setMediaType(type);
                      }}
                    />
```

Media upload component.

---

## 29.10 Rewards Banner

```tsx
                <RewardsBanner amount={Number(formData.amount)} currency={selectedCurrency} />
```

Shows reward message if amount high enough.

---

## 29.11 Support Button

```tsx
                <div className="c-btn-wrap">
                  <button type="submit" className="c-btn" disabled={isProcessingPayment}>
```

Main submit button.

---

```tsx
                    {isProcessingPayment ? (
```

If processing, show spinner.

---

```tsx
                        <span className="c-spin" />Processing...
```

Spinner and processing text.

Change:

```tsx
Processing...
```

To:

```tsx
Please wait...
```

---

```tsx
                        <Heart style={{ width: 15, height: 15 }} />
                        Support {currencySymbol}
                        {formData.amount || "0"}
```

Normal button content.

Change button label:

```tsx
Support
```

To:

```tsx
Donate
```

Example:

```tsx
Donate {currencySymbol}
{formData.amount || "0"}
```

---

## 29.12 Terms Text

```tsx
                <p className="c-terms-note">
                  By clicking <strong>Support</strong>, you agree to our{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms &amp; Conditions
                  </a>
                </p>
```

Terms text.

Change link:

```tsx
href="/terms"
```

To your real terms page.

Change text freely.

---

## 29.13 RBI Note

```tsx
                <p style={{ fontSize: 9, fontWeight: 600, color: "rgba(156,163,175,0.28)", textAlign: "center", lineHeight: 1.5 }}>
                  Phone numbers collected by Razorpay as per RBI regulations
                </p>
```

Small legal note.

Edit or delete as needed.

---

## 29.14 Footer

```tsx
                <DonationPageFooter brandColor={brandColor} />
```

Shows footer.

Footer content is defined earlier in file.

---

# 30. Streamer Data Section

At bottom of file:

```tsx
export default function App() {
  return (
    <CustomDonationPage
      streamerSlug="m4ps"
      streamerName="M4PS"
      brandColor="#a3e635"
      logoSrc="https://placehold.co/100x100/a3e635/000000?text=M4PS"
      backgroundSrc="https://placehold.co/1920x1080/0a0810/1a1a1a?text=."
      tagline="Support M4PS"
    />
  );
}
```

This is the easiest section to edit.

---

## 30.1 Streamer Slug

```tsx
streamerSlug="m4ps"
```

Internal identifier.

Usually keep lowercase, no spaces.

---

## 30.2 Streamer Name

```tsx
streamerName="M4PS"
```

Displayed on page.

Change to:

```tsx
streamerName="CyberHell"
```

If needed.

---

## 30.3 Brand Color

```tsx
brandColor="#a3e635"
```

Main theme color.

Examples:

| Color | Hex |
|---|---|
| Lime | `#a3e635` |
| Red | `#ef4444` |
| Blue | `#3b82f6` |
| Purple | `#a855f7` |
| Gold | `#f59e0b` |
| Pink | `#ec4899` |

---

## 30.4 Logo

```tsx
logoSrc="https://placehold.co/100x100/a3e635/000000?text=M4PS"
```

Avatar image.

Change to local path:

```tsx
logoSrc="/assets/streamers/m4ps-logo.jpg"
```

---

## 30.5 Background

```tsx
backgroundSrc="https://placehold.co/1920x1080/0a0810/1a1a1a?text=."
```

Page background.

Change to local path:

```tsx
backgroundSrc="/assets/streamers/m4ps-bg.png"
```

---

## 30.6 Tagline

```tsx
tagline="Support M4PS"
```

Small text under streamer name.

Change freely:

```tsx
tagline="Fuel the stream"
```

---

# 31. Common Design Changes Cheat Sheet

Use Ctrl+F / Cmd+F and search for these.

---

## Change main color

Search:

```tsx
brandColor="#a3e635"
```

Change hex code.

---

## Change streamer name

Search:

```tsx
streamerName="M4PS"
```

Change text.

---

## Change tagline

Search:

```tsx
tagline="Support M4PS"
```

Change text.

---

## Change logo

Search:

```tsx
logoSrc=
```

Change URL/path.

---

## Change background

Search:

```tsx
backgroundSrc=
```

Change URL/path.

---

## Change minimum donation amounts

Search:

```tsx
const mockPricing = {
```

Edit:

```tsx
minText: 10,
minVoice: 50,
minHypersound: 100,
minMedia: 150,
```

---

## Change default currency

Search:

```tsx
useState("INR")
```

Change to:

```tsx
useState("USD")
```

---

## Add new currency

Search:

```tsx
const SUPPORTED_CURRENCIES = [
```

Add:

```tsx
{ code: "GBP", symbol: "£" },
```

---

## Change currency dropdown width

Search:

```css
.c-cur {
```

Change:

```css
min-width: 90px;
```

---

## Change card width

Search:

```css
.c-scale-wrap { width: 420px;
```

and:

```css
.c-card {
  width: 420px;
```

Change both.

---

## Change card corner radius

Search:

```css
.c-card {
```

Change:

```css
border-radius: 18px;
```

---

## Change font

Search:

```css
@import url(
```

Change font import.

Then search:

```css
font-family: 'Barlow', sans-serif;
```

Replace font name.

---

## Make streamer name bigger

Search:

```css
.c-name {
```

Change:

```css
font-size: 40px;
```

---

## Make avatar bigger

Search:

```css
.c-avatar-ring {
```

Change:

```css
width: 68px; height: 68px;
```

---

## Remove LIVE badge

Search:

```tsx
<div className="c-live"
```

Delete this block:

```tsx
<div className="c-live" style={{ flexShrink: 0 }}>
  <div className="c-live-dot" />
  <span className="c-live-text">LIVE</span>
</div>
```

---

## Change LIVE text

Search:

```tsx
LIVE
```

Change to:

```tsx
ONLINE
```

---

## Change donation type labels

Search:

```tsx
const TYPES = [
```

Edit:

```tsx
label: "Text"
```

Example:

```tsx
label: "Message"
```

---

## Change donation type emojis

Search:

```tsx
emoji: "💬"
```

Change emoji.

---

## Remove a donation type button

Search:

```tsx
const TYPES = [
```

Delete the unwanted line.

Example remove media:

```tsx
{ key: "media" as const, emoji: "🖼️", label: "Media", min: pricing.minMedia, tc: "c-tb-pu", nc: "var(--c-purple)" },
```

---

## Change message placeholder

Search:

```tsx
placeholder="Your message (optional)"
```

Change text.

---

## Change message box height

Search:

```tsx
rows={2}
```

Change to:

```tsx
rows={4}
```

---

## Change button text

Search:

```tsx
Support {currencySymbol}
```

Change `Support` to another word.

---

## Change processing text

Search:

```tsx
Processing...
```

Change text.

---

## Change terms text

Search:

```tsx
By clicking <strong>Support</strong>
```

Edit text.

---

## Change footer

Search:

```tsx
Powered by MockDonations
```

Edit text.

---

# 32. Safe Editing Rules

If you are not a developer, follow these rules.

## Rule 1: Only edit text inside quotes

Safe:

```tsx
streamerName="M4PS"
```

Change to:

```tsx
streamerName="CyberHell"
```

Also safe:

```tsx
tagline="Support M4PS"
```

Change to:

```tsx
tagline="Fuel the stream"
```

---

## Rule 2: Only edit numbers in known places

Safe:

```tsx
minText: 10,
```

Change to:

```tsx
minText: 25,
```

---

## Rule 3: Do not delete curly braces

These are important:

```tsx
{ }
```

Example:

```tsx
const mockPricing = {
  minText: 10,
};
```

Do not remove `{` or `}`.

---

## Rule 4: Do not delete parentheses

These are important:

```tsx
( )
```

---

## Rule 5: Do not delete backticks

CSS uses backticks:

```tsx
const BASE_STYLES = `
```

and ends with:

```tsx
`;
```

Do not remove them.

---

## Rule 6: If page goes blank

Usually something was deleted accidentally.

Undo with:

- Windows: `Ctrl + Z`
- Mac: `Cmd + Z`

Or restore the last working file.

---

# 33. How To Test Your Changes

After saving the file, check:

1. Page loads.
2. Name input works.
3. Donation type buttons switch correctly.
4. Amount updates.
5. Currency dropdown changes symbol.
6. Message counter works.
7. Voice recorder mock works.
8. Sound selector works.
9. Media file picker appears.
10. Support button shows processing and success alert.

---

# 34. How To Deploy To Vercel

## Method A: Deploy using GitHub

### Step 1: Push code to GitHub

Inside project folder:

```bash
git init
git add .
git commit -m "M4PS donation page"
```

Create repository on GitHub, then:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace:

```txt
YOUR_USERNAME
```

and:

```txt
YOUR_REPO
```

with your actual GitHub details.

---

### Step 2: Import into Vercel

Go to:

```txt
https://vercel.com/
```

Click:

```txt
Add New Project
```

Select your GitHub repository.

Vercel should auto-detect:

```txt
Vite
```

Leave defaults.

Click:

```txt
Deploy
```

Your page will be live.

---

## Method B: Deploy using Vercel CLI

Install Vercel CLI:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy:

```bash
vercel
```

Follow terminal prompts.

For production:

```bash
vercel --prod
```

---

# 35. How To Use Real Images On Vercel

If using local images:

Make sure images are inside:

```txt
public/assets/streamers/
```

Example:

```txt
public/assets/streamers/m4ps-logo.jpg
public/assets/streamers/m4ps-bg.png
```

Then code should use:

```tsx
logoSrc="/assets/streamers/m4ps-logo.jpg"
backgroundSrc="/assets/streamers/m4ps-bg.png"
```

Commit and push those files to GitHub.

Vercel will include them automatically.

---

# 36. How To Connect Real Backend Later

This preview uses mocks.

To connect real backend, a developer should replace these mock parts:

| Mock Part | Real Replacement |
|---|---|
| `mockPricing` | Fetch from Supabase/database. |
| `processPayment` | Call Razorpay order creation endpoint. |
| `useVoiceRecorder` | Real MediaRecorder + upload logic. |
| `MediaUploader` | Real storage upload. |
| `HyperSoundSelector` | Fetch sounds from database. |
| `toastMsg` | Replace with `sonner` toast if desired. |

The UI/CSS can remain mostly the same.

---

# 37. Troubleshooting

## Problem: `npm: command not found`

Install Node.js.

Then restart terminal.

---

## Problem: Page is blank

Check terminal for red error text.

Common causes:

- Deleted curly brace `{` or `}`.
- Deleted quote `"`.
- Deleted closing tag like `</div>`.
- Deleted backtick from CSS.

Undo recent changes.

---

## Problem: Image does not show

Check:

1. Image is inside `public/assets/streamers/`.
2. Path starts with `/`.
3. File name is exactly correct.

Example correct:

```tsx
logoSrc="/assets/streamers/m4ps-logo.jpg"
```

Incorrect:

```tsx
logoSrc="assets/streamers/m4ps-logo.jpg"
```

Also incorrect:

```tsx
logoSrc="m4ps-logo.jpg"
```

---

## Problem: Local server port busy

Run:

```bash
npm run dev -- --port 3000
```

Then open:

```txt
http://localhost:3000
```

---

## Problem: Vercel build fails

Make sure you committed all files.

Check that these exist:

```txt
package.json
vite.config.ts
index.html
src/App.tsx
src/main.tsx
```

---

# 38. Handover Checklist

Before handing this project to someone, confirm:

- [ ] They have Node.js installed.
- [ ] They can run `npm install`.
- [ ] They can run `npm run dev`.
- [ ] They know the main file is `src/App.tsx`.
- [ ] They know where to change streamer name.
- [ ] They know where to change brand color.
- [ ] They know where to change logo/background.
- [ ] They know where to change pricing.
- [ ] They know how to deploy to Vercel.
- [ ] They know this is a mock preview, not real payments.

---

# 39. Quick Reference Card

| Task | Where To Edit |
|---|---|
| Streamer name | Bottom `streamerName` |
| Brand color | Bottom `brandColor` |
| Logo | Bottom `logoSrc` |
| Background | Bottom `backgroundSrc` |
| Tagline | Bottom `tagline` |
| Minimum amounts | `mockPricing` |
| Currencies | `SUPPORTED_CURRENCIES` |
| Sound names | `HyperSoundSelector` |
| Reward threshold | `RewardsBanner` |
| Footer text | `DonationPageFooter` |
| Fonts | `BASE_STYLES` font import |
| Card width | `.c-scale-wrap` and `.c-card` |
| Button text | Support button JSX |
| Terms text | `.c-terms-note` |
| LIVE badge | `.c-live` JSX block |

---

# 40. Final Note

This page is intentionally self-contained.

For design changes, most edits happen in:

```txt
BASE_STYLES
```

For content changes, most edits happen in:

```txt
mockPricing
TYPES
App()
```

For behavior changes, most edits happen in:

```txt
handleSubmit
processPayment
useVoiceRecorder
MediaUploader
HyperSoundSelector
```

If you only need to make the page look different, focus on:

1. Bottom streamer data.
2. `BASE_STYLES`.
3. `TYPES`.
4. `mockPricing`.

Do not worry about the more complex React logic unless you need to change behavior.
```
