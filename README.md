# MarkDownie's PDF Party

Welcome to MarkDownie's PDF Party - your easy to use Markdown to PDF converter.

## Frontend
![image](https://github.com/Simre1/missing-semester-project/assets/23276756/25ccfbd4-e228-4ff4-9e48-fa68eaf4c970)

To convert Markdown encoded text into a PDF, 
type or paste it into the editor on the left. 
Press then compile button (the one with the error in the center) to create a PDF out of the text, 
which gets then displayed on the right. 
As a special service, everytime you compile, 
a (harmless) surprise will happen to brighten up your day. 🎉🥳

On case custom styling is wanted, by using the pencil button (the one left to the compile button) a second editor for CSS input can be opened.
CSS styles need to target HTML elements, like `h1` or `p`.

### Used technology
The project is based on Svelte for the frontend and SvelteKit for the backend.

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


## Installation

To enable easy usage and installation MarkDownie's PDF Party is available as a Docker container. 

Just pull the container from `ghcr.io/simre1/missing-semester-project:release` and expose port 3000 to your network.


# Acknowledgment
For the creation of McDownie's PDF Party, we entered the JavaScript Hell (although relying on TypeScript as well) and use a number open-source projects as listed below:

 - md-to-pdf
   The MIT License (MIT)

   Copyright (c) 2024 Simon Hänisch

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

 - Material Symbols
   Copyright 2024 Google

   Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
   specific language governing permissions and limitations under the License.

 - Monaco Editor
   The MIT License (MIT)

   Copyright (c) 2016 - present Microsoft Corporation

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
   COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

 - Svelte
   The MIT License (MIT)

   Copyright (c) 2016 - 2024 the contributors of the repository at https://github.com/sveltejs/svelte

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

 - tsParticles
   The MIT License (MIT)

   Copyright (c) 2020 Matteo Bruni

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
