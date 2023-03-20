const User = require('../models/userModel');

exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      country,
      gender,
      password,
      confirmPassword
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const createUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      country,
      gender,
      password,
      confirmPassword
    });

    await createUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
