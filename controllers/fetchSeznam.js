import fs from 'fs'
import fetch from 'node-fetch'
import { load } from 'cheerio'

export default async function getSlovnik(slovo) {
  const writeStream = fs.createWriteStream('slovnik.html')
  const url = `https://slovnik.seznam.cz/preklad/anglicky_cesky/${slovo}`

  const response = await fetch(url)
  const body = await response.text()

  let $ = load(body)

  let results = $('.TranslatePage-results')
  results.each((index, element) => {
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
   
[lang="cs"]:not:(a)::before {content: "\\00a0 ";}
    .Box-header-button{
      display: none;}
      ol{
        padding:0;
      }
      ul{padding-left:5px;}
      h2.Box-header-title {
    font-size: 15px;
    margin-bottom: 0;
    background-color: green;
    border-radius: 8px;
    text-align: center;
}
.Box-header-title-form {
    margin-left: .5rem;
    font-style: italic;
    color: #eee;
    font-size:12px;
}
.note, .y {
    color: gray;
}
.y, .v, .w{
    font-style: italic;
        color: gray;
}
.Box-content .y:after {
    content: ") ";
}

    </style>
    <ul>` +
      $(element).html() +
      `    </ul>
  </body>
</html>`
    writeStream.write(item)
  })

  let radek = $('ol')
  let radekUl
  //   if (radek.length === 0) {
  //     console.log('ol není')
  //     radekUl = $('ul')

  //     radekUl.each((index, element) => {
  //       const item =
  //         `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>Document</title>
  //   </head>
  //   <body>
  //     <style>
  //       .d {
  //         color: gray;
  //       }
  //       a {
  //         color: blue;
  //       }
  //       .Box-content-pointer {
  //         display: none;
  //       }
  //       .d:before,
  // .Box-content .y:before {
  //   content: "(";
  //  }
  //  .d:after {
  //     content: ")";
  // }
  // [lang="cs"]:not:(a)::before {
  //     content: "\\00a0 ";}

  //    span.note::before {
  //     content: " -> ";
  //     color: red;
  //     font-weight: 900;
  // }
  // span [lang="en"]::before {
  //     background: green;
  //     content: " ";
  //     display: block;
  // }
  //       [lang="en"]::before {
  //     content: "\\00a0 ";}
  //     </style>
  //     <ul>` +
  //         $(element).html() +
  //         `    </ul>
  //   </body>
  // </html>`
  //       writeStream.write(item)
  //     })
  //   } else {
  //     radek.each((index, element) => {
  //       const item =
  //         `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>Document</title>
  //   </head>
  //   <body>
  //     <style>
  //       .d {
  //         color: gray;
  //       }
  //       a {
  //         color: blue;
  //       }
  //       .Box-content-pointer {
  //         display: none;
  //       }
  //       .d:before,
  // .Box-content .y:before {
  //   content: "(";
  //  }
  //  .d:after {
  //     content: ")";
  // }
  // [lang="cs"]:not:(a)::before {
  //     content: "\\00a0 ";}

  //    span.note::before {
  //     content: " -> ";
  //     color: red;
  //     font-weight: 900;
  // }
  // span [lang="en"]::before {
  //     background: green;
  //     content: " ";
  //     display: block;
  // }
  //       [lang="en"]::before {
  //     content: "\\00a0 ";}
  //     </style>
  //     <ol>` +
  //         $(element).html() +
  //         `    </ol>
  //   </body>
  // </html>`
  //       writeStream.write(item)
  //     })
  //   }

  const htmlSeznamSlovnik = fs.readFileSync('./slovnik.html', 'utf8')
  return htmlSeznamSlovnik
}
