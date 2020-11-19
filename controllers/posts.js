
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

const $name = $('#name');
const $symbol = $('#symbol');
const $price = $('#Price');
const $description = $('#descRiption');
const $iconURL = $('#iconURL')

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
$('form').on('submit', handleGetData);

function handleGetData(event) {
	event.preventDefault();
	$userInput= $('#input-box');
  userInput = $userInput.val();
  console.log(userInput)
  

  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://coinranking1.p.rapidapi.com/coin/${userInput}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "c0f227240amsh55aa92563c9e45cp1e4b12jsn976987091817"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    cryptoData.name=response.data.coin.name
    cryptoData.symbol=response.data.coin.symbol
    cryptoData.price=response.data.coin.price
    cryptoData.description=response.data.coin.description
    cryptoData.iconURL=response.data.coin.iconUrl
    render()
  });
}


 function render() {
  $name.text(cryptoData.name);
  $symbol.text(cryptoData.symbol);
	$price.text(cryptoData.price);
  $description.text(cryptoData.description);
  $iconURL.attr('src', `${cryptoData.iconURL}`);
 }
  