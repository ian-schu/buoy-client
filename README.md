# Client app for Buoy
A search engine for consumers to find businesses they want to believe in / support with their dollars.

----
This app started life as boilerplate from `preact-cli`, so the following **terminal commands are baked in:**

```bash
// install dependencies
npm install

// serve with hot reload at localhost:8080
npm start

// run tests with jest and preact-render-spy 
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

----

## Current issues / to-do's

 - Landing screen does not provide any feedback while it's getting your location. *When* it receives your location it should transfer you to the next screen, but if you don't care then just navigate to `/values`
 - Results screen just fires a generic *get all records* request to our "database" which is just an AirTable sheet right now. This means your selections have NO effect on the result set. Also, you may need to reload the results screen manually to get the REST call to work right.
 - Clicking on the topmost filter "pills" on the Results screen doesn't do anything yet -- if you want to change your selection, just use `Back` on your browser.