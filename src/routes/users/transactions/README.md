# /users/transactions route

### Buy points

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
> | unpaid | true     | number    | Add to unpaid |
> | point  | true     | number    | Add to point  |

##### Responses

> | http code | content-type       | response                             |
> | --------- | ------------------ | ------------------------------------ |
> | `200`     | `application/json` | `{"points": "num", "unpaid": "num"}` |
> | `500`     | `application/json` | `{"error", "error"}`                 |

</details>
