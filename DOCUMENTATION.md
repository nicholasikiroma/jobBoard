# Endpoint Documentation For Job Posting API

## Resources

The resources provided by this API are listed as follows:

### Users

This resource handles operations carried out on a User entity.

- **GET** `/api/users`: Fetch all users
  - *Description*: Returns a list of all users registered on the platform.
  - *Request*: No request body required.
  - *Response*:
    - Status Code: 200 (OK)
    - Response Body: Array of User objects
    - Example Response:

      ```json
      [
        {
          "id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
          "email": "john.doe@example.com",
          "first_name": "John",
          "last_name": "Doe",
          "role": "freelancer",
          "company": "ABC Corp",
          "skill": "Web Development"
        },
        {
          "id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
          "email": "jane.smith@example.com",
          "first_name": "Jane",
          "last_name": "Smith",
          "role": "freelancer",
          "company": null,
          "skill": "Graphic Design"
        }
      ]
      ```

- **POST** `/api/users`: Create a new user
  - *Description*: Create a new user on the platform.
  - *Request*: User object with required fields (email, first_name, last_name).
  - *Response*:
    - Status Code: 201 (Created)
    - Response Body: User object of the created user
    - Example Response:

      ```json
      {
        "id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
        "email": "jane.smith@example.com",
        "first_name": "Jane",
        "last_name": "Smith",
        "role": "freelancer",
        "company": null,
        "skill": "Graphic Design"
      }
      ```

- **PUT** `/api/users/:id`: Update a user
  - *Description*: Update an existing user's information.
  - *Request*: User object with fields to update.
  - *Response*:
    - Status Code: 200 (OK)
    - Response Body: User object of the updated user

- **DELETE** `/api/users/:id`: Delete a user
  - *Description*: Delete a user from the platform.
  - *Request*: No request body required.
  - *Response*:
    - Status Code: 204 (No Content)

### Job Postings

This resource handles operations carried out on a 'Job Postings' entity.

- **GET** `/api/job-postings`: Fetch all job postings
  - *Description*: Returns a list of all job postings.
  - *Request*: No request body required.
  - *Response*:
    - Status Code: 200 (OK)
    - Response Body: Array of Job Posting objects
    - Example Response:

      ```json
      [
        {
          "id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
          "title": "Web Developer",
          "description": "Seeking a skilled web developer for a project.",
          "budget": 5000,
          "employer_id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
          "freelancer_id": null,
          "status": "open",
          "created_at": "2023-09-01T10:00:00Z",
          "updated_at": "2023-09-01T10:00:00Z"
        },
        {
          "id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
          "title": "Graphic Designer",
          "description": "Hiring a graphic designer for a logo design project.",
          "budget": 1000,
          "employer_id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
          "freelancer_id": null,
          "status": "open",
          "created_at": "2023-09-02T15:00:00Z",
          "updated_at": "2023-09-02T15:00:00Z"
        }
      ]
      ```

- **GET** `/api/job-postings/:id/applications`: Fetch all applications associated with a specific job posting
  - *Description*: Returns a list of all applications associated with a specific job posting.
  - *Request*: No request body required.
  - *Response*:
    - Status Code: 200 (OK)
    - Response Body: Array of Application objects
    - Example Response:

      ```json
      [
        {
          "id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
          "job_posting_id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
          "freelancer_id": "f7a5a846-9f3c-4eb3-a1c0-63d4578b840c",
          "created_at": "2023-09-03T12:30:00Z",
          "status": "pending"
        },
        {
          "id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
          "job_posting_id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
          "freelancer_id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
          "created_at": "2023-09-04T14:45:00Z",
          "status": "accepted"
        }
      ]
      ```

- **POST** `/api/job-postings`: Create a new job posting
  - *Description*: Create a new job posting on the platform.
  - *Request*: Job Posting object with required fields (title, description, budget, employer_id).
  - *Response*:
    - Status Code: 201 (Created)
    - Response Body: Job Posting object of the created job posting
    - Example Response:

      ```json
      {
        "id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
        "title": "Web Developer",
        "description": "Seeking a skilled web developer for a project.",
        "budget": 5000,
        "employer_id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
        "freelancer_id": null,
        "status": "open",
        "created_at": "2023-09-01T10:00:00Z",
        "updated_at": "2023-09-01T10:00:00Z"
      }
      ```

- **PUT** `/api/job-postings/:id`: Update an existing job posting
  - *Description*: Update an existing job posting's information.
  - *Request*: Job Posting object with fields to update.
  - *Response*:
    - Status Code: 200 (OK)
    - Response Body: Job Posting object of the updated job posting

- **DELETE** `/api/job-postings/:id`: Delete an existing job posting
  - *Description*: Delete a job posting from the platform.
  - *Request*: No request body required.
  - *Response*:
    - Status Code: 204 (No Content)

### Applications

This resource handles operations carried out on an 'Applications' entity.

- **GET** `/api/applications/:id`: Fetch details about an application
  - *Description*: Returns details about a specific job application.
  - *Request*: No request body required.
  - *Response*:
    - Status Code: 200 (OK)
    - Response Body: Application object
    - Example Response:

      ```json
      {
        "id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
        "job_posting_id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
        "freelancer_id": "f7a5a846-9f3c-4eb3-a1c0-63d4578b840c",
        "created_at": "2023-09-03T12:30:00Z",
        "status": "pending"
      }
      ```

- **POST** `/api/applications`: Create a new job application
  - *Description*: Create a new job application.
  - *Request*: Application object with required fields (job_posting_id, freelancer_id).
  - *Response*:
    - Status Code: 201 (Created)
    - Response Body: Application object of the created job application
    - Example Response:

      ```json
      {
        "id": "e98e472f-7e4f-4b0e-a1f6-dfb43a283ca0",
        "job_posting_id": "2c68e3f1-4505-4d35-b126-23ca63b1a860",
        "freelancer_id": "f7a5a846-9f3c-4eb3-a1c0-63d4578b840c",
        "created_at": "2023-09-03T12:30:00Z",
        "status": "pending"
      }
      ```

- **PUT** `/api/applications/:id`: Update a job application
  - *Description*: Update an existing job application's information.
  - *Request*: Application object with fields to update.
  - *Response*:
    - Status Code: 200 (OK)
    - Response Body: Application object of the updated job application

- **DELETE** `/api/applications/:id`: Delete a job application
  - *Description*: Delete a job application from the platform.
  - *Request*: No request body required.
  - *Response*:
    - Status Code: 204 (No Content)
