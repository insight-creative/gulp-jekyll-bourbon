# gulp-jekyll-bourbon
Node package project that lets you quickly setup and test a `Jekyll` site using `Bourbon and Neat` with `gulp`.

### External Documentation
+ <a href="https://nodejs.org/en/docs/" target="_blank">Node.js</a>
+ <a href="http://bourbon.io/docs/" target="_blank">Bourbon</a>
+ <a href="http://thoughtbot.github.io/neat-docs/latest/" target="_blank">Neat</a>
+ <a href="https://jekyllrb.com/docs/home/" target="_blank">Jekyll</a>

### Installing Node.js
Make sure you have `Node.js` installed on your computer. If not, visit <a href="https://nodejs.org/en/" target="_blank">here</a> and download the stable version.

### Updating npm
`Node.js` comes with `npm` installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you'll want to make sure it's the latest version.
```
sudo npm install npm -g
```

### Installing Gulp
In order to build out your project, you'll need to install `gulp` since it will be doing most of the heavy lifting for us.
*Note: Using the -g tag installs the package globally on your machine so that it can be used anytime and anywhere.*
```
npm install gulp -g
```

## Initial Setup
Clone the repository for your new project and download it locally to your machine. Once its on your machine, open your terminal and navigate to the root folder of the new project. Then run the following command to install of the required files used for development only:
```
npm install
```
>This looks in the package.json folder and installs all of the dependencies listed into a new folder called node_modules. You should never have to edit or navigate into the node_modules folder.

## Using Gulp
### First time setup
The first time you setup the files on your computer run the default gulp command by typing the following command:
```
gulp
```
>This allows the files to build out so that when you run gulp serve you'll be able to see your project right away

### Browser preview with BrowserSync
This is going to be the gulp command you use the most. Running gulp serve is going to take your working files in the `src` folder and build them out to the `_site` folder. It will also include `.min` files for your `CSS` and `JavaScript` and also reduce your image file sizes.
```
gulp serve
```
>`gulp serve` uses `browser-sync` for reloading the web page during changes and also runs `jekyll build` with `--watch --incremental --drafts`.

### Minification of files
If you simply want to run the scripts that give you minified CSS and JavaScript files and reduce image sizes then this is the command you use:
```
gulp minify
```
>`gulp minify` uses `gulp-cssnano`, `gulp-uglify`, `gulp-sourcemaps`, `gulp-imagemin`, `imagemin-pngquant`, and `gulp-rename` for its clean up.

### Building final files
Once you are done with all of your edits and want to build out your final files to the `_site` folder, run the following command:
```
gulp build
```
>`gulp build` runs the same processes as `gulp serve` and `gulp minify` but doesn't load the browser.

### Removing build files
If you ever feel the need to remove the `_site` folder so that you have a clean build to work with all you need to do is run the command:
```
gulp clean
```
>`gulp clean` uses `del` to remove the `_site` directory from the project

### Testing CSS and JavaScript
To test and find any `css` or `JavaScript` errors simply run the command:
```
gulp test
```
>`gulp test` uses `gulp-csslint` to test `css` and `gulp-jshint` to test `JavaScript`.
