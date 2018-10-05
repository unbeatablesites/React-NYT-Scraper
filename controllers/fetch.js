const db = require('../models');

exports.viewSaved = function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.find({})
        // ..and populate all of the notes associated with it
        .populate("notes")
        .then(function (dbArticles) {
            // If we were able to successfully find an Headline with the given id, send it back to the client
            console.log("THIS IS THE HEADLINE OBJECT", dbArticles);
            res.json(dbArticles);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}