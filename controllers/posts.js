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
router.get('/new', (req, res) => {
    Post.find({}, (error, allPosts) => {
            res.render('blog', {
              posts: allPosts
     })
 })
 })   
router.get('/new', (req, res) => {
    router.post('/', (req, res) => {
         Post.create(req.body, (error, newPost) => {
        res.redirect('/blog');
    })
})
              
router.delete('/:id', (req, res) => {
     Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
     res.redirect('/blog')
 })
})
           
router.put('/:id', (req, res) => {
 Post.findByIdAndUpdate(req.params.id, req.body, (error, updatedPost) => {
    res.redirect(`/blog/${req.params.id}`)
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
              