# /users/carts routes

### Create/Remove a cart or add/remove product from cart

<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(Create a new cart)</code></summary>

Add a new cart for given user.

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

> | http code | content-type       | response                                                          |
> | --------- | ------------------ | ----------------------------------------------------------------- |
> | `200`     | `application/json` | `{"user_mail": "mail@mail.com", "isdone": bool, "cart_id": "id"}` |
> | `400`     | `text/plain`       | `error message`                                                   |

</details>

<details>
<summary><code>DELETE</code> <code><b>/</b></code> <code>(Delete given cart)</code></summary>

Add a new cart for given user.

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key     | required | data type | description        |
> | ------- | -------- | --------- | ------------------ |
> | cart_id | true     | string    | The id of the cart |

##### Responses

> | http code | content-type       | response                  |
> | --------- | ------------------ | ------------------------- |
> | `200`     | `application/json` | `{"Deleted_Cart_id": []}` |
> | `400`     | `text/plain`       | `error message`           |

</details>

<details>
<summary><code>POST</code> <code><b>/add</b></code> <code>(Add product to cart)</code></summary>

Add a new product for given cart. (Check if the cart belongs to the user)

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key        | required | data type | description          |
> | ---------- | -------- | --------- | -------------------- |
> | cart_id    | true     | string    | id of the cart       |
> | product_id | true     | string    | id of the product    |
> | color      | true     | string    | color of the product |
> | size       | true     | string    | size of the product  |
> | count      | true     | string    | count of the product |

##### Responses

> | http code | content-type       | response                                                                                   |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------ |
> | `200`     | `application/json` | `{"cart_id": "id", "product_id": "id", "size": "size", "color": "color", "count": number}` |
> | `400`     | `text/plain`       | `error message`                                                                            |

</details>

<details>
<summary><code>DELETE</code> <code><b>/remove</b></code> <code>(Remove product from cart)</code></summary>

Remove a product from given cart. (Check if the cart belongs to the user)

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key        | required | data type | description          |
> | ---------- | -------- | --------- | -------------------- |
> | cart_id    | true     | string    | id of the cart       |
> | product_id | true     | string    | id of the product    |
> | color      | true     | string    | color of the product |
> | size       | true     | string    | size of the product  |
> | count      | true     | string    | count of the product |

##### Responses

```typescript
type RemoveResponse = {
  cart_id: string
  deleted_product_id: string
  deleted_size: string
  deleted_color: string
  deleted_count: string
}
```

> | http code | content-type       | response         |
> | --------- | ------------------ | ---------------- |
> | `200`     | `application/json` | `RemoveResponse` |
> | `400`     | `text/plain`       | `error message`  |

</details>

---

### List

<details>
<summary><code>GET</code> <code><b>/list</b></code> <code>(List all carts)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

> | http code | content-type       | response             |
> | --------- | ------------------ | -------------------- |
> | `200`     | `application/json` | `{"Carts_List": []}` |
> | `500`     | `text/plain`       | `error message`      |

</details>

<details>
<summary><code>GET</code> <code><b>/list-cart</b></code> <code>(List all products from given cart)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Query Parameters

> | key     | required | data type | description    |
> | ------- | -------- | --------- | -------------- |
> | cart_id | true     | string    | id of the cart |

##### Responses

> | http code | content-type       | response                        |
> | --------- | ------------------ | ------------------------------- |
> | `200`     | `application/json` | `{"Products_in_Cart_List": []}` |
> | `400`     | `text/plain`       | `error message`                 |

</details>
