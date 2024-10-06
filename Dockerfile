FROM node:20.16.0


RUN mkdir -p /usr/src/template_project

WORKDIR /usr/src/template_project


COPY package.json /usr/src/template_project
RUN npm install

COPY . /usr/src/template_project

EXPOSE 5000

CMD ["node", "index.ts"]