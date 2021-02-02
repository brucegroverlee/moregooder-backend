# Crowd Check [backend]

## Architecture
- Clean Architecture / Hexagonal Architecture (Ports and Adapters)

### Principles
- SOLID
- (REP) The Reuse/Release Equivalence Principle
- (CCP) The Common Cloure Principle
- (CRP) The Common Reuse Principle
- The Stable Dependencies Principle
- The Stable Abstractions Principle

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

## References
- Clean Architecture
- [] Growing Object-Oriented Software, Guided by Tests
- [Model Methods](https://sequelize.org/master/class/lib/model.js~Model.html)
- [Clean Architecture: Use case containing the presenter or returning data?](https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data)
- [A button, as a “Clean Architecture” plugin](https://codereview.stackexchange.com/questions/148809/a-button-as-a-clean-architecture-plugin)
- [Onion architecture compared to hexagonal](https://stackoverflow.com/questions/50039019/onion-architecture-compared-to-hexagonal)
- [Hexagonal architecture (software)](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))
- [Organizing Layers Using Hexagonal Architecture, DDD, and Spring](https://www.baeldung.com/hexagonal-architecture-ddd-spring)
- [Ports And Adapters Architecture](http://wiki.c2.com/?PortsAndAdaptersArchitecture)
- [Ports-And-Adapters / Hexagonal Architecture](http://www.dossier-andreas.net/software_architecture/ports_and_adapters.html)
- [hexagonal architecture with spring data](https://stackoverflow.com/questions/46509252/hexagonal-architecture-with-spring-data)
- [Inverting Dependencies: A Step Towards Hexagonal Architecture](https://medium.com/better-programming/inverting-dependencies-a-step-towards-hexagonal-architecture-ee74e11877dd)
- [Domain-Driven Design and the Hexagonal Architecture](https://vaadin.com/learn/tutorials/ddd/ddd_and_hexagonal)
- [Securely storing environment variables in Google App Engine (GAE) with app.yaml](https://github.com/marketplace/actions/gae-environment-variable-compiler)
- [How to deploy a Node.js app to Google App Engine using Github Actions](https://tomekkolasa.com/how-to-deploy-node-js-app-to-google-app-engine-using-github-actions)