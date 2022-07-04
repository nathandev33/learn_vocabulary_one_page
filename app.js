// IMPORTS
import express from "express";
const app = express();
import fs from "fs";
const port = "8080";
import fetch from "node-fetch";
import { load } from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/slovnikSeznam", async (req, res) => {
  console.log("dostal jsem request");
  const slovo = req.body.slovo;
  console.log("slovo: ", slovo);
  const htmlSeznamSlovnik = await getSlovnik(slovo);
  res.status(200).json({
    message: "success",
    htmlSeznamSlovnik,
  });
});

async function getSlovnik(slovo) {
  const writeStream = fs.createWriteStream("slovnik.html");
  const url = `https://slovnik.seznam.cz/preklad/anglicky_cesky/${slovo}`;

  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body);

  let radek = $("ol");
  radek.each((index, element) => {
    const item =
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <style>
      .d {
        color: gray;
      }
      a {
        color: blue;
      }
      .Box-content-pointer {
        display: none;
      }
      .d:before,
.Box-content .y:before {
  content: "(";
 }
 .d:after {
    content: ")";
}
[lang="cs"]:not:(a)::before {
    content: "\\00a0 ";}

   span.note::before {
    content: " -> ";
    color: red;
    font-weight: 900;
}
span [lang="en"]::before {
    background: green;
    content: " ";
    display: block;
}
      [lang="en"]::before {
    content: "\\00a0 ";}
    </style>
    <ol>` +
      $(element).html() +
      `    </ol>
  </body>
</html>`;
    writeStream.write(item);
  });

  const htmlSeznamSlovnik = fs.readFileSync("./slovnik.html", "utf8");
  return htmlSeznamSlovnik;
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
