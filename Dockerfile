FROM node:14.17.0
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 4000