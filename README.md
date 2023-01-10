A crypto currency exchange widget with a MERN stack.

NestJS is used instead of Express.js

## Description

This widget will be used to display several currency exchanges rates and it will allow the user to exchange USD for Crypto. The application consists of a React front-end client and a Node back-end service (Nest.js)

## Deploying with Docker compose

Provision `.env` file for backend (node.js/nestjs):
```
> cd backend
> cp .env.dist .env
```

Bring the app up with docker compose:
```
> docker-compose up
```

## Manual install

#### Back-end

```
> cd backend
> cp .env.dist .env
> npm install
```

#### Front-end

```
> cd frontend
> npm install
```

### Running the app

#### Back-end

```
> cd backend
> npm start
```

#### Front-end

```
> cd frontend
> PORT=3009 npm start
```

### Database

It is assumed MongoDB runs on `localhost:27017/cryptoexchangedb`
