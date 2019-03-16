# Clubs App Routes

## Signup
✅

## Login
✅

## Dashboard [ ]
🚧  GET `/dashboard`

✅ 🚧 The below logic is actually implemented on the FRONT end.
*Request* findUserById:
-> if user is a `member` type
    - *Response* send list of Club objects, _Later_: and list of Event objects 
-> if user is a `member` type
    - *Response* send list of Club objects, leaderClub object, _Later_: and list of Event objects 
-> if user is a `admin` type
    - *Response* to be created.

DO THIS FOR NOW.

*_LEADERS_*

✅ POST `/requestNewClub` from dashboard component page.
*Request* findUserById -> Make sure they're a leader -> Send form data to create new Club -> set `requested` attribute on user to `true` & `accepted` to `false`.

- [ ] Change these attribute names to requestedClub and acceptedClub

*Response* send back club object.

