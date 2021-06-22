const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashPassword,
    });
    res.status(201).json({
      status: "SUCCESS",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      error,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        status: "FAIL",
        message: "User not found!",
      });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(400).json({
          status: "FAIL",
          message: "Incorrect username or password.",
        });
      } else {
        req.session.user = user;
        res.status(200).json({
          status: "SUCCESS",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      error,
    });
  }
};
