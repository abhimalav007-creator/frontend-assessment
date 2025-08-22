# AI Interface Prototype

A frontend-only AI interface prototype built as part of the **Frontend & UI/UX Designer Assessment**.  
Developed using **Next.js (TypeScript)** + **Tailwind CSS**, deployed on **Vercel/Netlify**.  

---

## 🔍 1. Research

I reviewed 4 AI platforms to identify the best features:

1. **OpenAI Playground**  
   - Clean parameter controls (temperature, max tokens).  
   - Easy model selection with dropdown.  

2. **Hugging Face Spaces**  
   - Simple, responsive layouts.  
   - Easy template demos with load/run buttons.  

3. **Anthropic Claude UI**  
   - Smooth chat interface with persistent history.  
   - Minimalist theme with focus on conversation.  

4. **Microsoft Copilot Lab**  
   - Strong prompt templates with save/load capability.  
   - Interactive, polished UI with clear action buttons.  

### ✅ Chosen Features
- Model Selector (dropdown)  
- Prompt Editor (save/load templates)  
- Parameters Panel (temperature, max tokens sliders)  
- Chat / Output Area (prompt + response, copy/download)  
- Theme Toggle (light/dark, persisted)  
- Responsive Layout  

---

## 🎨 2. Design / Mockup

**Note:** I do not have Figma or UI/UX design experience, so the mockup is represented via descriptions and layout documentation.  
My focus is **frontend & backend development**; UI/UX design skills are limited.

### Layout Overview
- **Header:** 
  - Left: App Title → "AI Interface Prototype"
  - Right: Model Selector dropdown + Theme Toggle (🌞 / 🌙)
- **Sidebar (Left Panel):**
  - Model Selector
  - Parameters Panel → Temperature & Max Tokens sliders
  - Action Buttons → Copy JSON, Download JSON
- **Main Panel (Right Panel):**
  - Prompt Editor → Textarea for user input
  - Chat / Output Area → Displays user prompts and assistant responses

### Tailwind Mapping
- **Spacing:** `p-4`, `m-4`, `gap-4` consistently used for layout and components  
- **Typography:** `text-2xl font-bold` for headings, `text-sm font-medium` for labels  
- **Colors:**  
  - Light mode → `bg-gray-50 text-gray-900`  
  - Dark mode → `bg-gray-900 text-gray-100`  
- **Components:**  
  - Buttons → `rounded-lg px-4 py-2 shadow hover:opacity-80`  
  - Inputs → `border rounded-lg p-2 focus:ring`  

### Responsive Design
- Layout adapts to mobile and desktop:  
  - Desktop → Sidebar + Main Panel side-by-side  
  - Mobile → Sidebar collapses / stacks above main panel  

---

## ⚙️ 3. Development

### Implemented Features
- **Model Selector** → dropdown fetching mock API models  
- **Prompt Editor** → textarea with save/load JSON templates  
- **Parameters Panel** → sliders for temperature, max tokens  
- **Chat Area** → messages displayed with copy + download JSON actions  
- **Theme Toggle** → light/dark mode, persisted via `localStorage`  
- **Mock API** → `/pages/api/models.ts` and `/pages/api/templates.ts`  
- **State Management** → React Context for theme & session  

### Accessibility & UX
- Keyboard-navigable inputs  
- ARIA labels added on buttons  
- Smooth hover/focus animations with Tailwind + Framer Motion  

### Storybook
Stories written for:  
- Button  
- Slider  
- Modal  
- ChatBubble  

---

## 🚀 Deployment

### Run Locally
```bash
git clone <repo-url>
cd ai-interface
npm install
npm run dev
