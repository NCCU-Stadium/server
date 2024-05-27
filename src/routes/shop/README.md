# /shop routes

### procuct

<details>
<summary><code>POST</code> <code><b>/product/create</b></code> <code>(Create a product)</code></summary>

##### Body (application/json)

> | key    | required | data type | description                 |
> | ------ | -------- | --------- | --------------------------- |
> | name   | true     | string    | name of the product         |
> | brand  | true     | string    | brand of the product        |
> | price  | true     | int       | price of the product        |
> | desc   | true     | string    | description of the product  |
> | imgurl | true     | string[]  | images of the product       |
> | size   | false    | string[]  | size of the product         |
> | color  | false    | string[]  | color of the product        |
> | sold   | true     | int       | Number of products sold     |
> | count  | true     | int       | Number of products in stock |

##### Responses

> | http code           | content-type       | response                                                         |
> | ------------------- | ------------------ | ---------------------------------------------------------------- |
> | `200`               | `application/json` | `{"message": "Success", "storyId": "ObjectId of the new story"}` |
> | `401`, `400`, `500` | `text/plain`       | N/A                                                              |

</details>
<details>

<summary><code>DELETE</code> <code><b>/product/delete</b></code> <code>(Delete a product by given id)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json)

> | key      | required | data type | description             |
> | -------- | -------- | --------- | ----------------------- |
> | storyId  | true     | string    | ObjectId of the story   |
> | deleteId | true     | string    | ObjectId of the deleter |

##### Responses

> | http code    | content-type       | response                 |
> | ------------ | ------------------ | ------------------------ |
> | `200`        | `application/json` | `{"message": "Success"}` |
> | `400`, `500` | `text/plain`       | N/A                      |

</details>

---
