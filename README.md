# Markdown PDF

Welcome to McDownie's PDF Party - your easy to use Markdown to PDF converter.

## Frontend
To convert Markdown encoded text, 
paste it into the editor on the left. 
Press then compile button to create a PDF out of it, 
which gets then displayed on the right. 
As a special service, everytime you compile, 
a (harmless) surprise will happen to brighten up your day. 🎉🥳

### Used technology
The frontend was created using Svelte.

### Fonts
We used fonts available from Google Fonts (Inter, Londrina Shadow, and the Material Symbols), 
but we embedded them in our project, so that Google Servers are not called.
In the Acknowledgement section of our project, the Material Symbols are mentioned,
as the other fonts use 
[the SIL Open Font License (OFL) license](https://openfontlicense.org),
for which acknowledgements are not necessary.

## Backend

Send a POST request with the markdown content to `/api` to get a pdf back.

## Starting

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview` or start it in production with `node build/index.js`. If you are having issues with PhantomJS when running `node build/index.js`, use `OPENSSL_CONF=/dev/null node build/index.js`!
