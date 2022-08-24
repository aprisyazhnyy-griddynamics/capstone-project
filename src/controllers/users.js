const userModel = require('../models/users');

const createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    
    res.status(200).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json(err.message);
    };
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await userModel.find();
    
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createUser, getAllUsers };
