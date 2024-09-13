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
