const { response } = require("express");
const Notes = require("../models/Notes");
const User = require("../models/User")

exports.createNote = async(req, res) => {
    try{
        const {email, description, chapterNumber, slokNumber} = req.body;
        // console.log(req.body);
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "User Not Found",
                success: false,
            })
        }
        let note = await Notes.findOne({userId: user._id});
        if (!note) {
            note= new Notes({ userId: user._id, notes: [] });
            let chapter = {chapter: chapterNumber, sloks : [{slok: slokNumber, description: description}]};
            note.notes.push(chapter);
            await note.save();
            console.log(Notes);
            return res.status(200).json({
                success: true,
                message: "Note Updated Successfully",
            })
        }

        console.log(note.notes, "note");
        // returning is necessary in find function
        let chapter = note.notes.find((ch) => {return ch.chapter === Number(chapterNumber)
            console.log(chapterNumber, ch.chapter, "chapter", chapterNumber === ch.chapter);
        });
        if(!chapter){
            console.log("Hi ch", chapter);
            chapter = {chapter: chapterNumber, sloks : [{slok: slokNumber, description: description}]};
            note.notes.push(chapter);
        }
        else{
            let slok = chapter.sloks.find((slk) => {return slk.slok === Number(slokNumber)});
            if(!slok){
                slok = {slok: slokNumber, description: description} ;
                chapter.sloks.push(slok);
            }
            else{
                slok.description = description;
            }
        }
        
        console.log("Hi");
        // Saving the Entire Notes Document: The call to notes.save() at the end ensures that any changes made to the nested chapters and sloks within the notes array are saved to the database. This is because Mongoose tracks changes to subdocuments and saves them when the parent document is saved.
        await note.save();
        // console.log(slok);
        return res.status(200).json({
            success: true,
            message: "Note Updated Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}



exports.getNote = async(req, res) => {
    try{
        // get request should be provided data through url string not through req.body
        // req.body has no semantical meaning in get request
        // params data is accessed through req.query not req.params
        const {email, chapterNumber, slokNumber} = req.query;

        console.log(email, chapterNumber, slokNumber, req.body, "in backend");
        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(401).json({
                message: "User Not Found",
                success: false,
            })
        }

        const note = await Notes.findOne({userId: user._id});
        console.log(note);
        if(!note){
            return res.status(200).json({
                message: "Note Not Found",
                success: false,
            })
        }

        const chapter = note.notes.find((ch) => {return ch.chapter === parseInt(chapterNumber)});
        console.log(chapter);
        if(!chapter){
            return res.status(200).json({
                message: "Chapter Not Found",
                success: false,
            })
        }
        console.log(chapter);

        const slok = chapter.sloks.find((slk) => {return slk.slok === parseInt(slokNumber)});
        if(!slok){
            return res.status(200).json({
                message: "Slok Not Found",
                success: false,
            })
        }

        const description = slok.description;

        console.log("h1i");
        return res.status(200).json({
            success: true,
            message: "Note Found",
            description,
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}