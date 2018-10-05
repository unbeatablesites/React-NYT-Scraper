const db = require('../models');

exports.saveArticle = function (req, res) {
    //console.log(req.body);
    req.body.saveDate = new Date();
    db.Article.create(req.body)
        .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.deleteArticle = function (req, res) {
    //console.log(req.body, req.params, req.data);
    const targetId = req.body.id;
    //console.log(targetId);
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
