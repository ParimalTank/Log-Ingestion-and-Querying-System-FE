# 📊 Log Ingestion & Querying System – Frontend

A modern, responsive frontend built with **React**, **Vite**, **TypeScript**, and **Material UI (MUI)** that enables users to query and visualize application logs efficiently. This UI allows dynamic filtering based on log levels, resource IDs, message contents, and timestamp ranges — similar to professional tools like **Datadog**, **Grafana Loki**, or **Splunk**.

---

## 🚀 Features

- 🔍 **Dynamic Filtering**

  - Full-text search in message field
  - Dropdown to filter by log level (`info`, `warn`, `error`)
  - Text input for `resourceId`
  - Date pickers for timestamp range filtering

- 📋 **Responsive Log List**

  - Visually distinguished log levels with color-coded cards
  - Timestamp, traceId, commit, and metadata info displayed per log

- ⚡ **Fast & Optimized**
  - Built using **Vite** for blazing-fast dev environment
  - Leveraging **MUI** components for accessibility and responsive design

---

## 🧱 Tech Stack

| Tool                | Purpose                         |
| ------------------- | ------------------------------- |
| Vite                | React bundler & fast dev server |
| React               | UI library                      |
| TypeScript          | Static typing                   |
| Material UI (MUI)   | Component library               |
| Day.js              | Lightweight date handling       |
| @mui/x-date-pickers | Date range picker component     |

---

## ▶️ Getting Started

### 1. Install dependencies

```bash
npm install
```

---

### 2. Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

---

---

### 3. Run the app in development

```bash
npm run dev
```

---

### 3. Then open the app in your browser

```bash
http://localhost:5173
```

## 💡 Inspired By

This frontend mimics functionality from industry-standard log management tools:

- [Grafana Loki](https://grafana.com/oss/loki/)  
  Open-source log aggregation system built for efficiency and performance.

- [Datadog Logs](https://www.datadoghq.com/product/log-management/)  
  A cloud-based monitoring and analytics platform with powerful log filtering and visualization.

- [Splunk Log Observer](https://www.splunk.com/)  
  Enterprise-grade log analytics with real-time observability and rich dashboards.

> These tools inspired the clean UX, filtering interface, and visual distinction of log severity levels.
