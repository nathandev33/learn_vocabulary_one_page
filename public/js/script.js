const cambridge = document.getElementById("cambridge");
let slovo = document.getElementById("slovo");

// FETCH function
async function postData(url, method, data) {
  try {
    const response = await fetch(url, {
      method: method, // "POST"
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.log(error);
  }
}

async function Vyhledej() {
  //   e.preventDefault();
  console.log("ahoj");
  slovo = slovo.value;
  console.log(slovo);
  cambridge.setAttribute(
    "src",
    `https://dictionary.cambridge.org/dictionary/english/${slovo}`
  );
  //   seznam.setAttribute(
  //     "src",
  //     `https://slovnik.seznam.cz/preklad/anglicky_cesky/${slovo.value}`
  //   );

  let fetchToSeznam = await postData("/slovnikSeznam", "POST", {
    slovo: slovo,
  });
  console.log(fetchToSeznam.htmlSeznamSlovnik);
  const seznamDiv = document.querySelector(".seznamSlovnik");
  seznamDiv.innerHTML = fetchToSeznam.htmlSeznamSlovnik;
  // let fetchToSeznam = async (e) => {
  //   try {
  //     let res = await fetch("/slovnikSeznam", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         slovo: slovo,
  //       }),
  //     });

  //     if (res.status === 200) {
  //       let resJson = await res.json();
  //       console.log(resJson.htmlSeznamSlovnik);
  //       const seznamDiv = document.querySelector(".seznamSlovnik");
  //       seznamDiv.innerHTML = resJson.htmlSeznamSlovnik;
  //     } else {
  //       console.log("error when fetching");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // fetchToSeznam();

  return false;
}

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
  };
})();
