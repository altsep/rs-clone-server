# rs-clone-server

API for the [RS Clone](https://github.com/altsep/rs-clone) app done as part of the [eponymous task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md).

## Setup

- Install Node.js `16.9` or later
- Clone this repo: `$ git clone https://github.com/altsep/rs-clone-server.git`.
- Install pnpm: `$ npm -g i pnpm`
- Navigate to the folder: `$ cd rs-clone-server`
- Install dependencies: `$ pnpm i`
- Start server: `$ pnpm dev` or run build and start the bundle `$ pnpm build; pnpm start`
- Now you should be able to send requests to the address: `http://127.0.0.1:3000` or the port specified in the corresponding env variable

## Usage

- **[Auth](https://github.com/altsep/rs-clone-server#auth)**

  - [Register](https://github.com/altsep/rs-clone-server#register)
  - [Login](https://github.com/altsep/rs-clone-server#login)
  - [Logout](https://github.com/altsep/rs-clone-server#logout)
  - [Refresh](https://github.com/altsep/rs-clone-server#refresh)

- **[Users](https://github.com/altsep/rs-clone-server#users)**

  - [Get users](https://github.com/altsep/rs-clone-server#get-users)
  - [Get user](https://github.com/altsep/rs-clone-server#get-user)
  - [Update user](https://github.com/altsep/rs-clone-server#update-user)
  - [Change user password](https://github.com/altsep/rs-clone-server#change-password)
  - [Delete user](https://github.com/altsep/rs-clone-server#delete-user)

- **[Posts](https://github.com/altsep/rs-clone-server#posts)**

  - [Get posts](https://github.com/altsep/rs-clone-server#get-posts)
  - [Get post](https://github.com/altsep/rs-clone-server#get-post)
  - [Create posts](https://github.com/altsep/rs-clone-server#create-post)
  - [Delete post](https://github.com/altsep/rs-clone-server#delete-post)
  - [Update post](https://github.com/altsep/rs-clone-server#update-post)

- **[Chats](https://github.com/altsep/rs-clone-server#chats)**

  - [Create chat](https://github.com/altsep/rs-clone-server#create-chat)
  - [Get user chats](https://github.com/altsep/rs-clone-server#get-user-chats)

- **[Users](https://github.com/altsep/rs-clone-server#users)**

  - [Set user avatar](https://github.com/altsep/rs-clone-server#set-user-avatar)
  - [Get user avatar](https://github.com/altsep/rs-clone-server#get-user-avatar)
  - [Set user cover](https://github.com/altsep/rs-clone-server#set-user-cover)
  - [Get user cover](https://github.com/altsep/rs-clone-server#get-user-cover)
  - [Push post image](https://github.com/altsep/rs-clone-server#push-post-image)
  - [Get post images](https://github.com/altsep/rs-clone-server#get-post-images)

- **[Messages](https://github.com/altsep/rs-clone-server#messages)**

  - [Send message](https://github.com/altsep/rs-clone-server#send-message)

## **API**

## **Auth**

## **Register**

Registers a new user by writing their information and access tokens to the database.

<details>

- **URL**

  /api/registration

- **Method:**

  `POST`

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

</details>

## **Login**

Authorize a user by comparing the sent password with the one stored in the DB and responds with full user data on success.

<details>

- **URL**

  /api/login

- **Method:**

  `POST`

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

</details>

## **Logout**

Removes refresh token from the DB if one exists. The token is read from the corresponding cookie.

<details>

- **URL**

  /api/logout

- **Method:**

  `POST`

- **Cookies**

  refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXF3ZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JGJQdXA1dk9Ram5kRFZmMC5nZGNTL3VzQ0Z5a1FwaWw0a3h3QzdRdGIzczZ6Nlh3ekEwVzJTIiwibmFtZSI6ImFzZHp4YyIsImNvdW50cnkiOiJhc2QiLCJiaXJ0aERhdGUiOiIiLCJoaWRkZW4iOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDA1OjQzOjE2LjMyNFoiLCJwb3N0c0lkcyI6W10sImZyaWVuZHNJZHMiOltdLCJhY3RpdmF0aW9uTGluayI6IjJlMDRhOGJiLTM2ODYtNGZkNC1hNTdhLTllMzU3MzVhM2Q4NiIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NzU4MzY3NDQsImV4cCI6MTY3ODQyODc0NH0.Bm7GMucFHV6JY2tI4UylLGyIYVuT9iQRGdHP2uyjduI; Path=/; HttpOnly; Expires=Wed, 06 Sep 2023 06:12:24 GMT;

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "acknowledged": true,
      "deletedCount": 1,
      "instance": "/api/logout"
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
      "instance": "/api/logout",
      "errors": [],
    }
    ```

</details>

## **Refresh**

Updates access tokens.

<details>

- **URL**

  /api/refresh

- **Method:**

  `POST`

- **Cookies**

  refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXF3ZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JGJQdXA1dk9Ram5kRFZmMC5nZGNTL3VzQ0Z5a1FwaWw0a3h3QzdRdGIzczZ6Nlh3ekEwVzJTIiwibmFtZSI6ImFzZHp4YyIsImNvdW50cnkiOiJhc2QiLCJiaXJ0aERhdGUiOiIiLCJoaWRkZW4iOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDA1OjQzOjE2LjMyNFoiLCJwb3N0c0lkcyI6W10sImZyaWVuZHNJZHMiOltdLCJhY3RpdmF0aW9uTGluayI6IjJlMDRhOGJiLTM2ODYtNGZkNC1hNTdhLTllMzU3MzVhM2Q4NiIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NzU4MzY3NDQsImV4cCI6MTY3ODQyODc0NH0.Bm7GMucFHV6JY2tI4UylLGyIYVuT9iQRGdHP2uyjduI; Path=/; HttpOnly; Expires=Wed, 06 Sep 2023 06:12:24 GMT;

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTM0OTdmZjJlNjFhNzcwYmIxNzM4MyIsImVtYWlsIjoicXdlcXdlQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIkMmIkMDUkWUtINkl0UUdPTDdGR1EuYkF4ellRLjVsYVlVRzFHVG1PLlBaMWtUQlJaVXdwN0hKRWJ3M0ciLCJuYW1lIjoiYXNkenhjIiwiY291bnRyeSI6ImFzZCIsImJpcnRoRGF0ZSI6IiIsImhpZGRlbiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDItMDhUMDc6MDQ6MzEuOTExWiIsInBvc3RzSWRzIjpbXSwiZnJpZW5kc0lkcyI6W10sImFjdGl2YXRpb25MaW5rIjoiMjBkYmZiMjEtNjI0NS00ZWY2LWEzODctYzQ0ODZhZGY1ZGVjIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY3NTg0MjA2NCwiZXhwIjoxNjc1ODQzODY0fQ.EGKaUWtV178u3fKThGLll9xgh0d50VFsrgORUddbq9E",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTM0OTdmZjJlNjFhNzcwYmIxNzM4MyIsImVtYWlsIjoicXdlcXdlQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIkMmIkMDUkWUtINkl0UUdPTDdGR1EuYkF4ellRLjVsYVlVRzFHVG1PLlBaMWtUQlJaVXdwN0hKRWJ3M0ciLCJuYW1lIjoiYXNkenhjIiwiY291bnRyeSI6ImFzZCIsImJpcnRoRGF0ZSI6IiIsImhpZGRlbiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDItMDhUMDc6MDQ6MzEuOTExWiIsInBvc3RzSWRzIjpbXSwiZnJpZW5kc0lkcyI6W10sImFjdGl2YXRpb25MaW5rIjoiMjBkYmZiMjEtNjI0NS00ZWY2LWEzODctYzQ0ODZhZGY1ZGVjIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY3NTg0MjA2NCwiZXhwIjoxNjc4NDM0MDY0fQ.jA0sEKuhOtjCOiGH_Qm_yoPighMQ7rKq-sxoiJEdUR8",
      "user": {
          "id": "63e3497ff2e61a770bb17383",
          "email": "qweqwe@example.com",
          "password": "$2b$05$YKH6ItQGOL7FGQ.bAxzYQ.5laYUG1GTmO.PZ1kTBRZUwp7HJEbw3G",
          "name": "asdzxc",
          "country": "asd",
          "birthDate": "",
          "hidden": false,
          "createdAt": "2023-02-08T07:04:31.911Z",
          "postsIds": [],
          "friendsIds": [],
          "activationLink": "20dbfb21-6245-4ef6-a387-c4486adf5dec",
          "isActivated": true
      }
    }
    ```

- **Error response:**

  - **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
      "error": true,
      "message": "Unauthorized",
      "status": 401,
      "instance": "/api/logout",
      "errors": [],
    }
    ```

</details>

## **Users**

## **Get users**

Returns a collection of all users.

<details>

- **URL**

  /api/users

- **Method:**

  `GET`

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

</details>

## **Get user**

Returns information about the specified user.

<details>

- **URL**

  /api/users/:id

- **Method:**

  `GET`

- **URL params**

  **Required:**

  `id=[integer]`

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
      "instance": "/api/users/15",
      "errors": []
    }
    ```

</details>

## **Delete user**

Deletes user from the database.

<details>

- **URL**

  /api/user/:id

- **Method:**

  `DELETE`

- **URL params**

  **Required:**

  `id=[integer]`

- **Data params**

  ```ts
  {
    password: string;
  }
  ```

- **Success response:**

  - **Code:** 200 OK <br />

- **Error response:**

  - **Code:** 400 Bad request <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Bad Request",
      "status": 400,
      "instance": "/api/users/1",
      "errors": []
    }
    ```

  - **Code:** 401 Unauthorized <br />
    **Content:**

    ```json
    {
      "error": true,
      "message": "Unauthorized",
      "status": 401,
      "instance": "/api/users/1",
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
      "instance": "/api/users/51",
      "errors": []
    }
    ```

</details>

## **Update user**

Updates user properties.

<details>

- **URL**

  /api/user/:id

- **Method:**

  `PATCH`

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
      "instance": "/api/users/1",
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
      "instance": "/api/users/25",
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
      "instance": "/api/users/2",
      "errors": []
    }
    ```

</details>

## **Change password**

Allows to change the password by converting it to a hash recognizable by login.

<details>

- **URL**

  /api/user-pwd

- **Method:**

  `PATCH`

- **Data params**

  ```ts
    {
      userId: number;
      password: string;
    }
  ```

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJxd2Vxd2VAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQwNSRUa1B6N2RWQW5xUmhLVnhZZUVKOTd1Z0VjTUYvaFdUOEZlSE5sdDA5ZDdWbkduS2VXVGVQQyIsIm5hbWUiOiJNciBRV0Vxd2UiLCJhbGlhcyI6InF3ZXNoa2EiLCJjb3VudHJ5IjoiSWNlbGFuZCIsImJpcnRoRGF0ZSI6IjIwMTMtMDItMDlUMDM6NDY6MTguMDU3WiIsImhpZGRlbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wOVQwMzo0NjoxOC4wNTdaIiwicG9zdHNJZHMiOlsyMyw1NF0sImZyaWVuZHNJZHMiOlsyLDcsOCw5LDEzXSwicGVuZGluZ0ZyaWVuZHNJZHMiOltdLCJhY3RpdmF0aW9uTGluayI6Ijk1NmJiMTM1LWVkNWEtNDk0Yi04ZDBmLWE4ZGNhYmFkNGJiMyIsImlzQWN0aXZhdGVkIjp0cnVlLCJpc09ubGluZSI6dHJ1ZSwibGFzdFNlZW4iOiIyMDIzLTAyLTE4VDEyOjIwOjA0Ljc1M1oiLCJpYXQiOjE2NzY3Mzg4MzgsImV4cCI6MTY3Njc0MDYzOH0.k-OJfW6RG0VhIoAvYrKyqMn-gY6TwkyAZqmZ4pilK7I",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJxd2Vxd2VAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQwNSRUa1B6N2RWQW5xUmhLVnhZZUVKOTd1Z0VjTUYvaFdUOEZlSE5sdDA5ZDdWbkduS2VXVGVQQyIsIm5hbWUiOiJNciBRV0Vxd2UiLCJhbGlhcyI6InF3ZXNoa2EiLCJjb3VudHJ5IjoiSWNlbGFuZCIsImJpcnRoRGF0ZSI6IjIwMTMtMDItMDlUMDM6NDY6MTguMDU3WiIsImhpZGRlbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wOVQwMzo0NjoxOC4wNTdaIiwicG9zdHNJZHMiOlsyMyw1NF0sImZyaWVuZHNJZHMiOlsyLDcsOCw5LDEzXSwicGVuZGluZ0ZyaWVuZHNJZHMiOltdLCJhY3RpdmF0aW9uTGluayI6Ijk1NmJiMTM1LWVkNWEtNDk0Yi04ZDBmLWE4ZGNhYmFkNGJiMyIsImlzQWN0aXZhdGVkIjp0cnVlLCJpc09ubGluZSI6dHJ1ZSwibGFzdFNlZW4iOiIyMDIzLTAyLTE4VDEyOjIwOjA0Ljc1M1oiLCJpYXQiOjE2NzY3Mzg4MzgsImV4cCI6MTY3OTMzMDgzOH0.F2u4UZb_I9Nphbc-2Ss_fC8t_zn9q0GrkkzUPz8ehRE",
      "user": {
          "id": 1,
          "email": "qweqwe@example.com",
          "password": "$2b$05$TkPz7dVAnqRhKVxYeEJ97ugEcMF/hWT8FeHNlt09d7VnGnKeWTePC",
          "name": "Mr QWEqwe",
          "alias": "qweshka",
          "country": "Iceland",
          "birthDate": "2013-02-09T03:46:18.057Z",
          "hidden": true,
          "createdAt": "2023-02-09T03:46:18.057Z",
          "postsIds": [
              23,
              54
          ],
          "friendsIds": [
              2,
              7,
              8,
              9,
              13
          ],
          "pendingFriendsIds": [],
          "activationLink": "956bb135-ed5a-494b-8d0f-a8dcabad4bb3",
          "isActivated": true,
          "isOnline": true,
          "lastSeen": "2023-02-18T12:20:04.753Z"
      }
    }
    ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/users-pwd",
      "errors": [
          {
              "msg": "Invalid value",
              "param": "userId",
              "location": "body"
          },
          {
              "msg": "Invalid value",
              "param": "password",
              "location": "body"
          },
          {
              "msg": "Invalid value",
              "param": "password",
              "location": "body"
          }
      ]
    }
    ```

  - **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 401,
      "message": "Unauthorized",
      "instance": "/api/users-pwd",
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
      "instance": "/api/users-pwd",
      "errors": []
    }
    ```

</details>

## **Posts**

## **Get posts**

Returns a json collection of all posts.

<details>

- **URL**

  /api/posts

- **Method:**

  `GET`

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
        "likes": 0,
        "likedUserIds": [],
        "commentsIds": []
      }
    ]
    ```

</details>

## **Get post**

Returns json data for the specified post.

<details>

- **URL**

  /api/posts/:id

- **Method:**

  `GET`

- **URL params**

  **Required:**

  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 1,
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Cras adipiscing enim eu turpis egestas. Dui nunc mattis enim ut tellus. Congue eu consequat ac felis donec et odio pellentesque diam. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Magna eget est lorem ipsum dolor sit amet consectetur. Quis commodo odio aenean sed adipiscing diam. A erat nam at lectus urna duis convallis. A arcu cursus vitae congue mauris. Nunc sed velit dignissim sodales ut eu sem integer. Ornare massa eget egestas purus viverra accumsan. Dictum fusce ut placerat orci nulla pellentesque dignissim. In arcu cursus euismod quis viverra. Ut venenatis tellus in metus vulputate. Senectus et netus et malesuada fames ac.",
      "userId": 1,
      "createdAt": "2023-02-01T04:42:45.449Z",
      "likes": 0,
      "likedUserIds": [],
      "commentsIds": []
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

</details>

## **Add post**

Creates a new post.

<details>

- **URL**

  /api/posts

- **Method:**

  `POST`

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
      "userId": 1,
      "description": "qwe",
      "createdAt": "2023-02-02T03:04:59.717Z",
      "likes": 0,
      "likedUserIds": [],
      "commentsIds": []
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
      "errors": [
          {
              "msg": "Invalid value",
              "param": "description",
              "location": "body"
          }
      ]
    }
    ```

- **Notes:**

  None

</details>

## **Delete post**

Removes the specified post from the database

<details>

- **URL**

  /api/posts/:id

- **Method:**

  `DELETE`

- **URL params**

  **Required:**

  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "success": true,
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

</details>

## **Update post**

Updates post properties.

<details>

- **URL**

  /api/post/:id

- **Method:**

  `PATCH`

- **URL params**

  **Required:**

  `id=[integer]`

- **Data params**

  ```ts
    {
      description?: string;
      likes?: number;
      likedUserIds?: number[];
      commentsIds?: number[];
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
      "createdAt": "2023-02-01T04:42:45.449Z",
      "likes": 2,
      "likedUserIds": [1],
      "commentsIds": number[]
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
      "instance": "/api/users/25",
      "errors": []
    }
    ```

</details>

## **Chats**

## **Create chat**

Creates a conversation between two or more users.

<details>

- **URL**

  /api/chats

- **Method:**

  `POST`

- **Data params**

  ```ts
    {
      userIds: number[];
    }
  ```

- **Success response:**

  - **Code:** 201 Created <br />
    **Content:**
    ```json
    {
    "id": "63ecb254ee45e3d443ae84bb",
    "userIds": [
        1,
        5
    ],
    "createdAt": "2023-02-15T10:22:12.697Z"
    }
    ```

- **Error response:**

  - **Code:** 500 Internal Server Error <br />
    **Content:**

    ```json
    {
      "error": true,
      "status": 500,
      "message": "Chat already exists",
      "instance": "/api/chats",
      "errors": []
    }
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**

    ```json
    {
      "error": true,
      "status": 500,
      "message": "Chat can't have one member",
      "instance": "/api/chats",
      "errors": []
    }
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**

    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/chats",
      "errors": [
          {
              "value": [
                  1
              ],
              "msg": "Invalid value",
              "param": "userIds",
              "location": "body"
          }
      ]
    }
    ```

</details>

## **Get user chats**

Returns a list of conversations for a userId specified in the query.

<details>

- **URL**

  /api/chats

- **Method:**

  `GET`

- **Query params**

  `userId=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    [
      {
          "id": "63ecb254ee45e3d443ae84bb",
          "userIds": [
              1,
              5
          ],
          "createdAt": "2023-02-15T10:22:12.697Z",
          "messages": []
      }
    ]
    ```

- **Error response:**

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    {
      "error": true,
      "status": 500,
      "message": "Not found",
      "instance": "/api/chats?userId=52",
      "errors": []
    }
    ```

</details>

## **Clear all chat messages**

Removes all messages from a particular chat.

<details>

- **URL**

  /api/chats/:id

- **Method:**

  `DELETE`
  
- **URL params**

  `id=[string]`

- **Success response:**

  - **Code:** 200 OK <br />

- **Error response:**

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 500,
      "message": "Cast to ObjectId failed for value \"zxc\" (type string) at path \"_id\" for model \"Chat\"",
      "instance": "/api/chats/zxc",
      "errors": []
    }
    ```

</details>

## **Images**

## **Set user avatar**

Sets user avatar as `user.images.avatar` in DB, available as `user.avatar` in user DTO.

<details>

- **URL**

  /api/images/user-avatar/:id

- **Method:**

  `POST`
  
- **URL params**

  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
  - **Content:** image/webp <br />

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/images/user-avatar",
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 404,
      "message": "Not Found",
      "instance": "/api/images/user-avatar",
    }
    ```

</details>

## **Set user cover**

Sets user cover as `user.images.cover` in DB, available as `user.cover` in user DTO.

<details>

- **URL**

  /api/images/user-cover/:id

- **Method:**

  `POST`
  
- **URL params**

  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
  - **Content:** image/webp <br />

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/images/user-cover",
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 404,
      "message": "Not Found",
      "instance": "/api/images/user-cover",
    }
    ```

</details>

## **Push post image**

Pushes post image data to `post.images`, in post DTO available as an array of strings at the same key.

<details>

- **URL**

  /api/images/post/:id

- **Method:**

  `POST`
  
- **URL params**

  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
  - **Content:** 
  
  ```json
  [
    "data:image/webp;base64,UklGRjpAAABXRUJQVlA4IC5AAABwKwGdASr0AfQBPrVYpU4nJSOpJjdZWSAWiWVu4TyoaMstILxGfiyPTfL55X8jZNmSd6FnD/Zd7f0c/..."
  ]
  ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/images/post",
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 404,
      "message": "Not Found",
      "instance": "/api/images/post",
    }
    ```

</details>

## **Get user avatar**

Returns user avatar as image/webp data.

<details>

- **URL**

  /api/images?

- **Method:**

  `GET`
  
- **Query params**

  `name=user-avatar`
  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
  - **Content:** image/webp <br />

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/images?name=<incorrect-name>&<id-missing>"
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 404,
      "message": "Not Found",
      "instance": "/api/images?name=user-avatar&id=1512211512",
    }
    ```

</details>

## **Get user cover**

Returns user cover as image/webp data.

<details>

- **URL**

  /api/images?

- **Method:**

  `GET`
  
- **Query params**

  `name=user-cover`
  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
  - **Content:** image/webp <br />

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/images?name=<incorrect-name>&<id-missing>"
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 404,
      "message": "Not Found",
      "instance": "/api/images?name=user-cover&id=1512211512",
    }
    ```

</details>

## **Get post images**

Returns an array of post images represented as image data encoded in base64 format.

<details>

- **URL**

  /api/images?

- **Method:**

  `GET`
  
- **Query params**

  `name=post`
  `id=[integer]`

- **Success response:**

  - **Code:** 200 OK <br />
  - **Content:** 
  
  ```json
  [
    "data:image/webp;base64,UklGRjpAAABXRUJQVlA4IC5AAABwKwGdASr0AfQBPrVYpU4nJSOpJjdZWSAWiWVu4TyoaMstILxGfiyPTfL55X8jZNmSd6FnD/Zd7f0c/..."
  ]
  ```

- **Error response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 400,
      "message": "Bad Request",
      "instance": "/api/images?name=<incorrect-name>&<id-missing>"
    }
    ```

  - **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
      "error": true,
      "status": 404,
      "message": "Not Found",
      "instance": "/api/images?name=user-avatar&id=1512211512",
    }
    ```

</details>

## **WS**

## **Messages**

- **URL**

  /messages

## **Send message**

Allows a user to send a message to a specific conversation which then will get saved to the corresponding subdocument.

<details>

- **Data params**

  ```ts
    { 
      type: "send";
      payload: {
          chatId: string;
          userId: number;
          description: string;
      };
    }
  ```

- **Success response:**

    **Content:**
    ```json
    {
      "type": "send",
      "payload": {
          "id": "63ed05ba390aa20988a0f6dd",
          "userId": 1,
          "description": "test",
          "createdAt": "2023-02-15T16:18:02.428Z"
      }
    }
    ```

</details>

## **Watch chats**

If a user is logged in, it automatically watches for changes in chats, connected to them, given his access token is valid.

<details>

- **Data params**

  ```ts
    { 
      type: "watch";
      payload: {
          userId: number;
          accessToken: string;
      };
    }
  ```

- **Success response:**

    **Content:**
    ```json
    {
      "type": "watch",
      "payload": {
          "id": "63ed05ba390aa20988a0f6dd",
          "userId": 1,
          "description": "test",
          "createdAt": "2023-02-15T16:18:02.428Z"
      }
    }
    ```

</details>
