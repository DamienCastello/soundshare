# Soundshare Project v1.0.0
NPM is used to manage dependencies

## Philosophie du projet
Ce projet a pour objectif de regrouper des ressources intéressantes pour les compositeurs amateurs ou professionnels.
Son but est aussi de proposer aux artistes de publier leurs sons en cours de production pour avoir des feedbacks d'autres utilisateurs.

## Fonctionnalités Cøre
Module Ressource
- Permet aux utilisateurs de publier des ressources liées à la composition musicale (tutoriels, packs de samples, articles sur VST).
- Possibilité de partager des liens vers des sites propriétaires de VST (payants ou gratuits).
- Les utilisateurs peuvent poster, modifier, supprimer leurs propres ressources.
- Les artistes ont le droit de liker les ressources d'autres utilisateurs.

Module Track
- Permet aux utilisateurs de partager des morceaux en cours de production.
- Les utilisateurs peuvent poster, modifier, supprimer leurs propres morceaux.
- Les artistes ont le droit de liker les morceaux d'autres utilisateurs.
- Les artistes peuvent laisser des feedbacks sur les morceaux d'autres utilisateurs.


# Backend Node.js
*requirements :*
- node >= 20.11.0
- npm >= 10.2.4
- sequelize-cli
- mysql

first run `npm install`

add `.env` file in the backend folder of project and add following lines
```text
DB_USERNAME='root'
DB_PASSWORD=''
DB_NAME='soundshare_db_dev'
JWT_SECRET='s0undshare'
DB_HOSTNAME=127.0.0.1
HOST=127.0.0.1:5000
```
after you can run
```shell
npx sequelize-cli db:create # Run db creation
npx sequelize-cli db:migrate # Run migrations

node seeds/01_users.js && node seeds/02_resources.js # Run seeds

nodemon # Start server
```
Now you are ready to use this backend project

# App web React
*requirements :*
- node >= 20.11.0
- npm >= 10.2.4
- expo-cli

first run `npm install`

write your ipv4 in utils/url.js

run `npm start`

Then Signup & Signin with your created credentials.
<!-- you can now use `backend/seeds/01_users.js` credentials -->

# Mobile-app React-native
*requirements :*
- node >= 20.11.0
- npm >= 10.2.4
- react >= 18.2.0

first run `yarn`

write your ipv4 in utils/url.js

run `yarn start`

Then Signup & Signin with your created credentials.
<!-- you can now use `backend/seeds/01_users.js` credentials -->