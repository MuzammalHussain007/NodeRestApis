const userModal = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const existingUser = await userModal.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(404).json({
        status: false,
        message: "Invalid Email Password",
      });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(201).json({
      status: true,
      user: existingUser,
      authenticationToken: token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Some Thing Went Wrong",
      errorBody: error,
    });
  }
};
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await userModal.findOne({ email: email });
    if (!existingUser) {
      return res.send(400).json({
        status: false,
        message: "Current User Does not Exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Some Thing Went Wrong" });
  }
};

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await userModal.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist", status: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await userModal.create({
      email: email,
      password: hashPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

    res.status(200).json({
      user: result,
      authenticationToken: token,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some Thing Went Wrong", status: false });
  }
};

module.exports = { signin, signup, forgetPassword };
