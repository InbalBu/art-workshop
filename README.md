# 🎨 Creative Workshops – Landing Page

A warm, artistic landing page for creative workshops, designed for a Hebrew (RTL) audience.  
The site presents upcoming workshops, allows simple registration, and enables easy, non-technical management through Supabase.

Built with a strong focus on human-centered design, simplicity, and long-term maintainability.

---

## ✨ Project Goals

- Present creative workshops in a calm, inviting, non-salesy way  
- Allow visitors to register easily without friction  
- Enable workshop hosts to manage dates and availability independently  
- Maintain a warm, handmade aesthetic (not a generic “AI-looking” product)  
- Deliver a production-ready, scalable frontend architecture

---

## 🖌️ Design & UX

- Warm, artistic, human-centered design  
- Soft serif typography for headings  
- Natural color palette (terracotta, sage, cream tones)  
- Full Hebrew + RTL support  
- Subtle shadows, rounded cards, gentle hover states  
- Fully responsive (mobile-first)

---

## 🧩 Features

- **Full landing page**  
  - Hero  
  - About  
  - Workshop Details  
  - What’s Included  
  - Schedule  
  - Registration  
  - Footer  

- **Dynamic workshop schedule**
  - Data fetched from Supabase
  - Displays date, time, location
  - Shows remaining seats
  - Automatically marks sessions as “Full”

- **Registration flow**
  - Checks seat availability
  - Inserts registration into database
  - Decreases available seats
  - User-friendly success / error messages (Hebrew)

- **Prepared for future expansion**
  - Admin dashboard
  - Email automation
  - Authentication
  - Advanced workshop management

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Supabase**
  - Database
  - Client SDK
- **Netlify** (deployment)

---

## 📦 Project Structure

```txt
src/
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── WorkshopDetails.tsx
│   ├── WhatIsIncluded.tsx
│   ├── Schedule.tsx
│   ├── Registration.tsx
│   └── Footer.tsx
├── lib/
│   └── supabase.ts
├── App.tsx
└── main.tsx

```
## 🗄️ Database Schema (Supabase)
**sessions**
- id (uuid)
- date (text)
- time (text)
- location (text)
- max_seats (int)
- seats_left (int)
- status (text)

**registrations**
- id (uuid)
- session_id (uuid)
- name (text)
- email (text)
- message (text)
- created_at (timestamp)
- status (text)

## ❤️ Notes

This project was built with a strong focus on:
- Learning by doing
- Clean, maintainable architecture
- Real-world production practices
- A genuinely human user experience

