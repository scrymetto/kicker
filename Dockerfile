FROM node:alpine as build
WORKDIR /
COPY package.json /package.json
ENV PATH /node_modules/.bin:$PATH
RUN npm install
COPY . /
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]