# node-hamms

This repository contains a set of tests / specifications to test HTTP clients for various HTTP protocol edge cases.
We are using [axios](https://github.com/mzabriskie/axios) HTTP client and custom HTTP server (inspired by [hamms](https://github.com/kevinburke/hamms)) so far.

## Installation

1. Run ```npm install``` to install dependencies

## Usage

1. Start the server by running ```npm start``` in the command line:
2. Open new command line tab and run ```npm test``` for Node.js tests
3. Open new browser tab and enter ```http://localhost:3000``` to the address line for browser tests

## Endpoints

### Headers

* ```/headers/cookie?length={n}``` [GET] - Returns ```Cookie``` header that is ```n``` bytes long

    ```
    GET /headers/cookie?length=5 HTTP/1.1
    Host: localhost:3000
    User-Agent: curl/7.49.1
    Accept: */*


    HTTP/1.1 200 OK
    Connection: close
    Content-Length: 67
    Content-Type: application/json
    Cookie: aaaaa
    Date: Wed, 30 Nov 2016 20:19:57 GMT

    {"host":"localhost:3000","user-agent":"curl/7.49.1","accept":"*/*"}
    ```

* ```/headers/content-length``` [GET] - Returns a response with different body length than stated in ```Content-Length``` header

    ```
    GET http://localhost:3000/headers/content-length HTTP/1.1
    Host: localhost:3000
    User-Agent: curl/7.49.1
    Accept: */*
    
    
    HTTP/1.1 200 OK
    Connection: close
    Content-Length: 3
    Content-Type: text/plain
    Date: Wed, 30 Nov 2016 20:19:57 GMT
    
    abcdefghijklmnopqrstuvwxyz
    ```

### Bad Responses

* ```/responses/empty``` [GET] - Returns an empty string immediately upon connection

  ```
  GET /responses/empty HTTP/1.1
  Host: localhost:3000
  User-Agent: curl/7.49.1
  Accept: */*

  * Empty reply from server
  ```

* ```/responses/empty-string``` [POST] - Returns back an empty string after client sends data

  ```
  POST /responses/empty-string HTTP/1.1
  Host: localhost:3000
  User-Agent: curl/7.49.1
  Accept: */*
  Content-Length: 7
  Content-Type: application/x-www-form-urlencoded

  foo bar


  * Empty reply from server
  ```

* ```/responses/failrate?rate={n}``` [GET] - The server will drop requests with a frequency of ```rate```

  ```
  GET /responses/failrate?rate=1 HTTP/1.1
  Host: localhost:3000
  User-Agent: curl/7.49.1
  Accept: */*

  * No response


  GET /responses/failrate?rate=1 HTTP/1.1
  Host: localhost:3000
  User-Agent: curl/7.49.1
  Accept: */*


  HTTP/1.1 204 No Content
  ```

* ```/responses/incomplete``` [GET] - Server returns incomplete response body (```Content-Length``` and actual length differ)

  ```
  GET /responses/incomplete HTTP/1.1
  Host: localhost:3000
  User-Agent: curl/7.49.1
  Accept: */*
 
  HTTP/1.1 200 OK
  Connection: close
  Content-Length: 67
  Content-Type: application/json
  Date: Wed, 30 Nov 2016 20:19:57 GMT


  * transfer closed with 7 bytes remaining to read
  {"host":"localhost:3000","user-agent":"curl/7.49.1","accept"
  ```

* ```/responses/long-running?delay={n}``` [GET] - Server accepts the request and returns back one byte every ```n``` seconds

    ```
    GET http://localhost:3000/responses/long-running?delay=5 HTTP/1.1
    Host: localhost:3000
    User-Agent: curl/7.49.1
    Accept: */*


    ...after 120 seconds.
    HTTP/1.1 204 No Content
    ```

* ```/responses/long-running/30``` [GET] - Server accepts the request and returns back one byte every 30 seconds

    ```
    GET http://localhost:3000/responses/long-running/30 HTTP/1.1
    Host: localhost:3000
    User-Agent: curl/7.49.1
    Accept: */*


    ...after 720 seconds.
    HTTP/1.1 204 No Content
    ```

* ```/responses/malformed``` [GET] - Server returns malformed response (```foo bar```) immediately upon connection

    ```
    GET http://localhost:3000/responses/malformed HTTP/1.1
    Host: localhost:3000
    User-Agent: curl/7.49.1
    Accept: */*


    foo bar
    ```

* ```/responses/malformed``` [POST] - Server returns malformed response (```foo bar```) after the client sends data

    ```
    POST http://localhost:3000/responses/malformed HTTP/1.1
    Host: localhost:3000
    User-Agent: curl/7.49.1
    Accept: */*

    abcdefghijklmnopqrstuvwxyz
    
    
    foo bar
    ```

* ```/responses/none``` [GET] - Accepts traffic but never returns a response

### Status Codes

* ```/statuses/{statusCode}``` [GET] - Returns a response with given status code

    ```
    GET http://localhost:3000/statuses/200 HTTP/1.1

    Host: localhost:3000
    User-Agent: curl/7.49.1
    Accept: */*
    
    
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Date: Fri, 09 Dec 2016 13:22:12 GMT
    Connection: keep-alive
    Content-Length: 0
    ```
