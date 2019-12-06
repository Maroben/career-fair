# Career-Fair

## About

A website to display a concise list of information with filtering and searching.

This web application was made for the yearly HSR Career Fair. The purpose is to make it easier for students to gather information about the attending companies.

The application is deployed on [HSR Stellenbörse](https://www.hsrstellenboerse.ch).

Technologies used:

-   Express
-   React
-   Mongoose
-   Typescript
-   Jest
-   Parcel
-   Nodemon

## Set-Up

### Requirements

-   NodeJS (v12.9.1)
-   Yarn (v1.19.1)
-   MongoDB (v4.2.1)
-   VS Code (v1.40.2)
-   Prettier (v3.11.0)

### Development

Install Dependencies

    $ yarn

Start Development Server

    $ yarn start

-   Nodemon will start the Express Server and serve React statically from the dist/frontend folder.
-   Parcel watches and builds the React App to dist/frontend

### Testing

Test Project

    $ yarn test

-   Jest is used for testing

### Build

Build Project

    $ yarn build

-   TSC builds the Express Server to dist
-   Parcel builds the React App to dist/frontend

### Deployment

TBD

## Author

Dijan Helbling

## License (MIT)

Copyright (c) 2019 Dijan Helbling

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
