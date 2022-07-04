// FETCH function
// window.onload = function () {
//   console.log("loadnutí");
//   document.getElementById("slovo").focus();
// };
async function postData(url, method, data, mode) {
  try {
    const response = await fetch(url, {
      method: method, // "POST"
      headers: {
        "Content-Type": "application/json",
      },
      mode: mode || "cors",
      // referrerPolicy: "no-referrer",
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.log(error);
  }
}

async function Vyhledej() {
  let slovo1 = document.getElementById("slovo");

  const cambridge = document.getElementById("cambridge");
  const slovo = slovo1.value;
  console.log(slovo);
  cambridge.setAttribute(
    "src",
    `https://dictionary.cambridge.org/dictionary/english/${slovo}`
  );
  cambridge.onload = function () {
    // cambridge.contentWindow.document.
    var innerDoc =
      cambridge.contentDocument || cambridge.contentWindow.document;
    console.log(innerDoc.body);
  };

  // FETCH TO SEZNAM
  let fetchToSeznam = await postData("/slovnikSeznam", "POST", {
    slovo: slovo,
  });

  console.log(fetchToSeznam.htmlSeznamSlovnik);
  const seznamDiv = document.querySelector(".seznamSlovnik");
  seznamDiv.innerHTML = fetchToSeznam.htmlSeznamSlovnik;
  let Front = document.getElementById("front_anki");
  Front.value = slovo;

  return false;
}

async function SaveToAnki() {
  const action = "addNote";
  const version = 6;
  let deckName = document.getElementById("deck_anki").value;
  let modelName = document.getElementById("cardType_anki").value;
  let Back = document.getElementById("back_anki").value;
  let tags_string = document.getElementById("tags_anki").value;
  const tags = tags_string.split(" ");
  console.log(tags);
  const Front = document.getElementById("front_anki").value;
  console.log({
    action,
    version,
    params: {
      note: {
        deckName,
        modelName,
        fields: {
          Front,
          Back,
        },
        tags: ["slovniky"],
      },
    },
  });
  // FETCH TO ANKI

  let fetchToAnki = await postData(
    "http://127.0.0.1:8765",
    "POST",
    // {
    //   action: "addNote",
    //   version: 6,
    //   params: {
    //     note: {
    //       deckName: "COMPUTER_SCIENCE",
    //       modelName: "Basic",
    //       fields: {
    //         Front: "ftent",
    //         Back: "btent",
    //       },
    //       tags: ["slovniky"],
    //     },
    //   },
    // }
    {
      action,
      version,
      params: {
        note: {
          deckName,
          modelName,
          fields: {
            Front,
            Back,
          },
          tags,
        },
      },
    }
  );
  // Back = "";
  document.getElementById("back_anki").value = "";
  document.getElementById("front_anki").value = "";
  document.getElementById("slovo").focus();
  console.log(fetchToAnki.error);
  return false;
}

// async function requestPermissionAnki() {
//   const permissionAnki = await postData("http://localhost:8765/", "POST", {
//     action: "requestPermission",
//     version: 6,
//   });
//   console.log(permissionAnki);
// }
// console.log(Vyhledej());

// NO WHITE SCREEN
// Prevent variables from being global
(function () {
  /*
          1. Inject CSS which makes iframe invisible
          */

  var div = document.createElement("div"),
    ref =
      document.getElementsByTagName("base")[0] ||
      document.getElementsByTagName("script")[0];

  div.innerHTML = "&shy;<style> iframe { visibility: hidden; } </style>";

  ref.parentNode.insertBefore(div, ref);

  /*
        2. When window loads, remove that CSS, 
        making iframe visible again
        */

  window.onload = function () {
    div.parentNode.removeChild(div);
    document.getElementById("slovo").focus();
  };
})();

setTimeout(() => {
  const iframe = document.getElementById("cambridge");
  const iWindow = iframe.contentWindow;
  console.log(iWindow);
  const iDocument = iWindow.document;
  console.log(iDocument);

  // accessing the element
  const element = iDocument.getElementsByTagName("p")[0];
  console.log(element);
  var innerDoc = cambridge.contentDocument;
  const inner2 = cambridge.contentWindow.document;
  console.log(innerDoc.body);
  console.log(inner2.body);
}, 6000);
