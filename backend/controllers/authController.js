const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

// Signup
module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all the fields" });
  }
  //   Check if the email already exists in collections
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already registered" });
  });

  //   creating new user here
  const newUser = new User({ name, email, password });
  //    hashing password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          { id: user._id },
          config.get("jwtsecret"),
          { exoiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all the fields" });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).json({ msg: "User does not exists" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        res.status(400).json({ msg: "Invalid user name or password" });
      jwt.sign(
        { id: user._id },
        config.get("jwtsecret"),
        { exoiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
};

// fetching user data
module.exports.get_user = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};
