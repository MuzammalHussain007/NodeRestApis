const noteModal = require("../modals/note");

const createNote = async (req, res) => {
  const { title, description } = req.body;

  const userNote = new noteModal({
    title: title,
    description: description,
    userid: req.userId,
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
    userid: req.userId,
  };

  try {
     const note = await noteModal.findByIdAndUpdate(id, userNote, { new: true });
     console.log(note);
     if(note==null)
     {
      res.status(201).json({
        status: false,
        note: note,
        message: "Notes Not Found",
      });
     }else{
      res.status(201).json({
        status: true,
        note: note,
        message: "Note Updated Successfully",
      });
     }
    
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

    if(note==null)
    {
      res.status(200).json({
        status: true,
        message: "Note Already deleted",
      });
    }else{

      res.status(200).json({
        status: true,
        note: note,
        message: "Note deleted Successfully",
      });
      
    }
    
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
    const userNote = await noteModal.find({ userid: req.userId });
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
