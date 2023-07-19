const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/globalfetchnotes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// Route 1 : Get all the notes using : GET "/api/notes/fetchallnotes" login req.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
});

// Route 2 : ADD the notes using : POST "/api/notes/addnote" login require
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if err return err
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const saveNote = await note.save();

            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// Route 3 : update the notes using : POST "/api/notes/updatenote" login require
router.put(
    "/updatenote/:id",fetchuser,async (req, res) => {
        const { title, description, tag } = req.body;
        try{
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to update
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })

// Route 4 : Delete the notes using : DELETE "/api/notes/deletenote" login require
router.delete(
    "/deletenote/:id",fetchuser,async (req, res) => {
        try {

        //Find the note to delete
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")} 

        //check for user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted", note : note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })

    module.exports = router;
