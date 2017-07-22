var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

function recursiveRoutes(folderName) {
    fs.readdirSync(folderName).forEach(function(file) {
        var fullName = path.join(folderName, file);
        var stat = fs.lstatSync(fullName);
        if (stat.isDirectory()) {
            recursiveRoutes(fullName);
        } else if (file.toLowerCase().indexOf('.js')) {
        	console.log("require('" + fullName + "')");
            require('./' + fullName)(app);    
        }
    });
}
recursiveRoutes('app/routing'); 


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});