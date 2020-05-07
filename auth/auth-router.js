const router = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  users
    .add(user)
    .then((saved) => {
      res.status(201).json({ saved });
    })

    .catch((err) => {
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  let { username, password } = req.body;
  users
    .findByUsername({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username;
        res.status(200).json({
          message: `Logged in as ${user.username}`,
        });
      } else {
        res.status(404).json({
          message: "error logging in",
        });
      }
    })

    .catch((err) => {
      next(err);
    });
});

router.delete("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({
          message: "Error logging out",
        });
      } else {
        res.json({
          message: "logged out",
        });
      }
    });
  } else {
    res.json({
      message:"already logged out"
    })
    res.end();
  }
});

module.exports = router;
