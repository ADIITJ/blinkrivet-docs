import http from "node:http";
import fs from "node:fs/promises";
const html = await fs.readFile(new URL("./index.html", import.meta.url));
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:4173");
  if (url.pathname !== "/") {
    response.writeHead(404, { "Content-Type": "text/plain" });
    return response.end("Not found");
  }
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  response.end(html);
});
server.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(4173, "127.0.0.1", () => console.log("Public consumer demo: http://127.0.0.1:4173"));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close());
