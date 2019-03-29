# Career-Fair

## About

A website to display a concise list of information with filtering and searching.

This web application was made for the yearly HSR Career event. The purpose is to make it easier for students to gather information about the attending companies.

The application is deployed on a Windows Server [HSR Stellenbörse](https://www.hsrstellenboerse.ch).

## Development

Install NodeJs and MongoDB

Set the NODE_ENV variable to 'development'

Create a 'career_fair_jwtPrivateKey' env variable to a random string.

VS Code Prettier Plugin (Esben Petersen) Settings

    "editor.formatOnSave": true,
    "prettier.arrowParens": "always",
    "prettier.printWidth": 100,
    "prettier.semi": false,
    "prettier.tabWidth": 4,
    "prettier.useTabs": true

## Production

Set the NODE_ENV variable to 'production'
Create a 'career_fair_jwtPrivateKey' env variable to a random string.

### Server

1. install \$ npm i -g node-windows
2. go to server directory and link \$ npm link node-windows
3. intall windows service with \$ npm run build
4. remove windows service with \$ npm run clean

### Client

1. Just run \$ npm run build

## Datastructure

### Companies

    {
        name: "Company XYZ",
        loc: "Building 1, Foyer",
        info: "A great company in whatever we are doing.",
        description:
            "Best working place in the world. Join us for any reason you can find. We got them cookies and coffee, so it must be good.",
        category: '["Informatik", "Elektrotechnik"]',
        tags: '["frontend", "security", "competence"]',
        links: '{
            "homepage": "https://www.company.io",
            "linkedin": "https://www.linkedin.com/company"
        }'
    }

## Author

### Version 1

-   Maroben (Dijan Helbling)

## License (MIT)

Copyright (c) 2019 Maroben (Dijan Helbling)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
