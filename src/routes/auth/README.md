# /auth routes

### Register

<details>
<summary><code>POST</code> <code><b>/register</b></code> <code>(Register user)</code></summary>

##### Body (application/json or application/x-www-form-urlencoded)

> | key      | required | data type | description                  |
> | -------- | -------- | --------- | ---------------------------- |
> | email    | true     | string    | User's mail                  |
> | password | true     | string    | User's password              |
> | phone    | true     | string    | User's phone                 |
> | role     | true     | string    | "user", "admin" or "coach"   |
> | name     | true     | string    | Default's user name          |
> | avatar   | false    | string    | Avatar url                   |
> | gender   | false    | string    | "F" or "M"                   |
> | birth    | false    | string    | YYYY-MM-DD _e.g._ 2003-04-01 |

##### Responses

> | http code    | content-type       | response                  |
> | ------------ | ------------------ | ------------------------- |
> | `200`        | `application/json` | `{"mail": "user's mail"}` |
> | `409`, `500` | `text/plain`       | `error message`           |

</details>

---

### Login

<details>
<summary><code>POST</code> <code><b>/login</b></code> <code>(Login user)</code></summary>

##### Body (application/json or application/x-www-form-urlencoded)

> | key      | required | data type | description     |
> | -------- | -------- | --------- | --------------- |
> | email    | true     | string    | User's mail     |
> | password | true     | string    | User's password |

##### Responses

> | http code | content-type       | response                                                                                   |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------ |
> | `200`     | `application/json` | `{"email": "user's mail", "role": "user" \| "admin" \| "coach", jwtToken: "Bearer token"}` |
> | `401`     | `text/plain`       | `passwords do not match`                                                                   |
> | `500`     | `text/plain`       | `internal error message`                                                                   |

</details>
