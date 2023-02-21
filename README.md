# mission study cards
The purpose of this site is to create a captivating flashcards application where users can enter their current mission, get rewarded for progress (with points), and review added cards at user defined intervals
<!-- ## live site: <a href="" target="_blank"></a> -->
### start it up
* add *.env* file to *server/config/* -> add port and DB_string to env file
* cd client -> npm install -> npm run dev
* cd server -> npm install -> npm run dev
* go to http://localhost:5173/ in browser

### tech used
Vite, TypeScript, MongoDB, Express, React, and Node
### notes
* The front-end (client folder) uses typeScript because I wanted to learn typeScript
* The back-end (server folder) uses plain JS because I already had it developed when I started using TS

✳️ to adjust properties that a Card has in MongoDB, these need adjusted:
    🗝️ the Card model -- server/models/Card
    🗝️ the newCard properties -- server/controllers/createCardController
    🗝️ the parameters and body contents of createCard function -- client/src/apiFetches
    🗝️ the CardType definition -- client/src/types/CardType

### temp notes
* For now, the 'Add Card' page will display a list of cards for that deck next to section where you can add a card
* Aim for component-based architecture where each component is responsible for rendering its own content and managing its own state.

### current problems
** 'More' popups don't close when others are clicked:
* in components/home/deckItem.tsx, code doesn't work for closing other popups. You have to cancel each one to close

** Get hosted:
* I converted the back-end file types to .mjs because I was having trouble with running the build command "start". Using require syntax was giving me trouble. Do I need a module bundler like webpack to use the 'require' syntax?

** Figure out font awesome:
* currently I am using the font-aweomse fonts from the CDN that the app connects to in the index.html.
* need to figure out how to use the ones in node_modules/@fortawesome


### highlights
✔️ using React router to route to a decks page when clicked

### todo
* create page for adding a card
* create page for studying card

* on Home page, in deckItem, add in dynamic card number to each deck based on the associated cards for that deck in Mongo
* add error handling to server
