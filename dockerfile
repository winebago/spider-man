FROM mcr.microsoft.com/playwright:v1.55.0-noble

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV DISPLAY=:99

EXPOSE 8080

CMD ["sh", "-c", "Xvfb :99 -screen 0 1920x1080x24 -ac & npm start"]
