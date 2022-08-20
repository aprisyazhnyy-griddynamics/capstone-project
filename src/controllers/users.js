const userModel = require('../models/users');

const createUser = async (req, res) => {
  const newUser = new userModel(req.body);

  try {
    const savedUser = await newUser.save();
    
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
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
