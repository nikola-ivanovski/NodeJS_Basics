import http from "http";

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/" && method === "GET") {
    response.setHeader("Content-Type", "text/html");
    response.write("<h1>Hello from G11</h1>");
    response.end();
  }

  if (url === "/student" && method === "GET") {
    response.setHeader("Content-Type", "text/html");
    response.write(
      "<p>Student name: Nikola; Lastname: Ivanovski; Academy: SEDC; Subject: NodeJS</p>"
    );
    response.end();
  }
});

server.listen(3000, () => {
  console.log("Server is up and running...");
});
