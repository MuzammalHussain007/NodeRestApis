const express = require("express");
const auth = require("../middleware/auth");
const noteRouter = express.Router();
const {
  createNote,
  updateNote,
  deleteNote,
  getNote,
} = require("../controller/noteController");

noteRouter.post("/addnote", auth, createNote);
noteRouter.get("/getnote", auth, getNote);
noteRouter.delete("/:noteid", auth, deleteNote);
noteRouter.put("/:noteid", auth, updateNote);

module.exports = noteRouter;
