# mission study cards
The purpose of this site is to create a captivating flashcards application where users can enter their current mission, get rewarded for progress (with points), and review added cards at user defined intervals
<!-- ## live site: <a href="" target="_blank"></a> -->
## start it up
* add *.env* file to *server/config/* -> add port and DB_string to env file
* cd client -> npm install -> npm run dev
* cd server -> npm install -> npm run dev
* go to http://localhost:5173/ in browser

### notes
* The front-end (client folder) uses typeScript because I wanted to learn typeScript
* The back-end (server folder) uses plain JS because I already had it developed when I started using TS

### current problems
* cards don't load on 'AddCard' page (CardsList component) if the deck has spaces in the name
* cards dont reload in tha that same component when a new card is added
  * figure out adding the Create Card button click in 'AddCardContainer' as a prop so that the 'CardList' component can be updated when a new card is added
  * is this doen through the parent component (pages/AddCard) that they share? 

## tech used
Vite, TypeScript, MongoDB, Express, React, and Node

