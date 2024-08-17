# /users routes

### Points

<details>
<summary><code>GET</code> <code><b>/points</b></code> <code>(Get user's point number)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

> | http code | content-type       | response             |
> | --------- | ------------------ | -------------------- |
> | `200`     | `application/json` | `{"points": "num"}`  |
> | `500`     | `application/json` | `{"error", "error"}` |

</details>

<details>
<summary><code>POST</code> <code><b>/points/user/{operation}</b></code> <code>(Update user's point number)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Path Parameters

> | key       | required | data type | description    |
> | --------- | -------- | --------- | -------------- |
> | operation | true     | string    | "add" or "sub" |

##### Body (application/json or application/x-www-form-urlencoded)

> | key    | required | data type | description   |
> | ------ | -------- | --------- | ------------- |
> | amount | true     | number    | Add to amount |

##### Responses

> | http code | content-type       | response             |
> | --------- | ------------------ | -------------------- |
> | `200`     | `application/json` | `{"points": "num"}`  |
> | `500`     | `application/json` | `{"error", "error"}` |

</details>

<details>
<summary><code>POST</code> <code><b>/points/admin/{operation}</b></code> <code>(Update user's point number)</code></summary>

<br />For admin

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Path Parameters

> | key       | required | data type | description    |
> | --------- | -------- | --------- | -------------- |
> | operation | true     | string    | "add" or "sub" |

##### Body (application/json or application/x-www-form-urlencoded)

> | key        | required | data type | description       |
> | ---------- | -------- | --------- | ----------------- |
> | amount     | true     | number    | Amount to operate |
> | targetUser | true     | number    | N/A               |

##### Responses

> | http code | content-type       | response                                         |
> | --------- | ------------------ | ------------------------------------------------ |
> | `200`     | `application/json` | `{"points": "num", "mail": "targetUser's mail"}` |
> | `500`     | `application/json` | `{"error", "error"}`                             |

</details>

### Unpaid

<details>
<summary><code>POST</code> <code><b>/unpaid/add</b></code> <code>(Change unpaid number)</code></summary>

<br />For user

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key    | required | data type | description   |
> | ------ | -------- | --------- | ------------- |
> | amount | true     | number    | Add to amount |

##### Responses

> | http code | content-type       | response             |
> | --------- | ------------------ | -------------------- |
> | `200`     | `application/json` | `Ok`                 |
> | `500`     | `application/json` | `{"error", "error"}` |

</details>

<details>
<summary><code>POST</code> <code><b>/unpaid/admin/{operation}</b></code> <code>(Change unpaid number)</code></summary>

<br />For admin

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Path Parameters

> | key       | required | data type | description    |
> | --------- | -------- | --------- | -------------- |
> | operation | true     | string    | "add" or "sub" |

##### Body (application/json or application/x-www-form-urlencoded)

> | key        | required | data type | description       |
> | ---------- | -------- | --------- | ----------------- |
> | amount     | true     | number    | Amount to operate |
> | targetUser | true     | number    | N/A               |

##### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `{"unpaid": "number", "mail": "Modified Mail"}` |
> | `500`     | `application/json` | `{"error", "error"}`                            |

</details>
