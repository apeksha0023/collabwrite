const express = require("express");
const router = express.Router();
const { createDocument, getDocument, saveDocument } = require("../controllers/documentController");
const auth = require("../middleware/authMiddleware");  // Import auth middleware

// Route to create a document (protected)
router.post("/", auth, createDocument);

// Route to get a document by ID
router.get("/:id", auth, getDocument);

// Route to save content to a document
router.put("/:id", auth, saveDocument);

module.exports = router;