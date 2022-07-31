const noteModal = require("../modals/note");

const createNote = async (req, res) => {
  const { title, description } = req.body;

  const userNote = new noteModal({
    title: title,
    description: description,
    userid: req.userid,
  });

  try {
    await userNote.save();
    res.status(201).json({
      status: true,
      note: userNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      errorBody: "Some Thing went Wrong",
    });
  }
};

const updateNote = async (req, res) => {
  const id = req.params.noteid;

  const { title, description } = req.body;

  const userNote = {
    title: title,
    description: description,
    userid: id,
  };

  try {
    await noteModal.findByIdAndUpdate(id, userNote, { new: true });
    res.status(201).json({
      status: true,
      note: userNote,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      errorBody: "Some Thing went Wrong",
    });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.noteid;
  try {
    const note = await noteModal.findByIdAndRemove(id);
    res.status(201).json({
      status: true,
      note: note,
      message: "Note deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      errorBody: "Some Thing went Wrong",
    });
  }
};

const getNote = async (req, res) => {
  try {
    const userNote = await noteModal.find({ userid: req.userid });
    res.status(201).json({
      status: true,
      notes: userNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      errorBody: error,
    });
  }
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNote,
};
