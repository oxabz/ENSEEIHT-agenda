# ENSEEIHT-calandar

Small Calandar application created in the context of learning web devellopement at ENSEEIHT.

## Installation

First step of all is downloading the sources.

```sh
git clone https://github.com/oxabz/ENSEEIHT-agenda.git
cd ENSEEIHT-agenda
```

then you have two option :

### With docker-compose

Make sure that you have docker & docker-compose installed and run

```sh
docker-compose up
```

### From source

> Note : The installation from the source will require that you have an instance of postrgress running on `localhost` on port `5432` with a database  `fs-enseeiht-agenda` with the user and the password and username `postgres:postrges`
> These setting can be changed in `backend/config/default.json`.
> Warning : the project as been tested with postgres 10 and require the `uuid-ossp` extention.
> Warning : the project as been tested Node 14 and 16.

#### Production

```sh
# build step
cd frontend
yarn install
yarn run build
cp -rf dist/* ../backend/public
cp ../backend
# run step
yarn run start
```

#### Developement

For running the project for developpement you'll need two terminal respectively in `backend` and `frontend`. Then run :

```sh
# in ./backend
yarn install 
yarn run dev
```

```sh
# in ./frontend
yarn install 
yarn run serve
```
