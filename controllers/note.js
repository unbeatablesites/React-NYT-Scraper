const db = require('../models');

exports.saveNote = function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}

exports.deleteNote = function (req, res) {
    //console.log("REQ.BODY",req.body);
    const note = req.body.note, article = req.body.article;

    db.Article.findById(article, "notes").then(function (result) {
        const newNotes = [];
        console.log("target notes:", result);
        result.notes.forEach(id => {
            if (id == note) {
                db.Note.findByIdAndRemove(id).then(function (removed) {
                    console.log(removed);
                });
            }
            else newNotes.push(id);
        });
        console.log(newNotes);
        db.Article.findByIdAndUpdate(article, { notes: newNotes }).then(function (result) {
            console.log(result);
            res.json(result);
        })
    });
}