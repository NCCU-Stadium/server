# /announcements routes

### Announcement

<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(Create a new announcement)</code></summary>

The user's role should be 'admin' to create new announcement.

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key     | required | data type | description            |
> | ------- | -------- | --------- | ---------------------- |
> | title   | true     | string    | Announcement's title   |
> | content | true     | string    | Announcement's content |

##### Responses

> | http code    | content-type       | response            |
> | ------------ | ------------------ | ------------------- |
> | `200`        | `application/json` | `...`               |
> | `400`, `500` | `text/plain`       | `error message`     |
> | `403`        | `text/plain`       | `permission denied` |

</details>

<details>
<summary><code>PATCH</code> <code><b>/</b></code> <code>(Modify an announcement)</code></summary>

The user's role should be 'admin' to modify an announcement.

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key     | required | data type | description            |
> | ------- | -------- | --------- | ---------------------- |
> | id      | true     | string    | Announcement's id      |
> | title   | true     | string    | Announcement's title   |
> | content | true     | string    | Announcement's content |

##### Responses

> | http code    | content-type       | response            |
> | ------------ | ------------------ | ------------------- |
> | `200`        | `application/json` | `...`               |
> | `400`, `500` | `text/plain`       | `error message`     |
> | `403`        | `text/plain`       | `permission denied` |

</details>

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(Get announcement list)</code></summary>

Date format: 'year-month-day' _e.g._ '2024-06-12'

##### Query Parameters

> | key   | required | data type | description                         |
> | ----- | -------- | --------- | ----------------------------------- |
> | start | false    | string    | Start time of the retrieval request |
> | end   | false    | string    | End time of the retrieval request   |

##### Responses

```typescript
type Res = {
  id: string
  title: string
  content: string
  time: TimeStamp
}
```

> | http code | content-type       | response                |
> | --------- | ------------------ | ----------------------- |
> | `200`     | `application/json` | `{[{Res}, {Res}, ...]}` |
> | `400`     | `text/plain`       | `error message`         |

</details>

<details>
<summary><code>GET</code> <code><b>/{id}</b></code> <code>(Get certain announcement's information)</code></summary>

##### Path Parameters

> | key | required | data type | description                    |
> | --- | -------- | --------- | ------------------------------ |
> | id  | true     | string    | The id of certain announcement |

##### Responses

```typescript
type Res = {
  id: string
  title: string
  content: string
  time: TimeStamp
}
```

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `{Res}`         |
> | `400`     | `text/plain`       | `error message` |

</details>
