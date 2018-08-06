var express = require('express');
var router = express.Router();

router.get('/speakers', function(req, res) {
    var data = req.app.get('appData')
    var pagePhotos = []
    var pageSpeakers = data.speakers

    data.speakers.map( item =>{
        pagePhotos = pagePhotos.concat(item.artwork)
    })

    res.render('speakers', {
        pageTitle : "Speakers",
        artwork: pagePhotos,
        speakers: pageSpeakers,
        pageID : "speakerList"
    })
});

router.get('/speakers/:shortname', function(req, res) {
    var data = req.app.get('appData')
    var pagePhotos = []
    var pageSpeakers = []

    data.speakers.map( item =>{
        if( item.shortname == [req.params.shortname]){
            pageSpeakers.push(item)
            pagePhotos = pagePhotos.concat(item.artwork)
            
        }
    })

    res.render('speakers', {    
        pageTitle : "Speakers List",
        artwork: pagePhotos,
        speakers: pageSpeakers,
        pageID : "speakerDetail"
    })
});

module.exports = router;
