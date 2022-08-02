const jwt = require("jsonwebtoken");
const SECRET_KEY = "NoteApi";

const auth = (req, res, next) => {
  try {
    let tokenSend = req.headers.authorization;

    if (tokenSend) {
      tokenSend = tokenSend.split(" ")[1];
      let user = jwt.verify(tokenSend, SECRET_KEY);
      req.userId = user.id;
console.log("Console From Auth.js"+user.id);
    } else {
      res.status(401).json({
        status: false,
        message: "Invalid User",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: false,
      message: "Invalid User",
      errorBody: error,
    });
  }
};

module.exports = auth;
