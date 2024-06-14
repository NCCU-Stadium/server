# /users/reserves routes

<details>
<summary><code>GET</code> <code><b>/all</b></code> <code>(Get all reservation given the specific limitation)</code></summary>

##### Query Parameters

> | key     | required | data type | description                               |
> | ------- | -------- | --------- | ----------------------------------------- |
> | date    | true     | string    | date of the reservation e.g. "2024-06-01" |
> | tableid | false    | string    | <b>one</b> specific table id, e.g. 5      |
> | timeidx | false    | string    | <b>one</b> specific timeIndex, e.g. 5     |

##### Responses

```ts
type Reservation = {
  timeidx: number
  tabledate: Date
  tableid: number
}

e.g.
[
    {
        "timeidx": 1,
        "tabledate": "2024-05-31T16:00:00.000Z",
        "tableid": 101
    },
    {
        "timeidx": 2,
        "tabledate": "2024-05-31T16:00:00.000Z",
        "tableid": 102
    }
]
```

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `Reservation[]` |
> | `400`     | `text/plain`       | `error message` |

</details>

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(Get all reservation of the given user)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

```ts

type userReserve = {
    user_mail: string,
    usedtableid: number,
    tabledate: Date,
    timeidx: number
}


e.g.
[
    {
        "user_mail": "dev@dev.com",
        "usedtableid": 5,
        "tabledate": "2024-06-01T16:00:00.000Z",
        "timeidx": 5
    }
]
```

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `userReserve[]` |
> | `400`     | `text/plain`       | `error message` |

</details>

<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(Reserve a table for user)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key       | required | data type | description                               |
> | --------- | -------- | --------- | ----------------------------------------- |
> | date      | true     | string    | date of the reservation e.g. "2024-06-01" |
> | tableid   | true     | string    | <b>one</b> specific table id, e.g. 5      |
> | timeIndex | true     | string    | <b>one</b> specific timeIndex , e.g. 3    |

##### Responses

> | http code | content-type       | response                                                       |
> | --------- | ------------------ | -------------------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "reserved successfully", "reserve": userReserve}` |
> | `400`     | `text/plain`       | `error message`                                                |

</details>

<details>
<summary><code>DELETE</code> <code><b>/</b></code> <code>(Cancel a table reservation)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key     | required | data type | description                               |
> | ------- | -------- | --------- | ----------------------------------------- |
> | date    | true     | string    | date of the reservation e.g. "2024-06-01" |
> | tableid | true     | string    | <b>one</b> specific table id, e.g. 5      |
> | timeidx | true     | string    | <b>one</b> specific timeIndex, e.g. 5     |

##### Responses

> | http code | content-type       | response                                                          |
> | --------- | ------------------ | ----------------------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Cancelled successfully", "cancelled": userReserve}` |
> | `400`     | `text/plain`       | `error message`                                                   |

</details>
