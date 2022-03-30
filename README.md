# Overview

A simple app for housing hobby projects and learning.

API runs from the [erik-web-app-api repo](https://github.com/normalone7/erik-web-app-api).

# Deployment

The Vue app auto-deploys to Vercel on pushes to `main`.

Domain: [edietrich.com](https://www.edietrich.com/)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Docker setup

I have also used Docker to deploy locally via my home server. I keep the Docker setup for future uses (e.g. I have had a frontend proxy for secure requests to the backend, but I either have to write something custom to auto-deploy to my home Synology server or pay for a hosting service that supports Docker and docker-compose.) One day!

Frontend Vue container image build:

```
docker build --tag normalone7/erik-web-app-vue .
```

Two Docker files for the Frontend: Dockerfile-Vue and Dockerfile-Proxy.
