const empty = require("is-empty");



exports.properties = function (req, res, next) {
    const { title, snippet, body } = req.body;
    if ((title && !empty(title)) && (snippet && !empty(snippet)) && (body && !empty(body)))
        next();
    else
        res.status(400).json({ "error": "missed parameters" })
}


exports.param = function (req, res, next) {
    if (req.params.id)
        next();
    else
        res.status(400).json({ "error": "missed route prams" })
}