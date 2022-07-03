import express from "express";
const app = express();
import fs from "fs";
const port = "8080";
import fetch from "node-fetch";
import { load } from "cheerio"; // cheerio creates dom ze stringu
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.set("view engine", "ejs");
let slovnik = "ahoj";

app.get("/", (req, res) => {
  res.render("index");
});

const getReddit = async () => {
  // get html text from reddit
  const response = await fetch(
    "https://slovnik.seznam.cz/preklad/anglicky_cesky/hello"
  );
  // using await to ensure that the promise resolves
  const body = await response.text(); // body je readable stream
  // console.log(body);
  slovnik = body;

  // parse the html text and extract titles
  let $ = load(body);

  let line = $(".Box-content-line");
  // console.log(line);

  const titleList = [];

  // using CSS selector
  $(".Box-content-line").each((i, title) => {
    // i je index prvku
    // nadpisy postů
    const titleNode = $(title);
    const titleText = titleNode.text();

    titleList.push(titleText);
  });

  // console.log(titleList);
};

// getReddit();

async function getData() {
  const url = "http://webcode.me";

  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body); // tady mám celou html page
}
// getData();

async function getSlovnik(slovo) {
  const writeStream = fs.createWriteStream("slovnik.html");
  const url = `https://slovnik.seznam.cz/preklad/anglicky_cesky/${slovo}`;

  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body); // tady mám celou html page

  let radek = $("ol");
  // console.log(radek.text());
  // console.log("1: ", radek.find("a").html()); // vybere 1.
  // console.log("2: ", radek.children().html()); // vybere 1.
  // console.log(typeof radek.children().html());
  // console.log("3: ", radek.next().html());
  // console.log("________");
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
      [lang="en"]::before {
    content: "\\00a0 ";}
    </style>
    <ol>` +
      $(element).html() +
      `    </ol>
  </body>
</html>`;
    // const attribute = $(element).attr("class").replace(/\s\s+/g, " ");

    // console.log(item + " ||||||||||||| " + attribute);
    console.log("_________");
    writeStream.write(item);
  });

  console.log("ahojky");
  const htmlSeznamSlovnik = fs.readFileSync("./slovnik.html", "utf8");

  return htmlSeznamSlovnik;
}

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

app.post("/pokus", (req, res) => {
  console.log(req.body.text);
  res.send("ahoj");
});

app.get("/slovnik", (req, res) => {});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
