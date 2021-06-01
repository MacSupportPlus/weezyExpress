//import express 

const express = require('express');
//invoke the express routers
const router = express.Router();
//bring in feedback.json file

//import fs modules -read and write to file on disk
let dataFile = require('../data/data.json')
let feedbackData = require('../data/feedback.json')
// body parer  req.body.name
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
//console.log(dataFile.discography.mixtapes)
let mixtapePhotos = dataFile.discography.mixtapes
let albumPhotos = dataFile.discography.albums
let epAlbums = dataFile.discography.eps
const fs = require("fs");


router.get('/', (req, res) => {

   



    res.render('index.ejs', {
        pageTitle: "Drizzy",
        albumObjects: albumPhotos,
        mixtapeObjects: mixtapePhotos,
        epObjects: epAlbums

    })
})

router.get('/chat', (req, res) => {
    
    res.render('chat', {
        pageID: "chat",
        pageTitle: "Drixxyy Chat"
    })
})
router.get('/eps', (req, res) =>{
    res.render('eps.ejs', {
        pageTitle: "Drizzy EPS",
        albumObjects: albumPhotos,
        mixtapeObjects: mixtapePhotos,
        epObjects: epAlbums
})
})

router.get('/albums', (req, res) =>{
    res.render('albums.ejs', {
        pageTitle: "Drizzy Albums",
        albumObjects: albumPhotos,
        mixtapeObjects: mixtapePhotos,
        epObjects: epAlbums
})
})

router.get('/mixtapes', (req, res) =>{
    
    let mixtapeCoverPhotos = []
    mixtapePhotos.forEach(mixtapeObject =>{
        mixtapeCoverPhotos = mixtapeCoverPhotos.concat(mixtapeObject.albumCover)
    
    })
    console.log(`--------->>>${mixtapeCoverPhotos}`)
    res.render('mixtapes.ejs', {
        pageTitle: "Drizzy Mixtapes",
        albumCovers : mixtapeCoverPhotos,
        albumObjects: albumPhotos,
        mixtapeObjects: mixtapePhotos,
        epObjects: epAlbums
        
    })
})

router.get('/album/:shortName', (req, res) => {
    
    let name = req.params.shortName
    const albumFeedback = feedbackData.filter(review => review.title.trim() === name.trim());
    let pageTitle;
    let img;
    let albumsSold;
    let summary;
    let year;
    let trackList;
        
    for(i=0; i<albumPhotos.length; i++) {
        // console.log(albumPhotos[i].shortName,name)
        // console.log(albumPhotos[i].shortName===name)
        if (albumPhotos[i].shortName == name) {
            pageTitle = albumPhotos[i].title
            img = albumPhotos[i].albumCover
            albumsSold = albumPhotos[i].copiesSold
            summary=  albumPhotos[i].summary 
            year = albumPhotos[i].year
            trackList = albumPhotos[i].trackList
        
    }       
    }

    for(i=0; i<epAlbums.length; i++) {
        if (epAlbums[i].shortName == name) {
            PageTitle = epAlbums[i].title
            title = epAlbums[i].title
            img = epAlbums[i].albumCover
            albumsSold = epAlbums[i].copiesSold
            summary=  epAlbums[i].summary 
            year = epAlbums[i].year
            trackList = epAlbums[i].trackList
    }       
    }
    for(i=0; i<mixtapePhotos.length; i++) {
        if (mixtapePhotos[i].shortName == name) {
            PageTitle = mixtapePhotos[i].title
            title = mixtapePhotos[i].title
            img = mixtapePhotos[i].albumCover
            albumsSold = mixtapePhotos[i].copiesSold
            summary=  mixtapePhotos[i].summary 
            year = mixtapePhotos[i].year
            trackList = mixtapePhotos[i].trackList
    }       
    }
    res.render('oneAlbum.ejs', {
        pageTitle: pageTitle,
        img: img,
        albumsSold: albumsSold,
        summary: summary,
        year: year,
        trackList: trackList,
        feedBack : albumFeedback,
        albumObjects: albumPhotos,
        mixtapeObjects: mixtapePhotos,
        epObjects: epAlbums

        })
})
router.get("/api", (req, res) => {
    // display all of the the messages in feedback.json
  res.json(feedbackData)
});

router.post("/api", (req, res) => {
    //grab data that was sent from form
    //body-parser
   //   let name = req.body.name; 
   //   let title = req.body.title;
    //   let message = req.body.message;
      console.log("form data", req.body);
    
      feedbackData.unshift(req.body);
    // [{}, {}, {}, {}, {}, {}, {}, {}]
    // save to file (write to json file)
    fs.writeFile('data/feedback.json', JSON.stringify(feedbackData), 'utf8', (err)=>{

        if(err){
            console.log(err);
        }
    })
  
    // send back all of messages with new message attached
    res.json(feedbackData);
  })


//export out to main appropriate
module.exports = router;