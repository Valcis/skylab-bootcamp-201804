# Users API (skylabcoders)

# URL

https://skylabcoders.herokuapp.com/api/

# Endpoints

## Register

- path ```/user```
- method ```POST```
- headers
```
Content-Type: application/json
```
- body
```
{ 
    username: string, 
    password: string,
    [, anyOtherField: any-primitive] 
}
```
- returns
```
// on success
{
    status: 'OK',
    data: {
        id: string
    }
}

// on failure
{
    status: 'KO',
    error: string
}
```
- example

```js
// body
{
	"username": "u",
	"password": "p",
	"name": "john",
	"age": 21
}

// response
{
    "status": "OK",
    "data": {
        "id": "5af0565afc73d10014328163"
    }
}

// on trying to repeat the same register, then it should fail
{
    "status": "KO",
    "error": "user with username \"u\" already exists"
}
```

## Login

- path ```/auth```
- method ```POST```
- headers
```
Content-Type: application/json
```
- body 
```
{ 
    username: string, 
    password: string
}
```
- returns
```
// on success
{
    status: 'OK',
    data: {
        id: string,
        token: string
    }
}

// on failure
{
    status: 'KO',
    error: string
}
```
- example
```js
// body
{
	"username": "u",
	"password": "p"
}

// response
{
    "status": "OK",
    "data": {
        "id": "5af0565afc73d10014328163",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjA1NjVhZmM3M2QxMDAxNDMyODE2MyIsImlhdCI6MTUyNTcwMDcxOSwiZXhwIjoxNTI1NzA0MzE5fQ.WGIkcb0IWZnVybygtcStAzoWKkVPPAy7IZBxN3KUXbw"
    }
}

// on trying to login with wrong username
{
    "status": "KO",
    "error": "user with username \"u2\" does not exist"
}
```

## Retrieve

- path ```user/:id``` (id -> identifier)
- method ```GET```
- headers
```
Authorization: Bearer <token>
```
- returns
```
// on success
{
    status: 'OK',
    data: {
        id: string
        username: string,
        [, anyOtherField: any-primitive]
    }
}

// on failure
{
    status: 'KO',
    error: string
}
```
- example:
```js
// response
{
    "status": "OK",
    "data": {
        "id": "5af0565afc73d10014328163",
        "username": "u",
        "name": "john",
        "age": 21
    }
}

// on wrong request id
{
    "status": "KO",
    "error": "token id \"5af0565afc73d10014328163\" does not match user \"5af0565afc73d10014328162\""
}
```

## Update

- path ```user/:id``` (id -> identifier)
- method: ```PUT```
- headers
```
Content-Type: application/json,
Authorization: Bearer <token>
```
- body
```
{
    username: string,
    password: string,
    [, newUsername: string] // in case to update username
    [, newPassword: string] // in case to update password
    [, anyOtherField: any-primitive]
    [, anyOtherField: null] // in case to update deleting a field
}
```
- returns
```
// on success
{
    status: 'OK'
}

// on failure
{
    status: 'KO',
    error: string
}
```
- example
```js
// body
{
    "username": "u",
    "password": "p",
    "name": "jack",
    "age": 23
}

// response
{
    "status": "OK"
}

// on wrong request id
{
    "status": "KO",
    "error": "token id \"5af0565afc73d10014328163\" does not match user \"5af0565afc73d10014328162\""
}
```

## Unregister

- path ```user/:id``` (id -> identifier)
- method: ```DELETE```
- headers
```
Content-Type: application/json,
Authorization: Bearer <token>
```
- body
```
{
    username: string,
    password: string
}
```
- returns
```
// on success
{
    status: 'OK'
}

// on failure
{
    status: 'KO',
    error: string
}
```
- example
```js
// body
{
    "username": "u",
    "password": "p"
}

// response
{
    "status": "OK"
}

// on wrong request id
{
    "status": "KO",
    "error": "token id \"5af0565afc73d10014328163\" does not match user \"5af0565afc73d10014328162\""
}
```