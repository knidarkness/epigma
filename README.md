# E-pigma project

## Launching 

Before launching you should run the back-end project from [epigma-be](https://github.com/knidarkness/epigma-be) repository.

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

For debug consider using [Redux DevTool Extensio](http://extension.remotedev.io) for Firefox or Chrome.

## TODO

- fix undoables -- undo/redo states of each doc seprtly

- <s><b>dev-dep & dep</b></s>
- <s><b>add moment.js for date/time formatting</b></s>
- <s><b>redux dev-tools</b></s>
- refactor reducer decomposition
- research and use selectors for data access
- <s><b>finally deal with babel and mocha</b></s>
- split async actions into separate files, so that /actions/index.js define only atomic action creators (research/probably use: redux-observable)
- each file up to 100 LOC
- atomic entities (either all document (name, data, shapes), either only id and receive all properties via separate API calls)
- C/D for nodes in edit mode of a shape

## License

All code is distributed under the MIT License.
