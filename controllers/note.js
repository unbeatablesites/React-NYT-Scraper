const db = require('../models');

exports.saveNote = function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
}

exports.deleteNote = function (req, res) {
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