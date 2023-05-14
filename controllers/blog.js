const empty = require("is-empty");



exports.properties = function(req, res, next) {
    const { title, body } = req.body;
    if ((title && !empty(title)) && (body && !empty(body)))
        next();
    else if (req.error && !empty(title))
        res.status(400).json({ "error": req.error })
    else
        res.status(400).json({ "error": "missed parameters" })
}


exports.param = function(req, res, next) {
    if (req.params.id)
        next();
    else
        res.status(400).json({ "error": "missed route prams" })
}