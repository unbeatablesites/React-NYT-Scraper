const db = require('../models');

exports.viewSaved = function (req, res) {
    db.Article.find({})
        .populate("notes")
        .then(function (dbArticles) {
            console.log("THIS IS THE HEADLINE OBJECT", dbArticles);
            res.json(dbArticles);
        })
        .catch(function (err) {
            res.json(err);
        });
}