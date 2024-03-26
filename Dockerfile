FROM ghcr.io/puppeteer/puppeteer:22.6.1

USER pptruser

COPY . /home/pptruser/markdown-party

WORKDIR /home/pptruser/markdown-party

USER root

RUN npm install 

RUN npm run build

RUN chown -R pptruser:pptruser /home/pptruser

USER pptruser

CMD node /home/pptruser/markdown-party/build/index.js
