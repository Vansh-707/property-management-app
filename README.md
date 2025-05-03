# 🏢 Property Management System

A full-stack web application built with **Node.js**, **PostgreSQL**, and **Angular** to manage properties, floors, and units. Features include property creation, unit booking, and viewing detailed nested property structures.

---

## 🚀 Tech Stack

**Frontend:** Angular 15+  
**Backend:** Node.js + Express  
**Database:** PostgreSQL  
**ORM/Query Tool:** pg (node-postgres)  
**Authentication (Optional):** JWT  
**Deployment (Optional):** Render / Railway / Vercel  

---

## 📂 Folder Structure Overview

### Backend
property-management-backend/
├── src/
| ├── config/
│ ├── controllers/
│ ├── routes/
│ ├── services/
| ├── middleware/
│ ├── models/
│ ├── db/
├── app.js
├── server.js

### Frontend
property-management-frontend/
├── src/
| ├── app/
| │ ├── components/
| │ ├── services/
| │ ├── models/
| │ ├── interceptors/
  

---

## 🧪 Features

- Add Properties, Floors, and Units
- View full nested Property → Floors → Units
- Book available Units
- View list of available Units
- Basic validation and error handling
- JWT Authentication for booking

---

## 🧰 Setup Instructions

### 🖥 Backend Setup

cd property-management-backend
npm install
npm run dev

### 🖥 Frontend Setup
cd property-management-frontend
npm install
ng serve

📡 API Endpoints Summary
Method	Endpoint	Description
POST	/properties	Create a new property
POST	/floors	Create a floor under a property
POST	/units	Create a unit under a floor
GET	/properties/:id/details	Get full nested property details
PUT	/units/:id/book	Book a unit
GET	/units/available	Get all available units

📺 Demo link :-
Live Demo: https://your-deployment-url.com
