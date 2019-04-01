FROM node:11
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN chmod a+x *.sh