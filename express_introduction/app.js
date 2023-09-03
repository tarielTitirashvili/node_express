// Routing before express

// const http = require("http");
// const fs = require("fs");
const PORT = 5000;

// function getFile(path) {
//   const file = fs.readFileSync(path, (data) => data);
//   return file;
// }

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   switch (url) {
//     case "/":
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(getFile("./navbar-app/index.html"));
//       break;
//     case "/styles.css":
//       res.writeHead(200, { "Content-Type": "text/css" });
//       res.end(getFile("./navbar-app/styles.css"));
//       break;
//     case "/logo.svg":
//       res.writeHead(200, { "Content-Type": "image/svg+xml" });
//       res.end(getFile("./navbar-app/logo.svg"));
//       break;
//     case "/browser-app.js":
//       res.writeHead(200, { "Content-Type": "text/javascript" });
//       res.end(getFile("./navbar-app/browser-app.js"));
//       break;
//     case "/about":
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(getFile("./methods-public/index.html"));
//       break;
//     default:
//       res.writeHead(404, { "Content-Type": "text/html" });
//       res.end("<h1>404 not found</h1>");
//   }
// });

// server.listen(PORT, console.log("server is running on port " + PORT));

// express

// const express = require("express");

// const app = express();

// app.get('/', (req, res) => {
//   res.status(404).send('Home page for tarel');
// })

// app.get('/about', (req, res) => {
//   res.status(404).send('About page for tarel');
// })

// app.all('*', (req, res)=>{
//   res.status(404).send('404 not found')
// })

// app.listen(PORT, console.log("server is listening on " + PORT))

// handling static files
// const express = require("express");
// const path = require("path");

// const app = express();

// // setup static path
// app.use(express.static('./public'))

// // app.get('/', (req, res) => {
// //   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// // })

// app.all('*', (req, res)=>{
//   res.status(404).send('404 not found')
// })

// app.listen(PORT, console.log("server is listening on " + PORT + "..."))

const express = require("express");
const { people, products, routes } = require("./data");

const app = express();

app.get(routes[0].name, (req, res) => {
  // "/"
  res.status(200).json(routes);
});

app.get(routes[1].name, (req, res) => {
  // "/api/people"
  res.status(200).json(people);
});

app.get(routes[2].name, (req, res) => {
  //"/api/products"
  const modifiedProducts = products.map(({id, image, name, price})=>{
    return {id, image, name, price}
  })
  res.status(200).json(modifiedProducts);
});

app.get(routes[3].name, (req, res) => {
  //"/api/products"
  const id = +req?.params?.id
  if(id && id !== NaN){
    const product = products.find((product)=>product.id === id)
    res.status(200).json(product);
  }else{
    res.status(400).json({message:"you must provide a product id as integer"})
  }
});

app.listen(PORT, console.log(`server is listening port ${PORT}...`));
