# Anki, Cambridge a Seznam slovník v jednom okně, na jedno kliknutí

## Description
Aplikace umožnuje vyhledávat ve dvou slovnících současně:
- Cambridge dictionary pro přesnou definici a příkladové věty
- Seznam slovník pro český překlad

Navíc je možné ihned vytvořit novou kartu a uložit do vlastního Anki.

### Implementation 
- Cambridge dictionary - iframe
- Seznam slovník - web scrapping přes node-fetch
- Anki - [Anki-Connect API](https://foosoft.net/projects/anki-connect/)

### Used technologies
- HTML, CSS, Javascript, Node.js
 
### How to use
- k využití Anki je třeba udělat tyto kroky:
	- stáhnout AnkiConnect [add-on](https://ankiweb.net/shared/info/2055492159)
	- v Anki: Tools -> Add-ons -> AnkiConnect -> Config
	- přidat https://dictionari.herokuapp.com do "webCorsOriginList":
		- ![image](https://user-images.githubusercontent.com/87309427/177270166-eb8d7b61-7976-493c-88e9-9687be98e020.png)
  - restartovat Anki




