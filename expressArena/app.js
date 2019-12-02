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

app.get("/cipher", (req, res) => {
  const rotx = (str, x, decrypt = false) => {
    let ccArr = [],
      limits = { upper: [97, 122], lower: [65, 90] },
      charCode;

    if (decrypt) x *= -1;

    x = x % 26;

    for (let i = 0; i < str.length; i++) {
      charCode = str.charCodeAt(i);

      if (charCode >= limits.lower[0] && charCode <= limits.lower[1]) {
        ccArr[i] = ((charCode - limits.upper[0] + x) % 26) + limits.upper[0];
      } else if (charCode >= limits.upper[0] && charCode <= limits.upper[1]) {
        ccArr[i] = ((charCode - limits.upper[0] + x) % 26) + limits.upper[0];
      } else {
        ccArr[i] = charCode;
      }
    }
    return String.fromCharCode(...ccArr);
  };

  const text = req.query.text;
  const shift = req.query.shift;
  const result = rotx(text, shift);
  res.send(result);
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

app.get("/lotto", (req, res) => {
  let { numbers } = req.query;
  if (numbers && Array.isArray(numbers)) {
    numbers = numbers.map(e => parseInt(e));

    if (numbers < 6 || !numbers.every(e => e <= 20 && e >= 1)) {
      res.send("invalid params");
    } else {
      const randomInt = (min, max) =>
        Math.floor(Math.random() * (max - min) + min);

      let generated = [];
      for (let i = 0; i < 6; i++) generated.push(randomInt(1, 21));

      const compArray = generated.filter(v => numbers.includes(v));

      let length = compArray.length;

      if (length < 4) res.send("sorry, you lose");
      else if (length === 4) res.send("congrats, you win a free ticket");
      else if (length === 5) res.send("congrats, you win a hundred dollars");
      else if (length === 6)
        res.send("wow! unbelievable! you could have won the mega millions!");
      else res.send("no result");
    }
  } else {
    res.send("must provide params");
  }
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
