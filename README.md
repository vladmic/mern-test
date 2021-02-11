## MERN test task

Stack: Node, Express, Mongoose, MongoDB, JWT, React, Redux, Redux-Saga

Deployed to Heroku at https://mern-test-back.herokuapp.com

### Deploy

```shell script
git clone https://github.com/ekreerenko/mern-test-backend
cd ./mern-test-backend
nvm use 14
```

### Install dependencies

```shell script
npm i
cd ./frontend
npm i -g yarn
yarn
```

Alternatively, run the [install-dependencies.sh](install-dependencies.sh) script:

```shell script
bash ./install-dependencies.sh
```

### Environment variables

The `.env` file in the root project directory is required, see [.env.example](.env.example) for details.

The `.env` file in the `frontend` directory is also required.

### Launch

Run the backend:

```shell script
npm run dev
```

The backend app will run on http://localhost:9000

Run the frontend (in a separate terminal window):

```shell script
npm run dev:frontend
```

The frontend app will run on http://localhost:3000

Additionally, you can build the frontend:

```shell script
npm run build
```

For the production launch, the `start` script should be used:

```shell script
npm start
```

This will build the frontend application and the backend application will serve the static assets on http://localhost:9000

### Tests

```shell script
npm run test
```

Tests are done with Jest

### Linting

```shell script
npm run lint
```

Using ESLint
