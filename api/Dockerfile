FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

#RUN echo deb http://ftp.uk.debian.org/debian jessie-backports main >>/etc/apt/sources.list
#RUN apt-get update
#RUN apt-get install cron certbot -t jessie-backports -yqq

#RUN (crontab -l 2>/dev/null; echo "0 0 * * * certbot certonly --standalone --agree-tos --email $certbotEmail -n -d $certbotDomain > /tmp/certbot_log.txt") | crontab -
#CMD certbot certonly --standalone --agree-tos --email $certbotEmail -n -d $certbotDomain && npm start
CMD npm start