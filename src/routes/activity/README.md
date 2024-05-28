# /activity routes

### Activity

<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(Create a new activity)</code></summary>

The user's role should be 'admin' to create new activity.

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key     | required | data type | description        |
> | ------- | -------- | --------- | ------------------ |
> | title   | true     | string    | Activity's title   |
> | content | true     | string    | Activity's content |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>PATCH</code> <code><b>/</b></code> <code>(Modify an activity)</code></summary>

The user's role should be 'admin' to modify an activity.

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key     | required | data type | description        |
> | ------- | -------- | --------- | ------------------ |
> | title   | true     | string    | Activity's title   |
> | content | true     | string    | Activity's content |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(Get activity list)</code></summary>

##### Query Parameters

> | key   | required | data type | description                         |
> | ----- | -------- | --------- | ----------------------------------- |
> | start | false    | string    | Start time of the retrieval request |
> | end   | false    | string    | End time of the retrieval request   |
> | ...   | ...      | ...       | ...                                 |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>GET</code> <code><b>/{id}</b></code> <code>(Get certain activity's information)</code></summary>

##### Path Parameters

> | key | required | data type | description                |
> | --- | -------- | --------- | -------------------------- |
> | id  | true     | string    | The id of certain activity |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>
