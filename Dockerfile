#FROM ubuntu:latest
#LABEL authors="mahmo"
#
#ENTRYPOINT ["top", "-b"]

FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]

