var http = require('http');
var fs = require('fs');
var url = require('url');
console.log("test");

var server = http.createServer(function(req, res) {
  var q = url.parse(req.url, true); //uses the parse method on the url passed as the req.
  var filename = "." + q.pathname; //turns the pathname in the url to a ".pathname"
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //if the file isn't found, throw a 404
      return res.end("404 Not Found");
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
    });
});
server.listen(3000);