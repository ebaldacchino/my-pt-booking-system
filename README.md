# My PT Booking System

This project is adapted from the NextJS + Twin Macro + Auth Starter on my repo

Features include:

- Email Authentication (without passport)
- Google OAuth Authentication (without passport)
- Form validation on both the client and server

Environmental variables required:

- MONGO_URI
- TOKEN_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

Other changes required include:

- Client ID in google login button link# next-twin-macro-auth-starter

Things to work on:

- When adding a shift:
  - Check if shift of the same date already exists
  - If already shift on the same date, check if any of the session times clash
  - If session times don't clash, add the sessions to the shift
- Also considering to remove the shifts, and just add sessions
- Also to select days to make the shift reoccuring, and for how many weeks to repeat the shift
- Handle the client booking a session
- Handle filtering and sorting getting data from the db
