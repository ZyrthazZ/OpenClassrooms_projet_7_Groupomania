// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;


// This middleware checks if the post fits the right format
module.exports = (req, res, next) => {
    // Check if the title or the content are null
    if (req.body.title == null || req.body.content == null) {
        return res.status(400).json({
            'error': 'missing parameters'
        });
    }
    // Check if the title and the content match their own limit
    if (req.body.title.length <= TITLE_LIMIT || req.body.content.length <= CONTENT_LIMIT) {
        return res.status(400).json({
            error: 'invalid parameters'
        });
    }
    next();
}