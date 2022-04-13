//This middleware checks if the username has the right format
module.exports = (req, res, next) => {
    //Check if req.body.username is empty
    if (req.body.username == null) {
        res.status(400).json({
            message: "Please fill the username field"
        })
    }
    //Check if username has the right length
    if (req.body.username.length >= 13 || req.body.username.length <= 4) {
        return res.status(400).json({
            error: "Username must be from 5 to 13 length"
        });
    } else {
        console.log("Username fits the right format");
        next();
    }
}