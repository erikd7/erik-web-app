# erik-web-app

run Vue and Python servers with 'sh run.sh'

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

Frontend Vue container image build:

```
docker build --tag normalone7/erik-web-app-vue .
```

Backend Python Flask image build:

```
docker build --tag normalone7/erik-web-app-python api-server/.
```
