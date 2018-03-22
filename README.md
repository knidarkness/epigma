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

## TO-DO

Do it.

- multiple docs
- transform matrix
- undo/redo
- UX key binding (canvas manipulation by mouse)
- Edit/navigation mode
- CRUD for illustrations/<s>objects</s>
- <s>add Docker for the project build</s>

## License

All code is distributed under the MIT License.
