
const express = require('express');
const router = express.Router();
const Post = require('../models/post');


const postSeed = require('../models/postSeed');
router.get('/seed', (req, res) => {

  Post.deleteMany({}, () => {});

  Post.create(postSeed, (error, data) => {
    error ? res.status(400).json(error) : res.status(200).json(data);
  })
})

router.get('/', (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render('dash', {
      posts: allPosts
    })
  })
})


router.get('/new', (req, res) => {
  res.render('new')
})


router.delete('/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
    res.redirect('/dash')
  })
})

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (error, updatedPost) => {
    res.redirect(`/dash/${req.params.id}`)
  })
})


router.post('/', (req, res) => {
  Post.create(req.body, (error, newPost) => {
    res.redirect('/dash');
  })
})


router.get('/edit/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('edit', {
      post: foundPost
    })
  })
})


router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('show', {
      post: foundPost
    })
  })
})


module.exports = router;