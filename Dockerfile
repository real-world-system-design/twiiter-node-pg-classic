# FROM node:14-alpine as builder

# ENV NODE_ENV build

# USER node
# WORKDIR /home/node

# COPY . /home/node

# RUN npm ci \
#     && npm run build

# # ---

# FROM node:14-alpine

# ENV NODE_ENV production

# USER node
# WORKDIR /home/node

# COPY --from=builder /home/node/package*.json /home/node/
# COPY --from=builder /home/node/dist/ /home/node/dist/

# RUN npm ci

# CMD ["node", "dist/main.js"]


FROM node:21.2-alpine3.18 
COPY ./ /opt 
WORKDIR "/opt" 
RUN npm cache clean --force && rm -rf node_modules && npm install 

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait
CMD /wait && npm run start

CMD ["npm","run", "start"]
