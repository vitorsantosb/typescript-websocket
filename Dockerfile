FROM node:20.16.0


RUN mkdir -p /usr/src/mevi_projetct

WORKDIR /usr/src/mevi_projetct


COPY package.json /usr/src/mevi_projetct
RUN npm install

COPY . /usr/src/mevi_projetct

EXPOSE 5000

CMD ["node", "index.ts"]