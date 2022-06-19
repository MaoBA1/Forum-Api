const mongoos = require('mongoose');
const schema = mongoos.Schema;

const avatars = [
    "https://res.cloudinary.com/united-app/image/upload/v1638879015/avatars/face1_rhjego.png",
    "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face3_cbnzio.png",
    "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face2_f8i1fn.png",
    "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face4_dx3nu6.png",
    "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face5_faljpu.png",
    "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/character7_u3r1ec.png",
]

let randomIndex = Math.round(Math.random(1000));

const DisccusionSchema = new schema({
    _id: mongoos.Schema.Types.ObjectId,
    title: String,
    postImage: String,
    authorAvatar: {type:String, default: avatars[randomIndex%avatars.length]},
    content: String,
    author: String,
    likes:[
        {
            _id: mongoos.Schema.Types.ObjectId,
            liker: String
        }
    ],
    Date: {type: Date ,default: Date.now},
    comments: [
        {
            _id: mongoos.Schema.Types.ObjectId,
            comment: String,
            commentAuthor: String,
            avatar: {type:String, default: avatars[randomIndex%avatars.length]},
            likes:[
                {
                    _id: mongoos.Schema.Types.ObjectId,
                    liker: String
                }
            ]
        }
    ]
})

module.exports = mongoos.model('Disccusion', DisccusionSchema);