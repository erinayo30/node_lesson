// console.log("Learning Backend Dev");
const readline = require("readline");
// Reading Input and writing on the terminal interface
/*^const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Welcome please enter your name:", (name) => {
  console.log("you are welcome :" + name);
  rl.close();
});
rl.on("close", () => {
  console.log("Interface closed");
  process.exit(0);
});
*/

// Reading and writing file Sychronusly
const fs = require("fs");
// let textIn = fs.readFileSync("Files/input.txt", "utf-8");
// console.log(textIn);

// let content = `Data read from input.txt: ${textIn}.\nDate created ${new Date()}`;
// fs.writeFileSync("./Files/output.txt", content);

// Writing and Reading file Asychronously
/*fs.readFile("./Files/start.txt", "utf-8", (error, data) => {
  console.log(data);
  fs.readFile(`./Files/${data}.txt`, "utf-8", (error1, data1) => {
    console.log(data1);
    fs.readFile("./Files/append.txt", "utf-8", (error3, data3) => {
      console.log(data3);
      fs.writeFile(
        "./Files/output.txt",
        `${data1}\n\n${data3}\n\nDate created${new Date()}`,
        () => {
          console.log("Put in more efforts");
        }
      );
    });
  });
});
*/
// creating and starting a server
const http = require("http");
const html = fs.readFileSync("./Template/index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
let productListHTML = fs.readFileSync("./Template/product_list.html", "utf-8");

let productArray = products.map((prod) => {
  let output = productListHTML.replace("{{%image}}", prod.image);
  output = output.replace("{{%Name%}}", prod.brand);
  output = output.replace("{{%modelName%}}", prod.model);
  output = output.replace("{{%modelFeatures%}}", prod.features);
  output = output.replace("{{%modelPrice%}}", prod.price);

  return output;
});
const server = http.createServer((request, response) => {
  // Routing
  let path = request.url;
  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200, {
      "content-Type": "text/html",
      "my-header": "Hello NodeJS",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the Home Page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200, {
      "content-Type": "text/html",
      "my-header": "Hello NodeJS",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the About Page"));
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200, {
      "content-Type": "text/html",
      "my-header": "Hello NodeJS",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the Contact Page"));
  } else if (path.toLocaleLowerCase() === "/services") {
    response.writeHead(200, {
      "content-Type": "text/html",
      "my-header": "Hello NodeJS",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the Services Page"));
  } else if (path.toLocaleLowerCase() === "/products") {
    let productRes = html.replace("{{%CONTENT%}}", productArray.join(","));
    response.writeHead(200, { "content-Type": "text/html" });
    response.end(productRes);
    // console.log(productArray.join(","));
    // fs.readFile("./Data/product.json", "utf-8", (error, data) => {
    //   let products = JSON.parse(data);
    //   response.end(data);
    // });
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}", "Error 404:Page not found"));
  }
});
// Starting Server
server.listen(8000, "127.0.0.1", () => {
  console.log("server started");
});
