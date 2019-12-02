const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get("/sum", (req, res) => {
  console.log(req.query);
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const resp = `the sum of ${a} and ${b} is ${a + b}`;
  res.send(resp);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
