# WealthWise

WealthWise is a personal finance tracking application designed to help users manage their income, expenses, financial goals, budgets, and reports. The app provides a user-friendly interface for managing financial transactions and setting goals, giving users insights into their financial status.

## Table of Contents

- **Features**
- **Tech Stack**
- **Project Structure**
- **Setup and Installation**
- **Usage**
- **Database Schema**
- **Contributing**
- **License**

## Features

- **User Authentication:** Secure login and registration using Passport.js.
- **Income and Expense Tracking:** Track your financial transactions by categorizing them as income or expenses.
- **Financial Goals:** Set and track your financial goals (e.g., saving for a trip, debt repayment).
- **Budget Planning:** Create and manage your monthly budgets.
- **Reports:** View financial reports to understand your spending habits and income trends.
- **Responsive Design:** Optimized for various screen sizes with media queries.

## Tech Stack

### Backend

- **Node.js:** Backend framework
- **Express.js:** Web application framework for handling routes and requests
- **Sequelize:** ORM for database management
- **Passport.js:** User authentication and session management

### Frontend

- **React:** Frontend library for building the user interface
- **React Router:** Handles client-side routing for seamless page transitions
- **CSS Modules:** Used for styling individual components

### Database

- **PostgreSQL:** Relational database for storing user and financial data
- **Sequelize ORM:** For defining models and managing database associations

## Project Structure

```bash
WealthWise/
├── server/
│   ├── business/
│   │   └── services/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   │   ├── models/
│   │   ├── database/
│   │   └── repositories/
│   ├── middlewares/
│   ├── public/
│   ├── routes/
│   ├── utils/
│   ├── middleware.js
│   ├── routes.js
│   └── app.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── index.html
│   └── package.json
├── README.md
└── package.json
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (installed and running)
- npm (Node Package Manager)

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/akinmertbur/WealthWise.git
cd wealthwise/server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `server` directory and add the following environment variables:

```bash
username: your_username
host: localhost
database: your_database
password: your_password
PORT: your_PORT
DATABASE_URL=postgres://username:password@localhost:5432/wealthwise
SESSION_SECRET=your_SESSION_SECRET
```

4. Start the server (Sequelize will automatically handle migrations):

```bash
npm start
```

### Frontend Setup

1. Navigate to the client folder:

```bash
cd ../client
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend application:

```bash
npm start
```

4. The app will be running at `http://localhost:3000`.

## Usage

1. Register for a new account or log in using an existing account.

2. Navigate through the dashboard to:

    - Add income or expense transactions.
    - Set financial goals in the Goals section.
    - Create a budget and track your spending.
    - Generate reports to get an overview of your financial situation.

## Database Schema

### Users

- `id`
- `username`
- `email`
- `password` 

### Transactions

- `id`
- `userId`
- `categoryId`
- `amount`
- `date`
- `type` (income/expense)
- `description`
- `currency`

### Categories

- `id`
- `name`
- `description`

### Goals

- `id`
- `userId`
- `name`
- `targetAmount`
- `currentAmount`
- `deadline`
- `priorityLevel`
- `status`

### Budgets

- `id`
- `userId`
- `categoryId`
- `month`
- `year`
- `plannedAmount`
- `actualAmount`
- `carryoverAmount`
- `budgetAlertThreshold`

### Reports
- `id`
- `userId`
- `reportType`
- `reportData`
- `month`
- `year`

## Contributing

We welcome contributions! Feel free to submit issues or pull requests to improve the project. Please ensure all pull requests are tested.

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.

## License
This project is licensed under the `MIT License`. See the `LICENSE` file for details.
