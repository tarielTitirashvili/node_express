const http = require("http");
const fs = require("fs");
const PORT = 5000;

function getFile(path) {
  const file = fs.readFileSync(path, (data) => data);
  return file;
}

const server = http.createServer((req, res) => {
  const url = req.url;
  switch (url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(getFile("./navbar-app/index.html"));
      break;
    case "/styles.css":
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(getFile("./navbar-app/styles.css"));
      break;
    case "/logo.svg":
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      res.end(getFile("./navbar-app/logo.svg"));
      break;
    case "/browser-app.js":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(getFile("./navbar-app/browser-app.js"));
      break;
    case "/about":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(getFile("./methods-public/index.html"));
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 not found</h1>");
  }
});

server.listen(PORT, console.log("server is running on port " + PORT));
