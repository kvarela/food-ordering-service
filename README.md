# Space Food Runners

## Description

Space Food Runners is a fictional food delivery service. This is a [Nest](https://github.com/nestjs/nest) backend which contains services for registering a user and a restaurant. It utilized a GraphQL API and a Postgres DB. It uses Sendgrid to send welcome/verification emails and Twilio to send OTP codes via SMS. It has a JWT based authentication system.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn dev

# production mode
$ yarn start
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Database

Database URLs should be stored in a .env file. Recommend creating `food_ordering_service` and `food_ordering_service_test`

## License

Nest is [MIT licensed](LICENSE).
