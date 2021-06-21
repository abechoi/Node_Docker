const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);

  try {
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
