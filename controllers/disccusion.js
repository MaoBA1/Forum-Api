const { request, response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Dis = require('../models/disccusion');


router.post('/uploadDisccusionSub', (request, response) => {
    const {
        title,
        content,
        author,
        postImage
    } = request.body;
    if(title.length == 0 || content.length == 0 || author.length == 0 || postImage.length == 0) {
        return response.status(200).json({
            status: false,
            Error: 'missing details...'
        })
    }
    const newDisccusion = new Dis({
        _id: mongoose.Types.ObjectId(),
        title: title,
        content: content,
        author: author,
        postImage: postImage
    });
    return newDisccusion.save()
    .then(newDis => {
        return response.status(200).json({
            status: true,
            Disccusion: newDis
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            Error: error
        })
    })
})

router.put('/comment/:disccusionId', async(request,response) => {
    const disId = request.params.disccusionId;
    await Dis.findById(disId)
    .then(disc => {
        if(disc) {
            const {
                commentAuthor,
                comment  
            } = request.body;
            let commentArray = disc.comments;
            commentArray.push({
                _id: mongoose.Types.ObjectId(),
                comment: comment,
                commentAuthor: commentAuthor
            });
            disc.comments = commentArray;
            return disc.save()
            .then(updated_disc => {
                return response.status(200).json({
                    status: true,
                    Disccusion: updated_disc
                })
            })
            .catch(error => {
                return response.status(500).json({
                    status: false,
                    Error: error
                })
            })
        } else {
            return response.status(403).json({
                status: false,
                Error: 'Post not found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            Error: error
        })
    })
})

router.put('/likePost/:disId', async(request,response) => {
    const disId = request.params.disId;
    await Dis.findById(disId)
    .then(disc => {
        if(disc) {
            const likerName = request.body.likerName;
            let likeArray = disc.likes;
            likeArray.push({
                _id: mongoose.Types.ObjectId(),
                liker:likerName
            });
            disc.likes = likeArray;
            return disc.save()
            .then(updated_disc => {
                return response.status(200).json({
                    status: true,
                    Disccusion: updated_disc
                })
            })
        } else {
            return response.status(403).json({
                status: false,
                Error: 'Post Not Found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            status:false,
            Error: error
        })
    })
})

router.get('/getAllDisccusions', async(request,response) => {
    const disccusions = await Dis.find();
    return response.status(200).json({
        status: true,
        Disccusions: disccusions
    })
})

router.get('/sayHello', (request, response) => {
    return response.status(200).json({
        message: 'Hello World!'
    })
})

router.put('/likeComment/:disccusionId/:commentId', async(request, response) => {
    const disId = request.params.disccusionId;
    await Dis.findById(disId)
    .then(async disc => {
        if(disc) {
            
            const commentId = request.params.commentId;
            let currentComment = null;
            disc.comments.forEach(comment => {
                if(comment._id == commentId) {
                    currentComment = comment;
                }                
            });
            if(currentComment) {
                const liker = request.body.liker;
                currentComment.likes.push({
                    _id: mongoose.Types.ObjectId(),
                    liker: liker
                })
                return disc.save()
                .then( updated_disc => {
                    return response.status(200).json({
                        status: true,
                        Disccusion: updated_disc
                    })
                })
                .catch(error => {
                    return response.status(500).json({
                        status: false,
                        Error: error
                    })
                })
            } else {
                return response.status(403).json({
                    status: false,
                    Error: 'Comment Not Found'
                })
            }
        } else {
            return response.status(403).json({
                status: false,
                Error:  'Post Not Found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            Error: error
        })
    })
})

router.get('/getDisccusionById/:disId', async(request, response) => {
    const disId = request.params.disId;
    await Dis.findById(disId)
    .then(disc => {
        if(disc) {
            return response.status(200).json({
                status: true,
                Disccusion: disc
            })
        } else {
            return response.status(403).json({
                status: false,
                Error: 'Disscusion not found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            Error: error
        })
    })
})

module.exports = router;
