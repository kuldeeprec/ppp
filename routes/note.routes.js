const { Router } = require("express");
const router = Router();

const note_controller = require("../controllers/note.controllers");

router.post("/", note_controller.get_notes);
router.post("/add", note_controller.post_note);
router.get("/edit/:id", note_controller.get_note);
router.post("/update/:id", note_controller.post_updated_note);
router.delete("/delete/:id", note_controller.delete_note);
router.post("/login", note_controller.login);
router.post("/signup", note_controller.signup);

module.exports = router;
