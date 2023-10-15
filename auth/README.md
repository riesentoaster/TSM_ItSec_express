# Authentication

Source: [Authenticate users with NodeJS, ExpressJS and PassportJS](https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/)

## PassportJS

[PassportJS](https://www.passportjs.org/concepts/authentication/) is an authentication middleware for NodeJS. It provides a flexible framework which allows an application to make use of different authentication mechanisms, like username and password, single sign-on (SSO) with Facebook or Google, or access to APIs with token-based credentials.

Request are reduced to a simple statement: `app.post('/login/password', passport.authenticate('local'));`<br>
Hidden behind that simple statement are three fundamental concepts:
1. Middleware (e.g. PasswordJS)
2. Strategies (e.g. `passport-local`, authentication with username and password, other strategies as token-based with OpenID are also possible)
3. Sessions (e.g. `express-session`, a cookie-based session middleware)


## Other useful packages

- `express`: server framework
- `body-parser`: parses incoming request bodies
- `express-session`: cookie-based session middleware
- `passport`: authentication library
- `passport-local`: core authentication library
- `connect-ensure-login`: authorization middleware that makes it easy to restrict access to pages. Built to work with `passport`

Packages to integrate MongDB:
- `mongoose`: object data mapper used to integrate MongoDB with NodeJS
- `passport-local-mongoose`: strategy which integrates `mongoose` with `passport-local` strategy
