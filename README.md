# rs-clone-server

API for the [RS Clone](https://github.com/altsep/rs-clone) app done as part of the [eponymous task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md).

## Setup

- Node.js `16.9` or higher must be installed
- Clone this repo: `$ git clone https://github.com/altsep/rs-clone-server.git`.
- Install pnpm: `$ npm -g i pnpm`
- Navigate to the folder: `$ cd rs-clone-server`
- Install dependencies: `$ pnpm i`
- Start server: `$ pnpm dev` or run build and start the bundle `$ pnpm build; pnpm start`
- Now you should be able to send requests to the address: `http://127.0.0.1:3000` or the port specified as the env variable

## Usage

- **Users**

  - [Get users](https://github.com/altsep/rs-clone-server#get-users)
  - [Get user](https://github.com/altsep/rs-clone-server#get-user)
  - [Create user](https://github.com/altsep/rs-clone-server#create-user)
  - [Delete user](https://github.com/altsep/rs-clone-server#delete-user)
  - [Update user](https://github.com/altsep/rs-clone-server#update-user)
  - [Authorize user](https://github.com/altsep/rs-clone-server#authorize-user)

- **Posts**
  - [Get posts](https://github.com/altsep/rs-clone-server#get-posts)
  - [Get posts](https://github.com/altsep/rs-clone-server#get-post)
  - [Create posts](https://github.com/altsep/rs-clone-server#create-post)
  - [Delete posts](https://github.com/altsep/rs-clone-server#delete-post)
  - [Update posts](https://github.com/altsep/rs-clone-server#update-post)

## **Register**

Registers a new user by writing their information and access tokens to the database.

<details>

- **URL**

  /api/registration

- **Method:**

  `POST`

- **Headers:**

  none

- **URL params**

  None

- **Query params**

  None

- **Data params**

  ```ts
  {
    email: string;
    password: string;
    name: string;
    country: string;
    birthDate: string;
  }
  ```

- **Success response:**

  - **Code:** 201 Created <br />
    **Content:**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGRhYWExN2IyZTIzZmRhNTM3NDEwMyIsImVtYWlsIjoid2XRg2VlZWVlZWVlZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JGtqV1BtZUlYZ3paYVNzSXRxRXVHQWU1ampFbkx6UlllNi4yUUkyYmNqV3F5S051SVUxVDEyIiwiaGlkZGVuIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wNFQwMDo0NToyMS4xOThaIiwicG9zdHNJZHMiOltdLCJmcmllbmRzSWRzIjpbXSwiYWN0aXZhdGlvbkxpbmsiOiIyMDI0MmFlZC0wNDE0LTRjYmItYTM1Ni1mNjBmNzdlY2YwY2UiLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY3NTQ3MTUyMSwiZXhwIjoxNjc1NDczMzIxfQ.xUOVbpzGTV13nIqyDSf07RuudSineUGY3W-MWns64u4",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGRhYWExN2IyZTIzZmRhNTM3NDEwMyIsImVtYWlsIjoid2XRg2VlZWVlZWVlZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JGtqV1BtZUlYZ3paYVNzSXRxRXVHQWU1ampFbkx6UlllNi4yUUkyYmNqV3F5S051SVUxVDEyIiwiaGlkZGVuIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wNFQwMDo0NToyMS4xOThaIiwicG9zdHNJZHMiOltdLCJmcmllbmRzSWRzIjpbXSwiYWN0aXZhdGlvbkxpbmsiOiIyMDI0MmFlZC0wNDE0LTRjYmItYTM1Ni1mNjBmNzdlY2YwY2UiLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY3NTQ3MTUyMSwiZXhwIjoxNjc4MDYzNTIxfQ.GJYvL8y9PErLRHcn9TaO-y6vOgwMj2_prExPs7ev6WE",
      "user": {
        "id": 1,
        "email": "qwe@example.com",
        "password": "$2b$05$kjWPmeIXgzZaSsItqEuGAe5jjEnLzRYe6.2QI2bcjWqyKNuIU1T12",
        "hidden": false,
        "createdAt": "2023-02-04T00:45:21.198Z",
        "postsIds": [],
        "friendsIds": [],
        "activationLink": "20242aed-0414-4cbb-a356-f60f77ecf0ce",
        "isActivated": false
      }
    }
    ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "instance": "/api/registration",
      "errors": [],
    }
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "User with email qwe@example.com exists",
      "status": 500,
      "instance": "/api/registration",
      "errors": [],
    }
    ```

- **Notes:**

  None

</details>

# **Login**

Authorize a user by comparing the sent password with the one stored in the DB and responds with full user data on success.

<details>

- **URL**

  /api/login

- **Method:**

  `POST`

- **Headers:**

  none

- **URL params**

  None

- **Query params**

  None

- **Data params**

  ```ts
  {
    email: string;
    password: string;
  }
  ```

- **Success response:**

  - **Code:** 202 Accepted <br />
    **Content:**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXF3ZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JHU5NXZVRTk0Nk1uSVhvMmRZTnVqdHVDNFB4WWJrcVlxUk9sWUE0RUhRZWs5dzlES0lCWmZhIiwibmFtZSI6ImFzZHp4YyIsImNvdW50cnkiOiJhc2QiLCJiaXJ0aERhdGUiOiIiLCJoaWRkZW4iOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDA0OjI0OjA5LjI1MFoiLCJwb3N0c0lkcyI6W10sImZyaWVuZHNJZHMiOltdLCJhY3RpdmF0aW9uTGluayI6IjEzNjk3ZDA3LWI5MjYtNDUwOC04ZGQzLTNhY2E1YWUwY2UyNyIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NzU4MzIxMDEsImV4cCI6MTY3NTgzMzkwMX0.WT-K2imrRN5sT97eYQwPRj1-7qpHoEtW8dndBc6xJ0s",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXF3ZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JHU5NXZVRTk0Nk1uSVhvMmRZTnVqdHVDNFB4WWJrcVlxUk9sWUE0RUhRZWs5dzlES0lCWmZhIiwibmFtZSI6ImFzZHp4YyIsImNvdW50cnkiOiJhc2QiLCJiaXJ0aERhdGUiOiIiLCJoaWRkZW4iOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDA0OjI0OjA5LjI1MFoiLCJwb3N0c0lkcyI6W10sImZyaWVuZHNJZHMiOltdLCJhY3RpdmF0aW9uTGluayI6IjEzNjk3ZDA3LWI5MjYtNDUwOC04ZGQzLTNhY2E1YWUwY2UyNyIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NzU4MzIxMDEsImV4cCI6MTY3ODQyNDEwMX0.0oMMmNIedEkFkLPkYXRShho27a2ZPBeg98iZFOp8rIY",
      "user": {
          "email": "qweqwe@example.com",
          "password": "$2b$05$u95vUE946MnIXo2dYNujtuC4PxYbkqYqROlYA4EHQek9w9DKIBZfa",
          "name": "asdzxc",
          "country": "asd",
          "birthDate": "",
          "hidden": false,
          "createdAt": "2023-02-08T04:24:09.250Z",
          "postsIds": [],
          "friendsIds": [],
          "activationLink": "13697d07-b926-4508-8dd3-3aca5ae0ce27",
          "isActivated": true
      }
    }
    ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "instance": "/api/login",
      "errors": [
          {
              "msg": "Invalid value",
              "param": "email",
              "location": "body"
          }
        ],
    }
    ```

  - **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Unauthorized",
      "status": 401,
      "instance": "/api/login",
      "errors": [],
    }
    ```

- **Notes:**

  None

</details>

## **Get users**

Returns a collection of all users.

<details>

- **URL**

  /api/users

- **Method:**

  `GET`

- **Headers:**

  None

- **URL params**

  None

- **Query params**

  None

- **Data params**

  None

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "email": "test@example.com",
        "name": "Clark",
        "password": "",
        "alias": "santa661",
        "hidden": false,
        "country": "Antarctica",
        "birthDate": "1955-11-11T21:00:00.000Z",
        "createdAt": "2023-02-02T03:04:59.717Z",
        "postsIds": [1]
      }
    ]
    ```

    **Headers:**

    None

- **Error response:**

  None

- **Notes:**

  None

</details>

## **Get user**

Returns information about the specified user.

<details>

- **URL**

  /api/users/:id

- **Method:**

  `GET`

- **Headers:**

  None

- **URL params**

  **Required:**

  `id=[integer]`

- **Query params**

  None

- **Data params**

  None

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 1,
      "email": "test@example.com",
      "name": "Clark",
      "password": "",
      "alias": "santa661",
      "hidden": false,
      "country": "Antarctica",
      "birthDate": "1955-11-11T21:00:00.000Z",
      "createdAt": "2023-02-02T03:04:59.717Z"
    }
    ```

- **Error response:**

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Not Found",
      "status": 404,
      "instance": "/api/api/users/15",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Add user**

Creates a new user.

<details>

- **URL**

  /api/users

- **Method:**

  `POST`

- **Headers:**

  none

- **URL params**

  None

- **Query params**

  None

- **Data params**

  ```ts
  {
    name: string;
    email: string;
    password: string;
    country: string;
    birthDate: string;
  }
  ```

- **Success response:**

  - **Code:** 201 Created <br />
    **Content:**
    ```json
    {
      "id": 4,
      "hidden": false,
      "name": "Q",
      "email": "test@example.com",
      "password": "213",
      "birthDate": "1955-11-11T21:00:00.000Z",
      "createdAt": "2023-02-02T03:04:59.717Z",
      "country": "Iceland"
    }
    ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "instance": "/api/api/users",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Hide user**

Sets the `hidden` field of the specified user to `true`.

<details>

- **URL**

  /user/:id

- **Method:**

  `DELETE`

- **Headers:**

  None

- **URL params**

  **Required:**

  `id=[integer]`

- **Query params**

  None

- **Data params**

  ```ts
  {
    password: string;
  }
  ```

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 3,
      "name": "h1dd3nUs3r99",
      "email": "test@example.com",
      "password": 1,
      "alias": "",
      "hidden": true,
      "country": "",
      "birthDate": "",
      "createdAt": ""
    }
    ```

- **Error response:**

  - **Code:** 400 Bad request <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "instance": "/api/api/users/1",
      "errors": []
    }
    ```

  - **Code:** 401 Unauthorized <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Incorrect password",
      "status": 401,
      "instance": "/api/api/users/1",
      "errors": []
    }
    ```

  - **Code:** 404 Not found <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Not Found",
      "status": 404,
      "instance": "/api/api/users/51",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Update user**

Updates user properties.

<details>

- **URL**

  /user/:id

- **Method:**

  `PATCH`

- **Headers:**

  none

- **URL params**

  **Required:**

  `id=[integer]`

- **Query params**

  None

- **Data params**

  ```ts
    {
      name?: string;
      email?: string;
      password?: string;
      country?: string;
      birthDate?: string;
      alias?: string;
      avatarURL?: string;
      postsIds?: number[];
      friendsIds?: number[];
    }
  ```

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 2,
      "name": "Asdfg",
      "email": "test@example.com",
      "password": "",
      "alias": "",
      "hidden": false,
      "country": "Greenland",
      "birthDate": "1965-11-11T21:00:00.000Z",
      "createdAt": "2023-02-02T03:03:59.717Z"
    }
    ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "instance": "/api/api/users/1",
      "errors": []
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Not Found",
      "status": 404,
      "instance": "/api/api/users/25",
      "errors": []
    }
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "User \"Clark\" exists",
      "status": 500,
      "instance": "/api/api/users/2",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Authorize user**

Checks user credentials.

<details>

- **URL**

  /api/users-auth

- **Method:**

  `GET`

- **Headers:**

  none

- **URL params**

  None

- **Query params**

  None

- **Data params**

  ```ts
  {
    name: string;
    password: string;
  }
  ```

- **Success response:**

  - **Code:** 202 Accepted <br />
    **Content:**
    ```json
    {
      "success": true,
      "message": "Accepted",
      "instance": "/api/users-auth"
    }
    ```

- **Error response:**

  - **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Incorrect password",
      "status": 401,
      "instance": "/api/users-auth",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Get posts**

Returns a json collection of all posts.

<details>

- **URL**

  /api/posts

- **Method:**

  `GET`

- **Headers:**

  None

- **URL params**

  None

- **Query params**

  None

- **Data params**

  None

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Cras adipiscing enim eu turpis egestas. Dui nunc mattis enim ut tellus. Congue eu consequat ac felis donec et odio pellentesque diam. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Magna eget est lorem ipsum dolor sit amet consectetur. Quis commodo odio aenean sed adipiscing diam. A erat nam at lectus urna duis convallis. A arcu cursus vitae congue mauris. Nunc sed velit dignissim sodales ut eu sem integer. Ornare massa eget egestas purus viverra accumsan. Dictum fusce ut placerat orci nulla pellentesque dignissim. In arcu cursus euismod quis viverra. Ut venenatis tellus in metus vulputate. Senectus et netus et malesuada fames ac.",
        "userId": 1,
        "createdAt": "2023-02-01T04:42:45.449Z",
        "likes": 0
      }
    ]
    ```

    **Headers:**

    None

- **Error response:**

  None

- **Notes:**

  None

</details>

## **Get post**

Returns json data for the specified post.

<details>

- **URL**

  /api/posts/:id

- **Method:**

  `GET`

- **Headers:**

  None

- **URL params**

  **Required:**

  `id=[integer]`

- **Query params**

  None

- **Data params**

  None

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 1,
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Cras adipiscing enim eu turpis egestas. Dui nunc mattis enim ut tellus. Congue eu consequat ac felis donec et odio pellentesque diam. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Magna eget est lorem ipsum dolor sit amet consectetur. Quis commodo odio aenean sed adipiscing diam. A erat nam at lectus urna duis convallis. A arcu cursus vitae congue mauris. Nunc sed velit dignissim sodales ut eu sem integer. Ornare massa eget egestas purus viverra accumsan. Dictum fusce ut placerat orci nulla pellentesque dignissim. In arcu cursus euismod quis viverra. Ut venenatis tellus in metus vulputate. Senectus et netus et malesuada fames ac.",
      "userId": 1,
      "createdAt": "2023-02-01T04:42:45.449Z",
      "likes": 0
    }
    ```

- **Error response:**

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Not Found",
      "status": 404,
      "api/instance": "/api/posts/15",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Add post**

Creates a new post.

<details>

- **URL**

  /api/posts

- **Method:**

  `POST`

- **Headers:**

  none

- **URL params**

  None

- **Query params**

  None

- **Data params**

  ```ts
  {
    userId: number;
    description: string;
  }
  ```

- **Success response:**

  - **Code:** 201 Created <br />
    **Content:**
    ```json
    {
      "id": 3,
      "likes": 0,
      "userId": 1,
      "description": "qwe",
      "createdAt": "2023-02-02T03:04:59.717Z"
    }
    ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "api/instance": "/api/posts",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Remove post**

Removes the specified post from the database

<details>

- **URL**

  /api/posts/:id

- **Method:**

  `DELETE`

- **Headers:**

  None

- **URL params**

  **Required:**

  `id=[integer]`

- **Query params**

  None

- **Data params**

  None

- **Success response:**

  - **Code:** 202 Accepted <br />
    **Content:**
    ```json
    {
      "success": true,
      "message": "Accepted",
      "api/instance": "/api/posts/1"
    }
    ```

- **Error response:**

  - **Code:** 404 Not found <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Not Found",
      "status": 404,
      "api/instance": "/api/posts/51",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>

## **Update post**

Updates post properties.

<details>

- **URL**

  /post/:id

- **Method:**

  `PATCH`

- **Headers:**

  none

- **URL params**

  **Required:**

  `id=[integer]`

- **Query params**

  None

- **Data params**

  ```ts
    {
      description?: string;
      likes?: number;
      commentsIds?: number[];
      likedUserIds?: number[];
    }
  ```

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 5,
      "userId": 1,
      "description": "asd",
      "likes": 2,
      "likedUserIds": [1],
      "createdAt": "2023-02-01T04:42:45.449Z",
    }
    ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "api/instance": "/api/posts/1",
      "errors": []
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Not Found",
      "status": 404,
      "instance": "/api/api/users/25",
      "errors": []
    }
    ```

- **Notes:**

  None

</details>
