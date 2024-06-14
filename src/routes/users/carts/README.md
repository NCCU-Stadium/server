# /users/carts routes

### Create/Remove a cart or add/remove product from cart

<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(Create a new cart)</code></summary>

Add a new cart for given user.

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> |    key    | required | data type |  description |
> | --------- | -------- | --------- | ------------ |
> | `...`     |   `...`  |  `...`    |  ` ...`      |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>DELETE</code> <code><b>/</b></code> <code>(Delete given cart)</code></summary>

Add a new cart for given user.

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
<summary><code>POST</code> <code><b>/add</b></code> <code>(Add product to cart)</code></summary>

Add a new product for given cart. (Check if the cart belongs to the user)

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key        | required | data type |      description       |
> | ---------- | -------- | --------- | ---------------------- |
> | cart_id    | true     | string    | id of the cart         |
> | product_id | true     | string    | id of the product      |
> | color | true     | string    | color of the product   |
> | size | true     | string    | size of the product    |
> | count | true     | string    | count of the product   |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

<details>
<summary><code>DELETE</code> <code><b>/remove</b></code> <code>(Remove product from cart)</code></summary>

Remove a product from given cart. (Check if the cart belongs to the user)

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key        | required | data type |      description       |
> | ---------- | -------- | --------- | ---------------------- |
> | cart_id    | true     | string    | id of the cart         |
> | product_id | true     | string    | id of the product      |
> | color | true     | string    | color of the product   |
> | size | true     | string    | size of the product    |
> | count | true     | string    | count of the product   |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>

---

### List

<details>
<summary><code>GET</code> <code><b>/list</b></code> <code>(List all carts)</code></summary>

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

<details>
<summary><code>GET</code> <code><b>/list-cart</b></code> <code>(List all products from given cart)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Query Parameters

> | key | required | data type | description |
> | --- | -------- | --------- | ----------- |
> | cart_id    | true     | string    | id of the cart         |

##### Responses

> | http code | content-type       | response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | `...`           |
> | `400` ... | `text/plain`       | `error message` |

</details>
