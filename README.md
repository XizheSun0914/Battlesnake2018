# Battlesnake 2018 Contestant

Came short of beginner division finals; 2nd place in semi-finals due to time out (my fault of course). 
Built on boilerplate node.js snake supplied by battlesnake team. 

## What I've learned from this experience

- Inneffieciently implemented algorithms do not scale well!
- Testing NEEDS to be thorough.
- Parsing JSON code from an incoming server in javascript.
- A better understanding of A* and Floodfill algorithms.

## Running the AI locally

Fork and clone this repo:

```shell
git clone git@github.com:cbmathieson/Battlesnake2018.git
cd Battlesnake2018
```

Install the client dependencies:

```shell
npm install
```

Create an `.env` file in the root of the project and add your environment variables (optional).

Run the server:

```shell
npm start
```

Test the client in your browser: [http://localhost:5000](http://localhost:5000)

## Deploying to Heroku

Click the Deploy to Heroku button at the top or use the command line commands below.

Create a new NodeJS Heroku app:

```shell
heroku create [APP_NAME]
```

Push code to Heroku servers:

```shell
git push heroku master
```

Open Heroku app in browser:

```shell
heroku open
```

Or go directly via <http://APP_NAME.herokuapp.com>

View/stream server logs:

```shell
heroku logs --tail
```
