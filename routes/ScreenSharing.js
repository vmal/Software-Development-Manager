/**
 * Created by vaibhav malhotra on 11/6/2016.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/ScreenSharing', function(req, res, next)
{
    res.sendFile(path.join(__dirname, '../', 'views', 'ScreenSharing.html'));//
});



module.exports=router;