// FETCH function global
async function postData(url, method, data, mode) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      mode: mode || 'cors',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

async function Vyhledej() {
  let slovo1 = document.getElementById('slovo')
  const cambridge = document.getElementById('cambridge')
  const slovo = slovo1.value
  console.log(slovo)
  cambridge.setAttribute(
    'src',
    `https://www.merriam-webster.com/dictionary/${slovo}`
  )
  // FETCH TO SEZNAM
  let fetchToSeznam = await postData('/slovnikSeznam', 'POST', {
    slovo: slovo,
  })
  // console.log(fetchToSeznam.htmlSeznamSlovnik);
  const seznamDiv = document.querySelector('.seznamSlovnik')
  seznamDiv.innerHTML = fetchToSeznam.htmlSeznamSlovnik
  let Front = document.getElementById('front_anki')
  Front.value = slovo
  return false
}

async function SaveToAnki() {
  const action = 'addNote'
  const version = 6
  let deckName = document.getElementById('deck_anki').value
  let modelName = document.getElementById('cardType_anki').value
  let Back = document.getElementById('back_anki').value
  let tags_string = document.getElementById('tags_anki').value
  const tags = tags_string.split(' ')
  const Front = document.getElementById('front_anki').value
  // FETCH TO ANKI
  let fetchToAnki = await postData('http://127.0.0.1:8765', 'POST', {
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
  })
  document.getElementById('back_anki').value = ''
  document.getElementById('front_anki').value = ''
  document.getElementById('slovo').focus()
  // console.log(fetchToAnki.error);
  return false
}

// NO WHITE SCREEN when rendering iframe
// Prevent variables from being global
;(function () {
  /*
          1. Inject CSS which makes iframe invisible
          */

  var div = document.createElement('div'),
    ref =
      document.getElementsByTagName('base')[0] ||
      document.getElementsByTagName('script')[0]

  div.innerHTML = '&shy;<style> iframe { visibility: hidden; } </style>'

  ref.parentNode.insertBefore(div, ref)

  /*
        2. When window loads, remove that CSS,
        making iframe visible again
        */

  window.onload = function () {
    div.parentNode.removeChild(div)
    document.getElementById('slovo').focus()
  }
})()
