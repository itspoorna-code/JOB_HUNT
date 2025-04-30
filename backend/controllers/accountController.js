const Account = require("../models/account");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newAccount = await Account.create({ email, password });
    const token = signToken(newAccount._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newAccount,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const account = await Account.findOne({ email });
    if (
      !account ||
      !(await account.correctPassword(password, account.password))
    ) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = signToken(account._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: account,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
