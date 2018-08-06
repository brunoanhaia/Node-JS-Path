var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var data = req.app.get('appData')
  var pagePhotos = []
  var pageSpeakers = data.speakers
  data.speakers.forEach( item =>{
    pagePhotos = pagePhotos.concat(item.artwork)
  })

  res.render('index', {
    pageTitle : "Index",
    artwork: pagePhotos,
    speakers: pageSpeakers,
    pageID : "index"
  })
});

module.exports = router;
