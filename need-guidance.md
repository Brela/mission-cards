### where should I import my CSS files? into each component, into the 'page', or into main.tsx?

CP: main.tsx works fine! The trend now is to either do this or use component level styles. You only need to do this once in your main.tsx file. header and footer css files can go there, for example.

### how should I keep track of what deck is clicked in the 'AddCards' page?

- currently using the params from the url, but not sure if this will cause problems later on.

CP: This is where redux or simply elevated state in react could be helpful here! Will talk more in person

### should I use redux?

CP: You could! Not strictly necessary, but it's still industry standard, so worth knowing. It is it's own thing, so I'd create a project _just_ to learn Redux.

### using vite and react router. Should I swap over to next.js and use that router?

CP: Same as above - seems to work for this project. Next.js has a lot more conceptually going on, the router is just one part of it. Worth learning, but what you have here works.

### performance/ speeds showing indev tools/ lighthouse is bad (like 50). Is this because it is running on local host?

CP: More than likely, it's also not a typical, seo friendly type page, so that may be bringing the overall score down.

### Figure out font awesome:

- currently I am using the font-aweomse fonts from the CDN that the app connects to in the index.html.
- need to figure out how to use the ones in node_modules/@fortawesome

CP: The documentation on this is not great in my experience, but [this](https://fontawesome.com/v5/docs/web/use-with/react) should get you started. Honestly, for most personal projects, I do the same - using the CDN. There is a font awesome React component in the link I shared so that you use:

```
 <FontAwesomeIcon icon="check-square" />
```

Follow Get Started, and using icons via individual use.

### any other recommendations

-------- other --------------

- thinking about hosting on AWS, do you recommend something else?

- still need to learn authentication
