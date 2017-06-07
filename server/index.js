var http = require('http');
var fs = require('fs');
var url = require('url');
console.log("test");

var server = http.createServer(function (req, res) {
    var q = url.parse(req.url, true); //uses the parse method on the url passed as the req.
    var filename = "." + q.pathname; //turns the pathname in the url to a ".pathname"
    fs.readFile(filename, function (err, data) {
        if (err) { //if the requested file doesn't exist
            res.writeHead(404, { 'Content-Type': 'text/html' }); //if the file isn't found, throw a 404
            return res.end("404 Not Found");//send 404 and exit the function
        } else if (filename === '/') { //if the request ends with '/'
            res.writeHead(200, { 'Content-Type': 'text/html' }); //return ok code (200), set content
            //type to html
            res.write(../../client / index.html); //write from the index.html file in the client dir
            return res.end();//send the file and exit the function
        } else if (filename === '/api/chirps') { //if the requested filename is '/api/chirps'
            if (req.method === 'GET') { //check to see if the request method is a GET request
                fs.readFile('/server/data.json', 'utf8', function (err, data) { //read the data.json in the server folder
                    if (err) {
                        return console.log(err);
                    }
                    console.log(data);
                });
                res.writeHead(200, { 'Content-Type': 'JSON' });//set response code to 200 and content type to JSON
                return res.end()//respond with the JSON data from the file and exit the function
            } else if (req.method === 'POST') { //if the request is a POST
                fs.readFile('/server/data.json', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(data);
                });
            }
        });
});
server.listen(3000);