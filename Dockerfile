FROM node:22-alpine
COPY . .
RUN yarn 
RUN yarn build
