<?php

/**
 * HTTP Response Codes
 * Informational (1xx):
 * - 100 Continue: The client should continue with its request.
 *
 * Successful (2xx):
 * - 200 OK: The request was successful.
 * - 201 Created: The request was successful, and a new resource was created.
 * - 204 No Content: The server successfully processed the request but there is no content to send in the response.
 *
 * Redirection (3xx):
 * - 300 Multiple Choices: The requested resource corresponds to any one of a set of representations.
 * - 301 Moved Permanently: The requested resource has been permanently moved to a new location.
 * - 302 Found: The requested resource has been temporarily moved to a different location.
 * - 304 Not Modified: Indicates that the resource has not been modified since the version specified by the request headers.
 * - 307 Temporary Redirect: The requested resource resides temporarily under a different URI.
 *
 * Client Error (4xx):
 * - 400 Bad Request: The request could not be understood or was missing required parameters.
 * - 401 Unauthorized: Authentication is required and has failed or has not been provided.
 * - 403 Forbidden: The server understood the request but refuses to authorize it.
 * - 404 Not Found: The requested resource could not be found on the server.
 * - 405 Method Not Allowed: The method specified in the request is not allowed for the resource identified by the request URI.
 *
 * Server Error (5xx):
 * - 500 Internal Server Error: A generic error message returned when an unexpected condition was encountered on the server.
 * - 501 Not Implemented: The server does not support the functionality required to fulfill the request.
 * - 503 Service Unavailable: The server is not ready to handle the request. Common causes are a server that is down for maintenance or is overloaded.
 */
