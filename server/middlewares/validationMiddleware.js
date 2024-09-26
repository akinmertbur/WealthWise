// server/middlewares/validationMiddleware.js
import { check, validationResult } from "express-validator";

export const validateCreateUser = [
  check("username").notEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  check("username").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditPassword = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAddTransaction = [
  check("userId").notEmpty().withMessage("User Id is required!"),
  check("categoryId").notEmpty().withMessage("Category Id is required!"),
  check("amount").notEmpty().withMessage("Amount cannot be empty!"),
  check("transactionType")
    .notEmpty()
    .withMessage("Transaction type cannot be empty!"),
  check("description").notEmpty().withMessage("Description cannot be empty!"),
  check("transactionDate")
    .notEmpty()
    .withMessage("Transaction date cannot be empty!"),
  check("currency").notEmpty().withMessage("Currency cannot be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditTransaction = [
  check("transactionId").notEmpty().withMessage("Transaction Id is required!"),
  check("userId").notEmpty().withMessage("User Id is required!"),
  check("categoryId").notEmpty().withMessage("Category Id is required!"),
  check("amount").notEmpty().withMessage("Amount cannot be empty!"),
  check("transactionType")
    .notEmpty()
    .withMessage("Transaction type cannot be empty!"),
  check("description").notEmpty().withMessage("Description cannot be empty!"),
  check("transactionDate")
    .notEmpty()
    .withMessage("Transaction date cannot be empty!"),
  check("currency").notEmpty().withMessage("Currency cannot be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateDeleteTransaction = [
  check("transactionId").notEmpty().withMessage("Transaction Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetTransactionDetail = [
  check("transactionId").notEmpty().withMessage("Transaction Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetAllTransactions = [
  check("userId").notEmpty().withMessage("User Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAddGoal = [
  check("userId").notEmpty().withMessage("User Id is required!"),
  check("goalName").notEmpty().withMessage("Goal name cannot be empty!"),
  check("targetAmount")
    .notEmpty()
    .withMessage("Target amount cannot be empty!"),
  check("currentAmount")
    .notEmpty()
    .withMessage("Current amount cannot be empty!"),
  check("deadline").notEmpty().withMessage("Deadline cannot be empty!"),
  check("priorityLevel")
    .notEmpty()
    .withMessage("Priority level cannot be empty!"),
  check("status").notEmpty().withMessage("Status cannot be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditGoal = [
  check("goalId").notEmpty().withMessage("Goal Id is required!"),
  check("userId").notEmpty().withMessage("User Id is required!"),
  check("goalName").notEmpty().withMessage("Goal name cannot be empty!"),
  check("targetAmount")
    .notEmpty()
    .withMessage("Target amount cannot be empty!"),
  check("currentAmount")
    .notEmpty()
    .withMessage("Current amount cannot be empty!"),
  check("deadline").notEmpty().withMessage("Deadline cannot be empty!"),
  check("priorityLevel")
    .notEmpty()
    .withMessage("Priority level cannot be empty!"),
  check("status").notEmpty().withMessage("Status cannot be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateDeleteGoal = [
  check("goalId").notEmpty().withMessage("Goal Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetGoalDetail = [
  check("goalId").notEmpty().withMessage("Goal Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetAllGoals = [
  check("userId").notEmpty().withMessage("User Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditCurrentAmount = [
  check("goalId").notEmpty().withMessage("Goal Id is required!"),
  check("currentAmount")
    .notEmpty()
    .withMessage("Current amount of the goal is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAddBudget = [
  check("userId").notEmpty().withMessage("User Id is required!"),
  check("categoryId").notEmpty().withMessage("Category Id is required!"),
  check("month").notEmpty().withMessage("Month cannot be empty!"),
  check("year").notEmpty().withMessage("Year cannot be empty!"),
  check("plannedAmount")
    .notEmpty()
    .withMessage("Planned Amount cannot be empty!"),
  check("actualAmount")
    .notEmpty()
    .withMessage("Actual Amount cannot be empty!"),
  check("carryoverAmount")
    .notEmpty()
    .withMessage("Carryover Amount cannot be empty!"),
  check("budgetAlertThreshold")
    .notEmpty()
    .withMessage("Budget Alert Threshold cannot be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditBudget = [
  check("budgetId").notEmpty().withMessage("Budget Id is required!"),
  check("userId").notEmpty().withMessage("User Id is required!"),
  check("categoryId").notEmpty().withMessage("Category Id is required!"),
  check("month").notEmpty().withMessage("Month cannot be empty!"),
  check("year").notEmpty().withMessage("Year cannot be empty!"),
  check("plannedAmount")
    .notEmpty()
    .withMessage("Planned Amount cannot be empty!"),
  check("actualAmount")
    .notEmpty()
    .withMessage("Actual Amount cannot be empty!"),
  check("carryoverAmount")
    .notEmpty()
    .withMessage("Carryover Amount cannot be empty!"),
  check("budgetAlertThreshold")
    .notEmpty()
    .withMessage("Budget Alert Threshold cannot be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateDeleteBudget = [
  check("budgetId").notEmpty().withMessage("Budget Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetBudgetDetail = [
  check("budgetId").notEmpty().withMessage("Budget Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetAllBudgets = [
  check("userId").notEmpty().withMessage("User Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetAllBudgetsByPeriod = [
  check("userId").notEmpty().withMessage("User Id is required!"),
  check("month").notEmpty().withMessage("Month cannot be empty!"),
  check("year").notEmpty().withMessage("Year cannot be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetCategoryDetail = [
  check("categoryId").notEmpty().withMessage("Category Id is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
