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
//       res.end(getFile("./navbar-app/index.html"));dfasfas
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

// BASIC API EXAMPLE

// const express = require("express");
// const { people, products, routes } = require("./data");

// const app = express();

// app.get(routes[0].name, (req, res) => {
//   // "/"
//   return res.status(200).json(routes);
// });

// app.get(routes[1].name, (req, res) => {
//   // "/api/people"
//   return res.status(200).json(people);
// });

// app.get(routes[2].name, (req, res) => {
//   //"/api/products"
//   const modifiedProducts = products.map(({id, image, name, price})=>{
//     return {id, image, name, price}
//   })
//   return res.status(200).json(modifiedProducts);
// });

// app.get(routes[3].name, (req, res) => {
//   //"/api/products"
//   const productId = +req?.params?.productId
//   if(productId && productId !== NaN){
//     const product = products.find((product)=>product.id === productId)
//     if(product)
//       return res.status(200).json(product);
//     else
//       return res.status(404).json({message: "Product not found"})
//   }else
//     return res.status(400).json({message:"you must provide a product id as integer"})
// });

// // get product with query parameters
// app.get(routes[4].name, (req, res) => {
//   // "/api/query/product"
//   const productId = +req.query.productId
//   if(productId && productId !== NaN){
//     const product = products.find((product)=>product.id === productId)
//     if(product)
//       return res.status(200).json(product);
//     else
//       return res.status(404).json({message: "Product not found"})
//   }else
//     return res.status(400).json({message:"you must provide a product id as integer"})
// });

// app.listen(PORT, ()=>console.log(`server is listening port ${PORT}...`));

const express = require("express");
const app = express();
// const logger = require("./logger");
// const authorize = require('./authorize');
const { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json data
app.use(express.json())

// app.use("/api", [authorize, logger]); //if you provide part of rote it will include every route which will include provided one

app.get("/api/home", (req, res) => {
  res.json("Home " + req.user.name);
});
app.get('/api/people', (req, res) => {
  res.json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  console.log(req.body)
  if (name) {
    people.push({ name, id: people.length });
    return res.status(201).json({ success: true, person: name });
  }
  res.status(400).json({ success: false, msg: "name is required" });
});

app.get("/about", (req, res) => {
  res.json("About page");
});

app.post("/login", (req, res) => {
  if (req?.body?.name) {
    const name = req?.body?.name;
    res.status(200).json('welcome ' + name);
  } else
    return res.status(401).json('please provide a name');
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));
