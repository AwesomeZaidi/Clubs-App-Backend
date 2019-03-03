<!-- Routes Documentation -->

# Clubs App Routes

## Login
*POST* `/login`
- *Request:* email and password
- *Response:* user object or error

## Signup
*POST* `/signup`
- *Request:* email, first name, last name, phone number, email, password
- Response: user object or error

## Dashboard
- *GET* `/dashboard`
- *Request:* Find user populate their club's -> populate upcoming events
- *Response:* If user has no clubs or no upcoming events -> Send msg to join clubs. If user has events coming up, send back list of club objects and list of upcoming event objects.

- *GET /clubName/event-title/uid*
- *Request:* Check & find user by cookies caToken -> find club by id -> find event.
- *Response:* return event object or error.

## Club Events Calendar

## Clubs List

## Settings

## Leader Manage Club Dashboard

## Event Page

## Create Event

