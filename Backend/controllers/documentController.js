const Document = require("../models/Document");

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const doc = await Document.create({
      title: req.body.title || "Untitled",  // Default to "Untitled" if no title is provided
      content: "",
      createdBy: req.user.id,  // Use the authenticated user's ID
    });
    res.status(201).json(doc);  // Return the newly created document
  } catch (err) {
    res.status(400).json({ error: err.message });  // Return error if the creation fails
  }
};

// Get a document by ID
exports.getDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Save content to a document
exports.saveDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }  // Return the updated document
    );
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(doc);  // Return the updated document
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};