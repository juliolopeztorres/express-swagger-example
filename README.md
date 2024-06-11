# Express Swagger Example

Node project based on a simple [Express](https://expressjs.com) configuration. 

## Code structure
As there is no tight specification under Express
website itself related to code structure, the main organization here tries to stick to the following pattern:

- Express is executed by `bin/server.ts`, which is an example of using `http` module along with `Express` as main request listener
- `app.ts` instantiates the main `Express` object called `app`. Here middlewares are defined too, wrapping the whole `app`
- Code is then structured following a `router` > `services` > `repositories` pattern
  - Incoming request are handled in `routers`
    - Here happens anything related to parsing data from the incoming request and mapping data to HTTP responses
    - Can use any `service` defined in the application context
    - Optionally, data validation should be performed here
  - `services` handle validated input data coming from `routers` to provide `Promise`-like responses with plain JS object
    - `services` may extend from `AbstractService` to keep logging capabilities and common code organized
    - Domain `errors` should be defined and thrown from here

  - A service may use one or more `repositories` to populate those object and then provide with the relevant information to `services`
    - `repositories` should extend from `AbstractRepository`, for the same reasons as before
    - Those `repositories` DB-oriented use raw `sql` file, previously parsed by `pg-promise` with input data

For simplicity, no explicit dependency is used for `ORM` approach nor for dependency injection (basic module - ECMA Script singleton instantiation). This does not mean that any dependency related to these topics could be added in the future.
