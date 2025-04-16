# 📦 StockHub - Stock Management System <br>
StockHub is a modern and responsive stock management system built to help businesses <br>
efficiently manage their inventory, customers, sales, and suppliers. <br>
Designed with simplicity and usability in mind, it includes insightful dashboards, smart analytics, and light/dark mode support.


## ✨Features
🧾 Dashboard Overview: Displays key statistics (Total Products, Customers, Sales, Out of Stock).

📦 Product Management: Add, view, update, and delete products.

📂 Category Management: Organize your stock by categories.

📥 Stock-In & 📤 Stock-Out: Track incoming and outgoing inventory.

👥 Customer Records: Manage customer information with ease.

🚚 Supplier Management: Add and update supplier details.

🌙 Dark/Light Mode: Switch themes for user preference.

📊 Charts & Insights: Visualize top-selling products and inventory status.

## 🛠️ Technologies Used
Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: Session-based login

Charts: Recharts.js

Icons: FontAwesome, Lucide

## 📸 Preview
Light/Dark mode toggle, insightful graphs, and responsive design


## 🚀 Installation
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/ngabodaniel1000/stockhub.git
cd stockhub
2. Install Dependencies
bash
Copy
Edit
### For backend
cd server
npm install

### For frontend
cd ../client
npm install
3. Set Environment Variables
Create a .env file in the server/ directory with:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
4. Start the Development Server
bash
Copy
Edit
### In server/
npm run dev

### In client/
npm start
Open your browser at http://localhost:3000.

## 🔐 Authentication
Users must log in to access the system.

Sessions are used to manage authentication.

Admin approval required for account creation (optional feature).

## 📈 Insights
View top-selling products.

Monitor inventory status (In Stock, Low Stock, Out of Stock).

Analyze sales and customer growth trends.

## Contact 📞
Feel free to reach out for feedback or suggestions:

Email: ngabodaniel1000@gmail.com <br>
GitHub: [ngabodaniel](https://github.com/ngabodaniel1000/)

## find bug ❓
if you found an issue or bug in project feel free you can contact us on Email: nezahakim05@gmail.com

## author ✍️
view the author of this readme file [Ngabo Daniel](https://www.linkedin.com/in/ngabo-daniel-011118283)
📝 ## License
This project is licensed under the MIT License - see the LICENSE file for details.
