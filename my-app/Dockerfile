FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Add this environment variable to allow connections from all hosts
ENV HOST=0.0.0.0

EXPOSE 5173

CMD ["npm", "run", "dev"] 