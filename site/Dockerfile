FROM httpd:latest

RUN apt-get update
RUN apt-get install curl -y --force-yes

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN npm i -g webpack webpack-cli

RUN mkdir -p /tmp/application
WORKDIR /tmp/application

# COPY ./apache2.conf /etc/apache2/apache2.conf
COPY . /tmp/application
# COPY .htaccess /usr/local/apache2/htdocs/


RUN npm i
RUN npm i -g serve
RUN npm run prod
CMD serve -s
# RUN webpack --mode production --history-api-fallback

#RUN cp index.html /usr/local/apache2/htdocs/
#RUN mkdir /usr/local/apache2/htdocs/build/
#RUN cp ./build/* /usr/local/apache2/htdocs/build/
