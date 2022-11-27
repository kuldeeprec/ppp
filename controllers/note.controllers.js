const Note = require("../models/note.model");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// display the login page

exports.get_login = async (req, res) => {
  res.status(200);
};

// display notes using GET
exports.get_notes = async (req, res) => {
  try {
    const notes = await Note.find();
    if (!notes) throw new Error("No notes found");
    const time_order = notes.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    res.status(200).json(time_order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add new note to database using POST
exports.post_note = async (req, res) => {
  const newNote = new Note(req.body);
  try {
    const note = await newNote.save();
    if (!note) throw new Error("Error saving note item");
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// display updated note using GET
exports.get_note = async (req, res) => {
  let id = req.params.id;
  Note.findById(id, (err, note) => {
    if (err) {
      res.json(err);
    }
    res.json(note);
  });
};

// save updated note to database using POST
exports.post_updated_note = async (req, res) => {
  Note.findById(req.params.id, async (err, note) => {
    if (!note) res.status(404).send("note was not found");
    else {
      note.title = req.body.title;
      note.body = req.body.body;
      note.date = Date.now();
      note
        .save()
        .then(() => {
          res.json("Update complete");
        })
        .catch(() => {
          res.status(400).send("unable to update the database");
        });
    }
  });
};

// delete note using DELETE
exports.delete_note = async (req, res) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json([]);
    })
    .catch((error) => console.log(error));
};
module.exports.signup = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(401, {
        message: "Invalid password",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      if (user) {
        return res.json(200, {
          message: "succesfully sign up",
        });
      }
    }
    return res.json(401, {
      message: "user already exists",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!user || !validPassword) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    // return res.json(200, {
    //   message: "Sign in successful, here is your token, please keep it safe!",
    //   data: {
    //     token: jwt.sign(user.toJSON(), "kuldeep", { expiresIn: "100000" }),
    //   },
    // });
    var options = {
      expires: new Date(Date.now() + 1000000),
      httpOnly: true,
      sameSite: "strict",
    };
    const token = jwt.sign(user.toJSON(), "shivansh", { expiresIn: "1000000" });
    res.cookie("jwt", token, options);
    return res.send("succes fully login");
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
