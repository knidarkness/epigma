FROM httpd:latest

RUN apt-get update
RUN apt-get install curl -y --force-yes

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN npm i -g webpack webpack-cli

RUN mkdir -p /tmp/application
WORKDIR /tmp/application

COPY . /tmp/application

RUN npm i
RUN webpack --mode production

RUN cp index.html /usr/local/apache2/htdocs/
RUN mkdir /usr/local/apache2/htdocs/build/
RUN cp ./build/* /usr/local/apache2/htdocs/build/
