var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var im = require('imagemagick');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var config = require(__dirname + '/config.js');
var DataModel = require(__dirname + '/application/models/database.js');
app.set('port', (process.env.PORT || 7004));
app.use(express.static(__dirname + '/webapp'));
/*
** Dummy Routes.
*/



//https://github.com/jsantell/poet node.js blog Engine


//For Category images.

/*//http://www.jeff.wilcox.name/2011/10/node-express-imagemagick-square-resizing/
im.resize({
    srcData : fs.readFileSync('webapp/assets/img/seed/karthikrenkarajan/place/profile_pic.jpg', 'binary'),
    strip : false,
    width : 368,
    height : "620^",
    customArgs: [ 
         "-gravity", "center"
        ,"-extent", "368x620"
        ]
}, function(err, stdout, stderr){
  if (err) throw err
  fs.writeFileSync('webapp/assets/img/seed/karthikrenkarajan/place/profile_pic_modified.jpg', stdout, 'binary');
  console.log('resized profile_pic.jpg to fit within 368px 620px')
});*/


//For small images
/*im.resize({
    srcData : fs.readFileSync('webapp/assets/img/seed/asharma/profile_pic.jpg', 'binary'),
    strip : false,
    width : 150,
    height : "150^",
    customArgs: [ 
         "-gravity", "center"
        ,"-extent", "150x150"
        ]
}, function(err, stdout, stderr){
  if (err) throw err
  fs.writeFileSync('webapp/assets/img/seed/asharma/profile_pic_small.jpg', stdout, 'binary');
  console.log('resized profile_pic.jpg to fit within 368px 620px')
});*/
/**
//For Hero images
im.resize({
    srcData : fs.readFileSync('webapp/uploads/post/54a900e308b21288329287a4_posthero.jpg', 'binary'),
    strip : false,
    width : 1555,
    height : "1037^",
    customArgs: [ 
         "-gravity", "center"
        ,"-extent", "1555x1037"
        ]
}, function(err, stdout, stderr){
  if (err) throw err
  fs.writeFileSync('webapp/uploads/post/54a900e308b21288329287a4_posthero_modified.jpg', stdout, 'binary');
  console.log('resized profile_pic.jpg to fit within 368px 620px')
});
**/
/*
** Feeds Routes (creation, login, logout)
*/
var category = require(__dirname + '/routes/category.js');
category.createRoutes(app, DataModel);
/*
** User Routes (creation, login, logout)
*/
var user = require(__dirname + '/routes/user.js');
user.createRoutes(app, DataModel);
/*
** Feeds Routes (creation, login, logout)
*/
var posts = require(__dirname + '/routes/post.js');
posts.createRoutes(app, DataModel);

var images = require(__dirname + '/routes/image.js');
images.createRoutes(app);

/*var dummyApi = require(__dirname + '/routes/dummyApi.js');
dummyApi.createRoutes(app,database);*/

app.get('/', function(request, res) {
  //response.send('Hello World!')
	//return res.sendFile(app.get('public') + '/index.html');	
	return res.sendFile(__dirname + '/webapp/views/pages/index.html');
})
DataModel.connect(function () {
	//app.listen(config.port);	
	app.listen(7004 || 7004);
	console.log("Server started and listening on port " + process.env.PORT);
});
/*app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
*/