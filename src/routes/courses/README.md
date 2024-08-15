# /courses routes

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
> | timeSlot    | true     | string    | timeSlot of the course (Morning, Afternoon or Night)          |
> | weekday     | true     | string    | e.g. Monday...                                                |
> | courseType  | true     | string    | e.g. Group or Private                                         |
> | duration    | true     | int       | e.g. 60 (minutes)                                             |
> | weeks       | true     | int       | duration of the course in weeks                               |
> | max         | true     | int       | max people number of the course                               |
> | content     | true     | string    | content of course                                             |
> | startDay    | true     | string    | start date of the course, in format YYYY-MM-DD                |
> | fee         | true     | int       | course fee                                                    |
> | timeIdx     | true     | int[]     | time index of the course (used for table reservations)        |
> | usedTableId | true     | int[]     | table number used in the course (used for table reservations) |
> | coachEmail  | true     | string[]  | email of the coaches                                          |

##### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Success", "course_id": "ObjectId of the new course"}` |
> | `401`     | `text/plain`       | `"No token provided"` or `TokenExpiredError` or ...                 |
> | `403`     | `text/plain`       | `Invalid token`                                                     |
> | `403`     | `application/json` | `{"message": "Not authorized to create courses"}`                   |
> | `500`     | `application/json` | `{"message": "Error message"}`                                      |

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

> | key                                                                                | required | data type | description |
> | ---------------------------------------------------------------------------------- | -------- | --------- | ----------- |
> | ...something you want to update. See body of create course for available fields    | true     |           |             |
> | `weeks`, `timeIdx`, `usedTableId` and `startDay` must be provided as whole or none | false    |           |             |

##### Response

> | http code | content-type       | response                                         |
> | --------- | ------------------ | ------------------------------------------------ |
> | `200`     | `application/json` | `{"message": "Update successfully."}`            |
> | `400`     | `application/json` | `{ message: "Error message" }`                   |
> | `403`     | `text/plain`       | `Invalid token`                                  |
> | `403`     | `application/json` | `{"message": "Not authorized to update course"}` |
> | `500`     | `application/json` | `{"message": "Error message"}`                   |

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

> | http code | content-type       | response                                         |
> | --------- | ------------------ | ------------------------------------------------ |
> | `200`     | `application/json` | `{"message": "Delete course successfully"}`      |
> | `400`     | `application/json` | `{"message": "error message"}`                   |
> | `403`     | `text/plain`       | `Invalid token`                                  |
> | `403`     | `application/json` | `{"message": "Not authorized to delete course"}` |

</details>

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(List all course)</code></summary>

##### Responses

> | http code | content-type       | response                                                                                                                    |
> | --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | `all course information in an array, whose item is a course and the same as create course, except that id is also included` |

</details>
<details>
<summary><code>GET</code> <code><b>/{course_id}</b></code> <code>(Get certain course's information)</code></summary>

##### Path Parameters

> | key       | required | data type | description      |
> | --------- | -------- | --------- | ---------------- |
> | course_id | true     | string    | id of the course |

##### Response

> | http code | content-type       | response                                                                 |
> | --------- | ------------------ | ------------------------------------------------------------------------ |
> | `200`     | `application/json` | `course info, as same as create course, except that id is also included` |
> | `400` ... | `application/json` | `{ message: "error message" }`                                           |

</details>
