// server/controllers/summaryController.js
import { log, error } from "../utils/logger.js";
import { getSummary } from "../business/services/summaryService.js";

const getTransactionsSummary = async (req, res) => {
  try {
    const { userId } = req.body;
    const data = await getSummary(userId);

    log(`Transactions summary retrieved successfully!`);
    res.status(200).json({ data });
  } catch (err) {
    error(`Failed to get transactions summary: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { getTransactionsSummary };
