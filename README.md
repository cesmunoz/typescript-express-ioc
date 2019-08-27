# typescript-express-ioc

# Table Of Contents

- [Setup](#setup)
  - [VSCode](#vscode)
  - [Node](#node)
  - [Database](#database)
    - [Docker Instructions](#docker)
  - [Yarn](#yarn)
- [Installing dependencies](#installing-dependencies)
- [Running application](#running-application)
- [Testing](#testing)

## Setup

### Installations

**VSCode**  
[https://code.visualstudio.com/](https://code.visualstudio.com/)

**Node**  
[https://nodejs.org/es/](https://nodejs.org/es/)

**Database**

MongoDB  
[https://www.docker.com/](https://www.docker.com/)

If you don't want to install mongo you can install Docker and create a container of mongo db

DOCKER  
[https://www.docker.com/](https://www.docker.com/)
IMPORTANT: You need to run the following command on the terminal

```
docker pull mongo
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo
```

### **IMPORTANT**

Create a database with the name **db**  
and a collection with the name **\_init**

**Yarn (Optional)**  
https://yarnpkg.com/en/

# Installing dependencies

In the root directory:

NPM

```
npm i
```

Yarn

```
yarn
```

# Running applications

Run the application

Server

```
NPM: npm run start
YARN: yarn start
```

# URLs

Server

```
http://localhost:8000/
```

# Testing

Server

```
yarn test (You must have admin priviligies)
```
