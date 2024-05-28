# /shop routes

### procuct

<details>
<summary><code>POST</code> <code><b>/product/create</b></code> <code>(Create a product)</code></summary>

<br />only for admin

##### Body (application/json)

> | key    | required | data type | description                 |
> | ------ | -------- | --------- | --------------------------- |
> | name   | true     | string    | name of the product         |
> | brand  | true     | string    | brand of the product        |
> | price  | true     | int       | price of the product        |
> | desc   | true     | string    | description of the product  |
> | imgurl | true     | string[]  | images of the product       |
> | size   | false    | string    | size of the product         |
> | color  | false    | string    | color of the product        |
> | sold   | true     | int       | Number of products sold     |
> | count  | true     | int       | Number of products in stock |

##### Responses

> | http code           | content-type       | response                                                              |
> | ------------------- | ------------------ | --------------------------------------------------------------------- |
> | `200`               | `application/json` | `{"message": "Success", "product_id": "ObjectId of the new product"}` |
> | `401`, `400`, `500` | `text/plain`       | N/A                                                                   |

</details>

<details>
<summary><code>POST</code> <code><b>/product/addInfo</b></code> <code>(Add information of a specific product)</code></summary>

<br />only for admin

##### Body (application/json)

> | key        | required | data type | description                 |
> | ---------- | -------- | --------- | --------------------------- |
> | product_id | true     | string    | id of the product           |
> | size       | false    | string    | size of the product         |
> | color      | false    | string    | color of the product        |
> | sold       | true     | int       | Number of products sold     |
> | count      | true     | int       | Number of products in stock |

##### Responses

> | http code           | content-type       | response                                                                               |
> | ------------------- | ------------------ | -------------------------------------------------------------------------------------- |
> | `200`               | `application/json` | `{"message": "Success", "productStore_id": "ObjectId of the new product information"}` |
> | `401`, `400`, `500` | `text/plain`       | N/A                                                                                    |

</details>

---

<details>
<summary><code>DELETE</code> <code><b>/product/delete</b></code> <code>(Delete a product by given id)</code></summary>

<br />only for admin

##### Query Parameters

> | key        | required | data type | description       |
> | ---------- | -------- | --------- | ----------------- |
> | product_id | true     | string    | id of the product |

##### Responses

> | http code    | content-type       | response                                     |
> | ------------ | ------------------ | -------------------------------------------- |
> | `200`        | `application/json` | `{"message": "Delete product successfully"}` |
> | `400`, `500` | `text/plain`       | N/A                                          |

</details>

<details>
<summary><code>DELETE</code> <code><b>/product/delete-info</b></code> <code>(Delete a product by given id)</code></summary>

<br />only for admin

##### Body (application/json)

> | key        | required | data type | description            |
> | ---------- | -------- | --------- | ---------------------- |
> | product_id | true     | string    | id of the product      |
> | id         | true     | string    | id of the productStore |

##### Responses

> | http code    | content-type       | response                                                   |
> | ------------ | ------------------ | ---------------------------------------------------------- |
> | `200`        | `application/json` | `{"message": "Delete a product information successfully"}` |
> | `400`, `500` | `text/plain`       | N/A                                                        |

</details>

---

<details>
<summary><code>GET</code> <code><b>/product/getAll</b></code> <code>(Retrieve all products.)</code></summary>

##### Response

```typescript
type product = {
  id: string
  name: string
  brand: string
  price: int
  desc: string
  imgurl: string[]
}
```

> | http code | content-type       | response                                           |
> | --------- | ------------------ | -------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Success", "productList": product[]}` |
> | `500`     | `application/json` | `{"message": "Error retrieving product"}`          |

</details>

<details>
<summary><code>GET</code> <code><b>/product/getAllInfo</b></code> <code>(Retrieve a product's all information by its unique identifier.)</code></summary>

##### Query Parameters

> | key        | required | data type | description       |
> | ---------- | -------- | --------- | ----------------- |
> | product_id | true     | string    | id of the product |

##### Response

```typescript
type productInfo = {
  product_id: string
  size: string
  color: string
  count: int
  id: string
  sold: int
}
```

> | http code | content-type       | response                                                   |
> | --------- | ------------------ | ---------------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Success", "productInfoList": productInfo[]}` |
> | `500`     | `application/json` | `{"message": "Error retrieving product"}`                  |

</details>

<details>
<summary><code>GET</code> <code><b>/product/getInfo</b></code> <code>(Retrieve a product's specific information by its unique identifier.)</code></summary>

##### Body (application/json)

> | key        | required | data type | description            |
> | ---------- | -------- | --------- | ---------------------- |
> | product_id | true     | string    | id of the product      |
> | id         | true     | string    | id of the productStore |

##### Response

```typescript
type productInfo = {
  product_id: string
  size: string
  color: string
  count: int
  id: string
  sold: int
}
```

> | http code | content-type       | response                                             |
> | --------- | ------------------ | ---------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Success", "productInfo": productInfo}` |
> | `500`     | `application/json` | `{"message": "Error retrieving product"}`            |

</details>

---

<details>
<summary><code>PATCH</code> <code><b>/product/update</b></code> <code>(update product)</code></summary>

<br />only for admin

##### Query Parameters

> | key        | required | data type | description       |
> | ---------- | -------- | --------- | ----------------- |
> | product_id | true     | string    | id of the product |

##### Body (application/json)

> | key                             | required | data type | description |
> | ------------------------------- | -------- | --------- | ----------- |
> | ...something you want to update | true     |           |             |

##### Response

> | http code | content-type       | response                              |
> | --------- | ------------------ | ------------------------------------- |
> | `200`     | `application/json` | `{"message": "Update successfully."}` |
> | `500`     | `application/json` | `{"message": "Error message"}`        |

</details>

<details>
<summary><code>PATCH</code> <code><b>/product/updateInfo</b></code> <code>(update information of a specific product)</code></summary>

<br />only for admin

##### Body (application/json)

> | key                             | required | data type | description            |
> | ------------------------------- | -------- | --------- | ---------------------- |
> | product_id                      | true     | string    | id of the product      |
> | id                              | true     | string    | id of the productStore |
> | ...something you want to update | true     |           |                        |

##### Response

> | http code | content-type       | response                              |
> | --------- | ------------------ | ------------------------------------- |
> | `200`     | `application/json` | `{"message": "Update successfully."}` |
> | `500`     | `application/json` | `{"message": "Error message"}`        |

</details>
