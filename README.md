Click on the link to view the E-Learning Document : https://github.com/sameers25/react-webpack/blob/master/React%20-%20E-Learning%20Document.docx?raw=true



# react_webpack

to run this project
steps:

npm install
npm start

for production
npm build

# what is webpack?

webpack is one of the pillars of modern Web Development. It’s an incredibly powerful tool.
webpack ingests raw React components for producing Javascript code that (almost) every browser can understand.

for more details refer following link:

https://webpack.js.org/

steps to integrate webpack with raw structure:

1. mkdir react_webpack && cd react_webpack

2. create minimal directory

    mkdir -p src

3. Initialize 

    npm init -y

4. Install webpack

    npm i webpack --save-dev

5. Will Also need webpack cli
    
    npm i webpack-cli --save-dev

6. Add Following to package.json
```
    "scripts": {
    "build": "webpack --mode production"
    }
```
7. 

As it is raw structure we need to add webpack loader:

Since the browser can’t understand React components as they come there is the need for some kind of transformation.

Required following:

    i. babel preset env for compiling Javascript ES6 code down to ES5 (please note that babel-preset-es2015 is now deprecated)
    ii. babel preset react for compiling JSX and other stuff down to Javascript

    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

Configure babel, Create a new file named .babelrc inside the project folder
```
    {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
```
8. Add React Dependencies

npm i react react-dom --save-dev

create directories

mkdir -p src/js/components/{container,presentational}

9. Create File inside container AppLayout.js
```
    import React, { Component } from "react";


        class AppLayout extends Component {
        constructor() {
            super();

            this.state = {
            title: ""
            };
        }

        render() {
            return (
            <div>test</div>
            );
        }
        }
        export default AppLayout;
```
10. 
    To display our React form we must tell Webpack to produce an HTML page. The resulting bundle will be placed inside a <script></script>tag.

    create src\index.html
```
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
        <title>React_Webpack</title>
    </head>

    <body>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 offset-md-1">
                        <div id="root">
                        <!-- form -->
                    </div>

                </div>

            </div>
        </div>
    </body>

    </html> 
```

Webpacks needs two additional components for processing HTML: html-webpack-plugin and html-loader.

npm i html-webpack-plugin html-loader --save-dev

11. Create file webpack.config.js at base directory

    add following configuration to same:
```
    const HtmlWebPackPlugin = require("html-webpack-plugin");

    module.exports = {
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [
            {
                loader: "html-loader"
            }
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
        })
    ]
    };
```
10. Webpack expects entry point index.js

    add file to src\index.js
```
    import React, { Component } from "react";
    import ReactDOM from "react-dom";

    import AppLayout from "./js/components/container/appLayout";

    const wrapper = document.getElementById("root");
    wrapper ? ReactDOM.render(<AppLayout />, wrapper) : false;
```
11. npm run build


Configuring Development Server for above implementation

1. npm i webpack-dev-server --save-dev
2. open packeg.json and update 
```
"scripts": {
  "start": "webpack-dev-server --open --mode development",
  "build": "webpack"
}
```
3. npm start



For details I have referred follwing blog:
1. https://www.valentinog.com/blog/react-webpack-babel/
2. https://www.robinwieruch.de/minimal-react-webpack-babel-setup/
3. https://medium.com/@siddharthac6/getting-started-with-react-js-using-webpack-and-babel-66549f8fbcb8




