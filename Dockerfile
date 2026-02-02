FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY src ./src
COPY tsconfig.json .
RUN npm run build

ENV PORT=4008
EXPOSE 4008

CMD ["npm", "start"]