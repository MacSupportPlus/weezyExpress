//import express 

const express = require('express');
//invoke the express routers
const router = express.Router();









router.get('/albums', (req, res) =>{

    res.render('albums.ejs', {
        pageTitle: "weexypage albums",
        content: "This is the weexy ALbums page"



    });













})

//export out to main appropriate
module.exports = router;