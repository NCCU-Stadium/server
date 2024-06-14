# /users/reserves routes

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(Get all reservation given the specific limitation)</code></summary>

##### Query Parameters

> | key       | required | data type | description             |
> | --------- | -------- | --------- | ----------------------- |
> | date      | true     | string    | date of the reservation |
> | tableId   | false    | string    | N/A                     |
> | timeIndex | false    | string    | N/A                     |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>GET</code> <code><b>/{user_id}</b></code> <code>(Get all reservation of the given user)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>POST</code> <code><b>/{table_id}</b></code> <code>(Reserve a table for user)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key       | required | data type | description                   |
> | --------- | -------- | --------- | ----------------------------- |
> | date      | true     | string    | date of the reservation       |
> | timeIndex | true     | string    | time index of the reservation |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>DELETE</code> <code><b>/{table_id}</b></code> <code>(Cancel a table reservation)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key       | required | data type | description                   |
> | --------- | -------- | --------- | ----------------------------- |
> | date      | true     | string    | date of the reservation       |
> | timeIndex | true     | string    | time index of the reservation |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>
