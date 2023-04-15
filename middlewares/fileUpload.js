const multer = require('multer')
const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]

const videolist = [
    'video/wmv',
    'video/mp4',
    'video/ogg',
    'video/x-flv',
    'video/avi',
    'video/webm',
    'video/mkv',
    'video/avchd'
]
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        if (file.fieldname === 'image')
            cb(null, process.cwd() + '/public/images')
        else if (file.fieldname === 'video')
            cb(null, process.cwd() + '/public/videos')

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        if (file.fieldname === 'image' && !whitelist.includes(file.mimetype))
            return cb(new Error('file is not allowed'))
        else if (file.fieldname === 'video' && !videolist.includes(file.mimetype))
            return cb(new Error('video type is not allowed'))

        console.log(file.size)

        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

module.exports = multer({ storage: storage }).fields([{ name: "image" }, { name: "video" }]);