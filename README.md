# Leave Management App

This project is a mobile application designed to simplify the process of requesting and managing leaves for HR personnel and employees. It provides an efficient, centralized platform to handle leave requests, approvals, and tracking.

---

## Tech Stack

- **React Native**: For building the mobile application.
- **Express**: Backend framework for API handling.
- **Node.js**: Server-side JavaScript runtime.
- **Sequelize**: ORM for database management.
- **Expo**: For React Native development and testing.

---

## Key Features

- **Ease of Use**: Intuitive UI for employees to request leaves and HR to manage them.
- **Centralized Management**: Streamlined process for leave approvals and tracking.
- **Scalable Design**: Built with scalability in mind to handle organizational growth.

---

## Installation and Setup

### Backend Setup

1. Navigate to the `back` directory:
   ```bash
   cd back
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your database configuration (e.g., DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, etc.). Example:
   ```env
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=3306
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   Leave this terminal running.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```
4. Follow the instructions displayed in the terminal to open the app on your device or emulator.

---

## Project Status

This project is a work in progress. While it lays the foundation for an effective leave management system, several enhancements are needed:

- **Integration**: Backend and frontend linking is incomplete.

---

## Why This Project Matters

- **Time-Saving**: Replaces manual leave management processes, reducing errors and saving time.
- **Transparency**: Provides clear visibility into leave statuses and balances.
- **Modern Solution**: Leverages modern technology to address traditional HR challenges.

---

Feel free to contribute or suggest improvements to make this app better! Together, we can create an efficient tool for leave management.

