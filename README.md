Installation
============

Install node.js (http://nodejs.org/)

Install grunt cli (http://gruntjs.com/)

	sudo npm install -g grunt-cli


Install all dependencies:

	sudo npm install


***

Working with Grunt
==================
### Default task:
Running grunt default task will:

	grunt

- concate and unglify your javascript
- recreate sprites from all images
- compile less files
- compile all templates into static html files

After running this task you can start your webserver in public directory and your app will be ready to use.

### Predefined tasks:

This task will start a local webserver inside of public directory and open chrome with it and than ti will watch for less and template changes 

(**use this during the development**)

	grunt server

***

Switching between production and development environment

(this task basically just change isProduction in all relevant settings and than run grunt default task)

	grunt prod // production
	grunt dev  // development

***

Create sprites from all icons located inside icon folder.

Readme: https://github.com/Ensighten/grunt-spritesmith

You may need to install Cairo or Phantom.js: https://github.com/LearnBoost/node-canvas/wiki/Installation---OSX

	grunt sprites

Compile all less files

	grunt css

***
Compile all templates:

	grunt tpl

***
Lint your javascript using jshint and eslint

	grunt hint

***
Beautify your javascript (so if you are stuck with indentation js hint errors, you can run this task and it will fix it automatically)

	grunt beauty

***
Concat and uglify javascript

	grunt packjs

***
Run mocha tests tests

	grunt test

***	
Create the screenshots of every page in 3 resolutuins within screenhshot directory, this will take a while, but you will have after the screenshots of whole app in all covered resolutions.
You will need to have phantom.js installed. (brew update && brew install phantomjs)

	grunt screens

***
Generate the javascript statistic by plato plugin

	grunt reports

***


Creating a new module
=====================
For easy module creation there is a yeoman module task that can do all the work for you.
First you need to install yeoman globally.

	sudo npm install -g yo
	
Than you need to link the generator by running:

	sudo cd generator-module && npm link && cd ..
	
After that you will have linked module generator.
Now you can run this command:

	yo module
	
And it will ask you for module name and create and link all the proper files required for single module.
