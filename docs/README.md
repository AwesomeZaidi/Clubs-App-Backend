View the front end React app here: https://github.com/AwesomeZaidi/Clubs-App-Frontend/

# Club-App
Make School Club App. ⚾️🏕🤳

The rest of the documentation is specified within the `Documentation` Folder.

* = optional property as most of them will be required.

## Endpoints

### ✅ All users:

`/signup`

**POST:** Creates a new user in database.

*Arguments:* firstName, lastName, username, email, password, type (defualt: member)

*Returns:* Status 200, user object or status 500 Something went wrong

`/login`

**POST:** Finds a user in database and logs them in by setting jwt token in cookies.

*Arguments:* email, password

*Returns:* Status 200, user object or status 500 Something went wrong

`/logout`

**DELETE:** Logs user out be removing jwt token from cookies.

*Arguments:* None

*Returns:* Deletes jwt token from cookies.

`/allClubs`

**GET:** Finds and returns all the verified clubs in the database.

*Arguments:* None

*Returns:* Returns list of Club objects.

`/event`

**GET:** gets the specific event.

*Arguments:* eventID, user not even required to be logged in.

*Returns:* Status 200, event obj and club obj or Status 500 Something went wrong


### ✅ Admin users:

✅ `/getAllClubsRequestingToJoin`

**GET:** finds and returns all the clubs requesting to join

*Arguments:* 

*Returns:* list of club objects who's accepted property is set to false

✅ `/acceptClub`

**POST:** Admin accepts a club, verifies it to be official.

*Arguments:* club ID

*Returns:* Status 200, or status 500 Something went wrong

⏰ `/denyClub`

**POST:** denies a club that requested to join, sends a rejection email - removes club from database.

*Arguments:* club ID

*Returns:* Status 200 or status 500 Something went wrong

### ✅⏰ Leader users:

`/requestClub`

**POST:** Club Leader requests to start a club, their object is modified and club object is created.

*Arguments:* ClubData object with (title) later, purpose, etc etc.

*Returns:* Status 200, club object or Status 500 Sum went wrong.

⏰ `/manageClub`

**GET:** Get all the club info for leader in their settings ideally.

*Arguments:* club ID

*Returns:* Status 200, club object or Status 500 Something went wrong


**PUT:** Updates club information (settings ideally)

*Arguments:* club ID

*Returns:* Status 200, or Status 500 Something went wrong

`/event` ✅

**POST:** creates an event, adds event ID to club

*Arguments:* event ID, event data object (title, description, location, data, timeStart, timeEnd)

*Returns:* Status 200, new event obj or Status 500 Something went wrong

**DELETE:** deletes an event

*Arguments:* event ID

*Returns:* Status 200, Event Deleted, Club Object or Status 500 Something went wrong

### Member user:

`/club` ✅

**POST:** 

*Arguments:* clubId

*Returns:* Status 200, Club Object or Status 500 Something went wrong

**DELETE:**

*Arguments:* clubId

*Returns:* Status 200 or Status 500 Something went wrong

### Member user:

`/event`

**POST:**

*Arguments:* 

*Returns:*

**DELETE:**

*Arguments:* 

*Returns:*