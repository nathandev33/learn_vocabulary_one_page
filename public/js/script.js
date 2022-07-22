// FETCH function global
const postDataError = 'Něco se pokazilo. Ujistěte se, že program Anki běží.'

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
    // console.log(error)
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
  slovo1.value = '' // clear input
  return false
}

async function SaveToAnki() {
  document.querySelector('.anki-error-message').textContent = ''
  const action = 'addNote'
  const version = 6
  let deckName = document.getElementById('deck_anki').value
  let modelName = document.getElementById('cardType_anki').value
  let Back = document.getElementById('back_anki').value
  let tags_string = document.getElementById('tags_anki').value
  const tags = tags_string.split(' ')
  const Front = document.getElementById('front_anki').value
  // FETCH TO ANKI
  let fetchToAnki
  try {
    fetchToAnki = await postData('http://127.0.0.1:8765', 'POST', {
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
  } catch (error) {
    console.log(error)
  }

  if (!fetchToAnki) {
    document.querySelector('.anki-error-message').textContent =
      'Něco se pokazilo. Ujistěte se, že program Anki běží.'
  } else if (fetchToAnki.error === null) {
    console.log('no error')
    document.getElementById('back_anki').value = ''
    document.getElementById('front_anki').value = ''
    document.getElementById('slovo').focus()
    const icon = document.querySelector('.anki-check-icon')
    icon.style.display = 'inline'
    icon.style.width = '1rem'
    icon.style.height = '1rem'
    setTimeout(() => {
      icon.style.display = 'none'
    }, 3000)
  } else if (fetchToAnki.error !== null) {
    console.log('is error')

    const icon = document.querySelector('.anki-error2-icon')
    icon.style.display = 'inline'
    icon.style.width = '1rem'
    icon.style.height = '1rem'
    setTimeout(() => {
      icon.style.display = 'none'
    }, 2000)

    const errorMessage = document.querySelector('.anki-error-message')
    errorMessage.textContent = `${fetchToAnki.error}`
  }
  // console.log(fetchToAnki.error)
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
