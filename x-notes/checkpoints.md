# significant checkpoints
## organization
<u>front-end</u>
- client/apiFetches folder allows react components to cleanly communicate with the back-end 'server.js' (which calls the corresponding controller)
- 'React context' is used to share data between components like 'deckName' and 'cards'

<u>back-end</u>
- server.js connects to MongoDB via database.js module
- server.js assigns the api calls from client to corresponding controllers => then the controllers refer to the 'models' to verify schema


## features
- 