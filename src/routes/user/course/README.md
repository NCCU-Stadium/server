# /user/course routes

<details>
<summary><code>POST</code> <code><b>/add</b></code> <code>(user add a course)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key | required | data type | description |
> | --- | -------- | --------- | ----------- |
> | ... | ...      | ...       | ...         |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>
<details>
<summary><code>DELETE</code> <code><b>/remove</b></code> <code>(user remove a course)</code></summary>

Remove a product from given cart. (Check if the cart belongs to the user)

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key | required | data type | description |
> | --- | -------- | --------- | ----------- |
> | ... | ...      | ...       | ...         |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>GET</code> <code><b>/list</b></code> <code>(list all courses for the user)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Query Parameters

> | key | required | data type | description |
> | --- | -------- | --------- | ----------- |
> | ... | ...      | ...       | ...         |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>
