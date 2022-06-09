const multer = require('multer');

//"Dictionnary" for the file extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Use of the diskStorage function of multer which sets the path where the file will be registred
const storage = multer.diskStorage({
    //Necessary argument for diskStorage : destination to indicate where to register the files
    destination: (req, file, callback) => {
        //Null argument in callback meaning there are no errors and 'images' to specify the folder for the files
        callback(null, 'images/profils')
    },
    //Necessary argument for diskStorage : filename to specify how the file will be named
    filename: (req, file, callback) => {
        //Keeps the original file name but replaces the spaces by _ to avoid problems or errors
        const name = file.originalname.split(' ').join('_');
        //Call of the dictionnay for the files extensions
        const extension = MIME_TYPES[file.mimetype];
        //Creation of the file, name of the file plus a Date.now , a point '.' then the file extension
        callback(null, name + Date.now() + '.' + extension);
    }
});

//Let's export the middleware using storage as an argument and the single method to specify this is a unique file
module.exports = multer({
    storage
}).single('image');