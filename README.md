# Moregooder [backend]

## Features
- Clean Architecture / Hexagonal Architecture (Ports and Adapters)
- Firestore DB
- TypeScript
- Integrtion and unit testing (TDD)
- Documentation with Swagger
- CI with Github Actions

## DB migrations
#### Set db env
change the values of the .env file

#### Up migrations
```
npm run db-migrate up
```

#### Down migrations
```
npm run db-migrate down
```

#### Create a new migrations
```
npm run db-migrate create nameOfMigration
```

## Deploy

```
gcloud config set project moregooder
```

## References
- Clean Architecture
- Growing Object-Oriented Software, Guided by Tests
- [Domain-Driven Design and the Hexagonal Architecture](https://vaadin.com/learn/tutorials/ddd/ddd_and_hexagonal)
- [Securely storing environment variables in Google App Engine (GAE) with app.yaml](https://github.com/marketplace/actions/gae-environment-variable-compiler)
- [How to deploy a Node.js app to Google App Engine using Github Actions](https://tomekkolasa.com/how-to-deploy-node-js-app-to-google-app-engine-using-github-actions)