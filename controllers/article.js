const db = require('../models');

exports.saveArticle = function (req, res) {
    req.body.saveDate = new Date();
    db.Article.create(req.body)
        .then(function (dbArticle) {
            console.log(dbArticle);
        })
        .catch(function (err) {
            return res.json(err);
        });
}

exports.deleteArticle = function (req, res) {
    const targetId = req.body.id;
    db.Article.findById(targetId, "notes").then(function (result) {
        console.log("target notes:", result);
        result.notes.forEach(id => {
            db.Note.findByIdAndRemove(id).then(function (removed) {
                console.log(removed);
            });
        });
    }).then(function () {
        db.Article.findByIdAndRemove(targetId).then(function (removed) {
            console.log(removed);
            res.json(removed);
        });
    })
}
