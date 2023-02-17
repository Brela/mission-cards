# mission study cards
The purpose of this site is to create a captivating flashcards application where users can enter a mission, get rewarded for progress, and review added cards at user defined intervals
## live site: <a href="" target="_blank"></a>
### tech used
Vite, TypeScript, MongoDB, Express, React, and Node
### notes
* The front-end (client folder) uses typeScript because I wanted to learn typeScript
* The back-end (server folder) uses plain JS because I already had it developed when I started using TS

### current problems
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
