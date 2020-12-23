<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Ce projet a été créée pour le cours de Test unitaire et foncitonnel de la 4IW3 de l'ESGI. Il utilise NestJs, un puissant framework backend utilisant NodeJS et Typescript :
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Particularité

### Emplacement des fichiers de tests unitaires
Conformément aux best practices fourni par la documentation de NestJS, les fichiers de test unitaire sont à placer au plus prêt des classes testés. Il s'agit de tout les fichiers se terminant par ***.spec.ts**.

### DTO et class-validator
Toujours conformément aux best practices du framework, les données circulent dans le back sous forme de DTO : des class mimant les class des entités qui persisteront dans la base de données. 
NestJS recommandant l'utilisation de **class-validator**, un framework permettant une vérification automatique des propriétés selon un schéma fourni. Nous l'avons directement intégré aux DTO. En voici un exemple :

```typescript
// DTO pour la création d'un utilisateur
export class CreateUserDto {

  @IsUUID('all', {  // Décorateur de class-validator vérifiant si la propriété "id" est un uuid
    message: Constants.ERROR_MSG_IS_UUID, // Surchage du message d'erreur
  })
  @IsString({ //  Décorateur de class-validator vérifiant si la propriété "id" est un string
    message: Constants.ERROR_MSG_IS_STRING, // Surchage du message d'erreur
  })
  @IsNotEmpty({  //Décorateur de class-validator vérifiant si la propriété "id" n'est pas vide
    message: Constants.ERROR_MSG_IS_NOT_EMPTY, // Surchage du message d'erreur
  })
  id: string;

  @IsEmail(
    { allow_display_name: false }, // Option, spécifique à ce décorator
    {
      message: Constants.ERROR_MSG_IS_EMAIL,
    },
  )
  @IsString({
    message: Constants.ERROR_MSG_IS_STRING,
  })
  @IsNotEmpty({
    message: Constants.ERROR_MSG_IS_NOT_EMPTY,
  })
  email: string;

  @Length(Constants.MIN_PWD_STR, Constants.MAX_PWD_STR, {
    message: Constants.ERROR_MSG_LENGTH_PWD,
  })
  @IsString({
    message: Constants.ERROR_MSG_IS_STRING,
  })
  password: string;

  @IsString({
    message: Constants.ERROR_MSG_IS_STRING,
  })
  @IsNotEmpty({
    message: Constants.ERROR_MSG_IS_NOT_EMPTY,
  })
  firstname: string;

  @IsString({
    message: Constants.ERROR_MSG_IS_STRING,
  })
  @IsNotEmpty({
    message: Constants.ERROR_MSG_IS_NOT_EMPTY,
  })
  lastname: string;

  @IsUserHaveMinimumAge({ // Custom @ pour une validation personnalisée de la propriété "birthDate"
    message: Constants.ERROR_MSG_USER_WRONG_AGE,
  })
  @IsDate({
    message: Constants.ERROR_MSG_IS_DATE,
  })
  @IsNotEmpty({
    message: Constants.ERROR_MSG_IS_NOT_EMPTY,
  })
  birthDate: Date;

  @IsOptional()
  isValid?: boolean;

  @IsOptional()
  todolist: Todolist;

  // Constructeur générique
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
