# 🚀 Flowbit – Multi-Tenant Ticketing System

Flowbit is a secure, multi-tenant ticket management platform with role-based access control, tenant isolation, and email confirmations.

---

## ✨ Features
- ✅ Admin & Customer Roles
- ✅ Tenant-aware access control
- ✅ Secure JWT Auth
- ✅ Ticket creation & updates
- ✅ Audit logging
- ✅ Email confirmation on signup

---

## ⚙️ Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML
- **Auth**: JWT
- **Mail**: Nodemailer
- **Docker**: MongoDB container
- **Testing**: Jest + Cypress

---

## 🧪 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Yokiii18/flowbit.git
cd flowbit/backend
npm install
2. set env 
PORT=5000
MONGO_URL=mongodb://localhost:27017/flowbit
JWT_SECRET=yourSecret
EMAIL_USER=you@gmail.com
EMAIL_PASS=yourAppPassword
