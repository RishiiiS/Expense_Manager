# Project Title  
Smart Expense Manager – Full Stack Web Application

## Problem Statement  
Users often struggle to manage daily expenses, stay within budgets, and understand spending patterns. Existing tools are either too complex or lack meaningful insights.

This project aims to build a Smart Expense Manager that allows users to track expenses, categorize spending, set monthly budgets, and receive weekly summaries with analytics.

Backend design is the primary focus, following software engineering and system design principles.

---

## Scope  

A full-stack web application that provides:

- Secure authentication
- Expense tracking
- Budget planning
- Weekly & monthly analytics
- Clean dashboard UI

---

## Key Features  

### Authentication & Security
- JWT authentication
- Google OAuth
- Password hashing (bcrypt)
- Refresh tokens
- Role-based access

### Expense Management
- Add / edit / delete expenses
- Categorize expenses (Food, Travel, Shopping, Bills, etc.)
- Date-based filtering
- Notes per expense

### Budget Planning
- Monthly budget setting
- Category-wise limits
- Overspending alerts
- Remaining budget calculation

### Analytics
- Weekly summaries
- Monthly reports
- Category-wise breakdown
- Spending trends

### UI
- React dashboard
- Charts for visualization
- Simple expense entry forms

---

## Tech Stack

Frontend:
- React
- Tailwind CSS
- Chart.js

Backend:
- Node.js
- Express.js
- REST APIs
- JWT + Google OAuth

Database:
- PostgreSQL / MongoDB

---

## Backend Architecture

Controller → Service → Repository pattern

Folder Structure:

backend/
controllers  
services  
repositories  
models  
routes  
middlewares  
config  

---

## Design Principles

- OOP (Encapsulation, Abstraction, Inheritance, Polymorphism)
- Separation of concerns
- Repository Pattern
- Service Layer
- Factory Pattern (Auth Providers)
- Singleton (DB Connection)

---

## Future Enhancements
- AI-based spending predictions
- PDF exports
- Email reminders
- Mobile app
