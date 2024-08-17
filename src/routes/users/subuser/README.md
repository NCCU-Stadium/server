# /users/subuser routes

### Create/Delete Subuser

<details>
<summary><code>POST</code> <code><b>/{username}</b></code> <code>(Create a new subuser)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key    | required | data type | description                                       |
> | ------ | -------- | --------- | ------------------------------------------------- |
> | avatar | false    | string    | Avatar url                                        |
> | gender | true     | string    | Gender                                            |
> | birth  | true     | string    | Birth date (format: YYYY-MM-DD _e.g._ 2003-01-01) |

##### Responses

> | http code | content-type       | response                                   |
> | --------- | ------------------ | ------------------------------------------ |
> | `200`     | `application/json` | `Ok`                                       |
> | `400`     | `text/plain`       | `missing required fields`                  |
> | `500`     | `application/json` | `{"message": "message", "error", "error"}` |

</details>

<details>
<summary><code>DELETE</code> <code><b>/{username}</b></code> <code>(Delete a subuser)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

> | http code | content-type       | response                                   |
> | --------- | ------------------ | ------------------------------------------ |
> | `200`     | `application/json` | `Deleted`                                  |
> | `500`     | `text/plain`       | `{"message": "message", "error", "error"}` |

</details>

### Modify Subuser

<details>
<summary><code>PATCH</code> <code><b>/{username}</b></code> <code>(Modify a existing subuser)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

At least provide one of the following.

> | key    | required | data type | description    |
> | ------ | -------- | --------- | -------------- |
> | avatar | false    | string    | New avatar url |
> | name   | false    | string    | New name       |
> | gender | false    | string    | New gender     |
> | birth  | false    | string    | New birth      |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `Ok`            |
> | `400`     | `text/plain`       | `error message` |

</details>

### Retrieve Subuser Info

<details>
<summary><code>GET</code> <code><b>/{mail}/{username}</b></code> <code>(Get info of specified subuser)</code></summary>

##### Responses

```typescript
type Subuser = {
  mail: string
  avatar?: string
  createdAt: string
  name: string
  gender?: string
  birth?: string
}
```

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `{Subuser}`     |
> | `400`     | `text/plain`       | `error message` |

</details>

<details>
<summary><code>GET</code> <code><b>/{mail}</b></code> <code>(Get list of subusers)</code></summary>

##### Responses

```typescript
type User = {
  name: string
  avatar: string
}
```

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `{User[]}`      |
> | `400`     | `text/plain`       | `error message` |

</details>
