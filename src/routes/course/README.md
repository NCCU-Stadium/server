# /course routes

<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(Create a course)</code></summary>

<br />only for admin

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json)

> | key         | required | data type | description                                                   |
> | ----------- | -------- | --------- | ------------------------------------------------------------- |
> | title       | true     | string    | title of the course                                           |
> | timeSlot    | true     | int       | timeSlot of the course                                        |
> | weekday     | true     | string    | e.g. Monday...                                                |
> | coursetype  | true     | string    | e.g. group or private                                         |
> | duration    | true     | int       | e.g. 1.5 hr                                                   |
> | weeks       | true     | int       | duration of the course in weeks                               |
> | max         | true     | int       | max people number of the course                               |
> | content     | true     | string    | content of course                                             |
> | startday    | true     | string    | start date of the course                                      |
> | fee         | true     | int       | course fee                                                    |
> | timeidx     | true     | int[]     | time index of the course (used for table reservations)        |
> | usedtableid | true     | int[]     | table number used in the course (used for table reservations) |
> | coach       | true     | string[]  | email of the coach                                            |

##### Responses

> | http code           | content-type       | response                                                            |
> | ------------------- | ------------------ | ------------------------------------------------------------------- |
> | `200`               | `application/json` | `{"message": "Success", "course_id": "ObjectId of the new course"}` |
> | `401`, `400`, `500` | `text/plain`       | N/A                                                                 |

</details>

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(List all course)</code></summary>

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
<summary><code>GET</code> <code><b>/{course_id}</b></code> <code>(Get certain course's information)</code></summary>

##### Path Parameters

> | key       | required | data type | description      |
> | --------- | -------- | --------- | ---------------- |
> | course_id | true     | string    | id of the course |

##### Response

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Success", "courseist": course[]}` |
> | `500`     | `application/json` | `{"message": "Error retrieving product"}`       |

</details>

<details>
<summary><code>PATCH</code> <code><b>/{course_id}</b></code> <code>(Modify a course)</code></summary>

<br />only for admin

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Path Parameters

> | key       | required | data type | description      |
> | --------- | -------- | --------- | ---------------- |
> | course_id | true     | string    | id of the course |

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
<summary><code>DELETE</code> <code><b>/{course_id}</b></code> <code>(Delete a course by given id)</code></summary>

<br />only for admin

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Path Parameters

> | key       | required | data type | description      |
> | --------- | -------- | --------- | ---------------- |
> | course_id | true     | string    | id of the course |

##### Responses

> | http code    | content-type       | response                                    |
> | ------------ | ------------------ | ------------------------------------------- |
> | `200`        | `application/json` | `{"message": "Delete course successfully"}` |
> | `400`, `500` | `text/plain`       | N/A                                         |

</details>
