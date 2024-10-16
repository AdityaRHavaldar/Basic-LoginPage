const http = require("http");

const users = [{ email: "admin@gmail.com", password: "Admin" }];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("No Data");
  }
});

server.listen(3000, () => {
  console.log("Server Running");
});
