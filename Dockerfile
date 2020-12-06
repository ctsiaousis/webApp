FROM node:12
WORKDIR /home/node/app
COPY app /home/node/app
RUN npm install
EXPOSE 80
CMD npm run app