FROM node:16
WORKDIR .
ADD package*.json .
RUN npm install
ADD . .
EXPOSE 3000
CMD ["npm", "start"]