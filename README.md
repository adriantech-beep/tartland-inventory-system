# 🏭 Production Tracking System – Mixture-Based Inventory

A full-stack production tracking system designed to manage product output based on **mixtures**, deduct **raw materials** from inventory, and restore them upon deletion — all with precision and accuracy.

---

## 🚀 Features

### ✅ Production Logging
- Create production entries by selecting a mixture and quantity.
- Calculates jars produced and bundles (85 jars per bundle).
- Deducts material (flakes, choco, jars) based on mixture formula.

### ♻️ Smart Inventory Deduction
- Deducts `bags` and `boxes` based on mixture-to-bag rules.
- Tracks exact grams used and leftover bags.
- Jar deduction is based on total grams used (e.g., 11.31 jars per mixture × 70g = ~792 jars).



### 🔁 Real-Time React Query UI
- Uses `react-query` for live data caching and invalidation.
- Invalidate keys: `["summary"]`, `["productions"]` to ensure accurate data.

---

## 🛠️ Tech Stack

| Layer       | Tech Used                                    |
|-------------|----------------------------------------------|
| Frontend    | React,TypeScript, TailwindCSS, React Query   |
| State Mgmt  | React Query                                  |
| Backend     | Node.js, Express                             |
| Database    | MongoDB + Mongoose                           |
| Deployment  | Vercel (Frontend), Render (Backend)          |

---

## 🧮 Mixture Formula

For example: **Pure Crunch**

- **Flakes per mixture**: 3 bags = 1.5kg
- **Jar size**: ~70g
- **1 mixture ≈ 11.31 jars**
- **85 jars = 1 bundle**

🧾 Example (70 mixtures):
- ✅ Flakes: 210 bags
- ✅ Jars: 791.7 jars (≈ 9.31 bags of jars)
- ✅ Bundles: 44





