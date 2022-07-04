import fs from "fs";
import fetch from "node-fetch";
import { load } from "cheerio";

export default async function getSlovnik(slovo) {
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
