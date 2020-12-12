FROM node
WORKDIR /home/node/dbapi
COPY ./dbAPI /home/node/dbapi
RUN npm install
EXPOSE 2000
CMD npm run dbapi