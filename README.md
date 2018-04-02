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


- C/D for nodes in edit mode of a shape
- atomic entities (either all document (name, data, shapes), either only id and receive all properties via separate API calls)
- fix undoables -- undo/redo states of each doc seprtly
- each file up to 100 LOC

- <s><b>split async actions into separate files, so that /actions/index.js define only atomic action creators (research/probably use: redux-observable)</b></s>
- <s><b>research and use selectors for data access</b></s>
- <s><b>dev-dep & dep</b></s>
- <s><b>add moment.js for date/time formatting</b></s>
- <s><b>redux dev-tools</b></s>
- <s><b>refactor reducer decomposition</s></b>
- <s><b>finally deal with babel and mocha</b></s>

## License

All code is distributed under the MIT License.
