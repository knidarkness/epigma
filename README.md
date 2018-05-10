# E-pigma project

[![Build Status](http://52.47.206.37:8080/buildStatus/icon?job=epigma/master)](http://52.47.206.37:8080/job/epigma/job/master/)

## Launching 

Then set its URI in the ```const.js``` as following: ```http://host:80/api/path```.

To run this project run following commands in the root directory of the project:

```
npm install
npm start
```
and then open the index.html in the browser.

### Using docker-compose

Another way to launch this project is to run it with docker-compose. To do that you need to have a Docker and 
docker-compose installed in your system. Then you can simply run ```docker-compose up``` from the root directory
of the repository and navigate to http://localhost to explore the Epigma editor.

## Dev-tools

For debug consider using [Redux DevTool Extension](http://extension.remotedev.io) for Firefox or Chrome.

## TODO

- multiple select
- fix undoables -- undo/redo states of each doc seprtly
- add shape move
- drawing via paths
- bezier curves on editing

- revert redux to canonical structure
- create node by click & move


- add type to the shapes
- color palette for the shapes (stroke/fill colors)
- rectangles drawing

## License

All code is distributed under the MIT License.
