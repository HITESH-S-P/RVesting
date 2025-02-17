const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var fetchuser = require("../middleware/fetchuser");

const router = express.Router();

const { body, validationResult } = require("express-validator");

//Router 1:create user
router.post(
  "/createuser",
  [
    body("username", "Enter a valid username (Atleat 3 character)").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password shld be atleast 3 characters long").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      db.query(
        "SELECT * FROM users WHERE name = ?",
        [req.body.username],
        async (err, result) => {
          if (result.length > 0) {
            return res.status(400).json({
              error:
                "Username is already taken.Please try again with different username.",
            });
          }
          db.query(
            "SELECT * FROM users WHERE email = ?",
            [req.body.email],
            async (err, result) => {
              if (result.length > 0) {
                return res.status(400).json({
                  error: "Email id already exists.Use different email id.",
                });
              }

              let password = req.body.password.trim();
              if (password.length < 3) {
                return res
                  .status(400)
                  .json({ error: "Please enter a valid password" });
              }
              const salt = await bcrypt.genSalt();
              let securePass = await bcrypt.hash(password, salt);

              db.query(
                "INSERT INTO users (name,email,password) VALUES (?,?,?)",
                [req.body.username.trim(), req.body.email, securePass],
                (err, result) => {
                  if (err) throw err;

                  const userId = result.insertId;
                  const data = {
                    user: {
                      id: userId,
                    },
                  };
                  const authToken = jwt.sign(data, "RVesting");
                  success = true;
                  res.json({ success, authToken });
                }
              );
            }
          );
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred in authentication.");
    }
  }
);

router.post(
  "/forgotpassword",
  [
    body("username", "Enter a valid username").isLength({ in: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("newpassword", "Password should be atleast 3 charecters.").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, newpassword } = req.body;
    try {
      db.query(
        "SELECT * FROM `users` WHERE `name` = ? AND `email` = ?",
        [username, email],
        async (err, result) => {
          if (result.length === 0) {
            return res.status(400).json({
              error: "Please try again with valid credentials.",
            });
          }
          const user = result[0];
          const salt = await bcrypt.genSalt();
          let securePass = await bcrypt.hash(newpassword, salt);
          db.query(
            "UPDATE `users` SET `password` = ? WHERE `name` = ? AND `email` = ?",
            [securePass, username, email],
            (err, result) => {
              if (err) throw err;
              success = true;
              res.json({ success });
            }
          );
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error in forget password.");
    }
  }
);

//router 2:login
router.post(
  "/login",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("password", "Password should be atleast 3 charecters.").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      db.query(
        "SELECT * FROM users WHERE name = ?",
        [username],
        async (err, result) => {
          if (result.length === 0) {
            return res
              .status(400)
              .json({ error: "Please try again with valid credentials." });
          }
          const user = result[0];
          const passCompare = await bcrypt.compare(password, user.password);
          if (!passCompare) {
            success = false;
            return res.status(400).json({
              success,
              error: "Password is incorrect.Please try again.",
            });
          }
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, "RVesting");
          console.log(username, password);
          success = true;
          res.json({ success, authToken });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error in loggin in.");
    }
  }
);

//R-3:Get loggedin user details
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    db.query(
      "SELECT id,name,email,CAST(cash AS DOUBLE) AS cash FROM users WHERE id =?",
      [userId],
      (err, result) => {
        if (err) throw err;
        if (result.lenght === 0) {
          return res.status(400).json({
            success: false,
            message: "User not present.",
          });
        }
        res.json({ success: true, user: result[0] });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error in getting the loged in users details.");
  }
});

module.exports = router;
