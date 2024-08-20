# /users/courses routes

<details>
<summary><code>POST</code> <code><b>/add</b></code> <code>(subUser add a course)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key       | required | data type | description         |
> | --------- | -------- | --------- | ------------------- |
> | course_id | true     | string    | id of the course    |
> | user_name | true     | string    | name of the subUser |

##### Responses

> | http code | content-type       | response                                                                           |
> | --------- | ------------------ | ---------------------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"mail": "mail@mail.com", "name": "name", "course_id": id, "leave_count": count}` |
> | `400`     | `text/plain`       | `error message`                                                                    |

</details>

<details>
<summary><code>PATCH</code> <code><b>/leave</b></code> <code>(course leave)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json)

> | key       | required | data type | description         |
> | --------- | -------- | --------- | ------------------- |
> | course_id | true     | string    | id of the course    |
> | user_name | true     | string    | name of the subUser |

##### Response

> | http code | content-type       | response                                                   |
> | --------- | ------------------ | ---------------------------------------------------------- |
> | `200`     | `application/json` | `{"message": "Leave successfully.", "leaveCount": number}` |
> | `500`     | `application/json` | `{"message": "Error message"}`                             |

</details>
<details>
<summary><code>DELETE</code> <code><b>/remove</b></code> <code>(subUser remove a course)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Body (application/json or application/x-www-form-urlencoded)

> | key       | required | data type | description         |
> | --------- | -------- | --------- | ------------------- |
> | course_id | true     | string    | id of the course    |
> | user_name | true     | string    | name of the subUser |

##### Responses

> | http code | content-type       | response                                                                           |
> | --------- | ------------------ | ---------------------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"mail": "mail@mail.com", "name": "name", "course_id": id, "leave_count": count}` |
> | `400`     | `text/plain`       | `bad request`                                                                      |

</details>

<details>
<summary><code>GET</code> <code><b>/list</b></code> <code>(list all courses for the user)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

> | http code | content-type       | response             |
> | --------- | ------------------ | -------------------- |
> | `200`     | `application/json` | `...`                |
> | `400`     | `text/plain`       | `No attended course` |

</details>

<details>
<summary><code>GET</code> <code><b>/list/{username}</b></code> <code>(list all courses for the subuser)</code></summary>

##### Headers

> | key           | value          | description   |
> | ------------- | -------------- | ------------- |
> | Authorization | `Bearer token` | The jwt token |

##### Responses

```typescript
type Res = {
  courseId: string
  leaveCout: string
  timeSlot: string
  weekDay: string
  courseType: string
  duration: number
  title: string
  weeks: number
  content: string
  startDay: string
  timeIdx: number[]
  fee: number
}
```

> | http code | content-type       | response             |
> | --------- | ------------------ | -------------------- |
> | `200`     | `application/json` | `{Res}`              |
> | `400`     | `text/plain`       | `No attended course` |

</details>
