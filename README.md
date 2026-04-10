# 🚀 Load Tester (React + Express + TypeScript)

A simple yet powerful **API Load Testing Tool** built using React and Express.
This project helps simulate multiple requests to an API and measure its performance under load.

---

## 📌 Features

* 🔥 Send multiple requests to any API
* ⚡ Parallel execution using Promise.all
* 📊 Measure:

  * Total Requests
  * Success & Failure Count
  * Average Response Time
  * Min & Max Response Time
* 🧠 Built with TypeScript for type safety
* 🌐 Simple UI for testing APIs

---

## 🧠 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Axios

### Backend

* Node.js
* Express.js
* TypeScript
* Axios

---

## ⚙️ How It Works

1. User enters:

   * API URL
   * HTTP Method (GET/POST)
   * Number of Requests

2. Frontend sends request to backend

3. Backend:

   * Fires multiple requests in parallel
   * Measures response time
   * Collects results

4. Returns statistics to frontend

---

## 📊 Sample Response

```json
{
  "total": 50,
  "success": 50,
  "failed": 0,
  "avgTime": 185.22,
  "minTime": 112,
  "maxTime": 381
}
```

👉 All response times are in **milliseconds (ms)**

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/load-tester.git
cd load-tester
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 🧪 API Endpoint

### POST /api/test

#### Request Body:

```json
{
  "url": "https://jsonplaceholder.typicode.com/posts",
  "method": "GET",
  "totalRequests": 50
}
```

---

## ⚠️ Limitations (Current Version)

* ❌ No concurrency control (may crash on very high load)
* ❌ No retry mechanism
* ❌ No rate-limit handling (429)
* ❌ No distributed load

---

## 🔥 Future Improvements

* ✅ Concurrency control (batching)
* ✅ Worker Threads
* ✅ Redis Queue (BullMQ)
* ✅ Rate limit handling (429 detection)
* ✅ Graph visualization (Recharts)
* ✅ Docker support

---

## 💡 Learnings

This project demonstrates:

* Parallel request handling
* Performance measurement
* Backend system behavior under load
* Basics of system design

---

## 🧠 Interview Explanation

> This project simulates concurrent API requests to evaluate performance, measure response times, and identify system bottlenecks under load.

---

## 📌 Author

Sai Sourya

---

## ⭐ Give a Star

If you found this useful, give it a ⭐ on GitHub!
